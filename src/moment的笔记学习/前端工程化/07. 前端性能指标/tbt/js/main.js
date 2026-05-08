window.addEventListener("load", () => {
  renderFeed(80);
  heavyJSONParse();
  simulateConvolution();
  layoutThrashing();

  console.log("📦 页面初始化完成，主线程任务执行完毕。");
});
