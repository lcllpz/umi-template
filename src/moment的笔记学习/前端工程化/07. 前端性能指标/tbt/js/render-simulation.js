function blockRender(ms = 100) {
  const start = performance.now();
  while (performance.now() - start < ms) {
    // 空循环模拟 UI 渲染阻塞
    const temp = Math.sqrt(Math.random() * 1000);
  }
}
