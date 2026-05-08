const express = require("express");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const app = express();
const PORT = 3000;

// 提供静态文件访问 index.html
app.use(express.static(__dirname));

// 手动处理 file.txt 的请求，添加 ETag 协议
app.get("/file.txt", (req, res) => {
  const filePath = path.join(__dirname, "public", "file.txt");
  const fileContent = fs.readFileSync(filePath, "utf-8");

  // 根据文件内容生成 ETag（也可以用文件时间戳或 hash）
  const etag = crypto.createHash("md5").update(fileContent).digest("hex");

  // 对比请求头里的 If-None-Match
  if (req.headers["if-none-match"] === etag) {
    res.status(304).end(); // 不返回内容
  } else {
    res.setHeader("ETag", etag);
    res.setHeader("Content-Type", "text/plain");
    res.send(fileContent);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
