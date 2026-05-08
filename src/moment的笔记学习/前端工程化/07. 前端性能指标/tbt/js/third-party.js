// 模拟广告类长任务注入脚本
setTimeout(() => {
  const start = performance.now();
  while (performance.now() - start < 150) {
    const temp = Math.sqrt(Math.random() * 1000);
  }
  console.log("💣 第三方广告脚本注入完毕（阻塞模拟）");
}, 1000);
