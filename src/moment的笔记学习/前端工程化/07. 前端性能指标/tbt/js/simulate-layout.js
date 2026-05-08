function layoutThrashing() {
  const el = document.body;
  for (let i = 0; i < 100; i++) {
    el.style.padding = `${i % 10}px`;
    void el.offsetHeight; // 强制 layout
  }
}
