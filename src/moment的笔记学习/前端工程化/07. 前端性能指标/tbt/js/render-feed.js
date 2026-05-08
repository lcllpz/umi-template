function renderFeed(count = 50) {
  const feed = document.getElementById("feed");
  let html = "";
  for (let i = 0; i < count; i++) {
    html += `<div class="post">
      <h3>帖子 #${i + 1}</h3>
      <p>这里是模拟文章内容，用于测试 DOM 构建负载。</p>
    </div>`;
  }
  feed.innerHTML = html;
}
