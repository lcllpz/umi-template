/**
 * Service Worker 线程：无 window/DOM。
 * 真实 Web Push 走 `push`；本示例用页面定时器 postMessage 模拟「服务端推了一条数据」。
 */

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

/** 与笔记中 push 分支等价：收到「载荷」后弹系统通知 */
function showSiteNotification(body, url) {
  // 每条用不同 tag，避免「同 tag 只替换一条」在托盘里看起来像没弹新通知
  const tag = `demo-sim-${Date.now()}`;
  return self.registration.showNotification("站点推：消息通知", {
    body,
    data: { url },
    tag,
  });
}

/** 真实线上：浏览器在收到 Push 时触发，event.data 为 PushMessageData（本机无法靠定时器触发该事件） */
self.addEventListener("push", (event) => {
  const body = event.data ? event.data.text() : "无正文";
  event.waitUntil(
    self.registration.showNotification("站点推送", {
      body,
      data: { url: "/" },
      tag: "demo-real-push",
    }),
  );
});

/** 本示例：主线程定时器发来 SIMULATE_PUSH，走同一套 showNotification（ExtendableMessageEvent 上可用 waitUntil） */
self.addEventListener("message", (event) => {
  if (!event.data || event.data.type !== "SIMULATE_PUSH") return;

  const body = event.data.body ?? "无正文";
  const url = event.data.url ?? "/";
  const p = showSiteNotification(body, url).catch((err) => {
    console.error(
      "[SW] showNotification 失败（常见：未授权通知、非安全上下文）:",
      err,
    );
  });

  if (typeof event.waitUntil === "function") event.waitUntil(p);
});

/** 与笔记一致：点击通知 → focus 已有窗口或 openWindow */
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/";
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        const existing = clientList.find((c) =>
          c.url.includes(self.location.origin),
        );
        console.log("notificationclick", url);

        if (existing) return existing.focus();
        return self.clients.openWindow(url);
      }),
  );
});
