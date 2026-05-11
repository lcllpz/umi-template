/**
 * Worker 内没有 window/document，用 self 或全局函数监听消息。
 * 与主线程通过 postMessage / onmessage 传递数据（结构化克隆，非引用共享）。
 */
self.onmessage = function (e) {
  const iterations = e.data?.iterations ?? 80_000_000;
  const start = performance.now();
  let sum = 0;
  for (let i = 0; i < iterations; i++) {
    sum += i;
  }
  const ms = performance.now() - start;
  self.postMessage({
    sum,
    iterations,
    ms,
    thread: "worker",
  });
};
