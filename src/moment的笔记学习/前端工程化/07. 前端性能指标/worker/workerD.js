self.onmessage = function () {
  let total = 0;
  for (let i = 0; i < 1 * 10000 * 10000; i++) {
    total += i;
  }
  self.postMessage({ type: "d", total });
};
