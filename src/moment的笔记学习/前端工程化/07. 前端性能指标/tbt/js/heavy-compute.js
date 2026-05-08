function matrixMultiply(size = 200) {
  const A = Array.from({ length: size }, () => Array(size).fill(1));
  const B = Array.from({ length: size }, () => Array(size).fill(1));
  const C = [];

  for (let i = 0; i < size; i++) {
    C[i] = [];
    for (let j = 0; j < size; j++) {
      let sum = 0;
      for (let k = 0; k < size; k++) {
        sum += A[i][k] * B[k][j];
      }
      C[i][j] = sum;
    }
  }
  return C;
}

function heavySort(n = 100000) {
  const arr = Array.from({ length: n }, () => Math.random());
  return arr.sort();
}
