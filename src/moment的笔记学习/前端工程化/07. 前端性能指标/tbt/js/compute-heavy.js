function heavyJSONParse(n = 20000) {
  const mockData = JSON.stringify(
    Array.from({ length: n }, (_, i) => ({
      id: i,
      name: `User_${i}`,
      score: Math.random() * 100,
    }))
  );
  return JSON.parse(mockData);
}

function simulateConvolution() {
  const width = 200;
  const height = 200;
  const pixels = new Array(width * height).fill(0).map(() => Math.random());
  const kernel = [-1, 0, 1];

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let sum = 0;
      for (let k = -1; k <= 1; k++) {
        const idx = y * width + (x + k);
        sum += pixels[idx] * kernel[k + 1];
      }
    }
  }
}
