const ITERATIONS = 80_000_000;

const tickEl = document.getElementById("tick");
const resultEl = document.getElementById("result");
const btnWorker = document.getElementById("btnWorker");
const btnMain = document.getElementById("btnMain");

let tick = 0;
setInterval(() => {
  tick += 1;
  tickEl.textContent = String(tick);
}, 100);

// Worker 脚本路径相对当前 HTML；请用本地静态服务打开本页（不要用 file://），否则 Worker 可能被拦截。
const worker = new Worker("sum.worker.js");

worker.onmessage = function (e) {
  const { sum, ms, thread } = e.data;
  resultEl.textContent =
    `[${thread}] 累加 0..${ITERATIONS - 1} 的和 ≈ ${sum}\n耗时: ${ms.toFixed(1)} ms\n（此时计时器应一直在涨）`;
  btnWorker.disabled = false;
};

worker.onerror = function (err) {
  resultEl.textContent = "Worker 错误: " + err.message;
  btnWorker.disabled = false;
};

function runOnMain() {
  const start = performance.now();
  let sum = 0;
  for (let i = 0; i < ITERATIONS; i++) {
    sum += i;
  }
  const ms = performance.now() - start;
  resultEl.textContent =
    `[main] 累加 0..${ITERATIONS - 1} 的和 ≈ ${sum}\n耗时: ${ms.toFixed(1)} ms\n（计算期间计时器会停）`;
  btnMain.disabled = false;
}

btnWorker.addEventListener("click", function () {
  btnWorker.disabled = true;
  btnMain.disabled = true;
  resultEl.textContent = "Worker 计算中…";
  worker.postMessage({ iterations: ITERATIONS });
});

btnMain.addEventListener("click", function () {
  btnWorker.disabled = true;
  btnMain.disabled = true;
  resultEl.textContent = "主线程计算中（观察上方数字是否停住）…";
  // 让浏览器先画出「计算中」再进入长循环
  setTimeout(function () {
    runOnMain();
    btnWorker.disabled = false;
  }, 50);
});
