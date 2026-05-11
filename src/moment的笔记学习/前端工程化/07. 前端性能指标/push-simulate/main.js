/**
 * 页面主线程：定时器模拟「服务端推了一条数据」→ postMessage 给 SW → SW 里 showNotification。
 * 真实项目里这一段由 Push 服务触发 `push` 事件，而不是定时器。
 */

const SW_PATH = "./sw.js";
const INTERVAL_MS = 3000;

async function main() {
  if (!("serviceWorker" in navigator)) {
    console.warn("当前环境不支持 Service Worker");
    return;
  }

  await navigator.serviceWorker.register(SW_PATH);
  const reg = await navigator.serviceWorker.ready;

  const perm = await Notification.requestPermission();
  if (perm !== "granted") {
    console.warn("未授予通知权限，无法弹出系统通知");
    return;
  }

  const statusEl = document.getElementById("status");
  const log = (msg) => {
    console.log(msg);
    if (statusEl) statusEl.textContent = msg;
  };

  let seq = 0;
  setInterval(() => {
    const sw = reg.active;
    if (!sw) {
      log("registration.active 为空，请刷新页面");
      return;
    }
    seq += 1;
    log(`主线程已 postMessage #${seq}（若仍无系统通知，请打开 SW 控制台看报错）`);

    sw.postMessage({
      type: "SIMULATE_PUSH",
      body: `模拟推送 #${seq} · ${new Date().toLocaleTimeString()}`,
      // 点击通知后若没有已有窗口，openWindow 打开当前演示页
      url: new URL("index.html", location.href).href,
    });
  }, INTERVAL_MS);
}

main().catch(console.error);
