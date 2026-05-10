---
name: md-localize-github-raw-images
description: >-
  Localizes Markdown images that point at raw.githubusercontent.com: downloads
  files into moment的笔记学习/img (skipping if the same filename already exists),
  then rewrites image links to paths relative to each edited Markdown file.
  Use only when the user explicitly invokes this skill by name and lists the
  Markdown files to change.
disable-model-invocation: true
---

# Markdown：GitHub Raw 图本地化

仅在用户**点名使用该 skill**，并**逐条给出要修改的 Markdown 文件路径**时执行。不要自行扫描全仓库、不要猜测要改哪些文件。

## 匹配的语法

识别标准 Markdown 图片，且链接主机为 `raw.githubusercontent.com`，例如：

```markdown
![20250730165225](https://raw.githubusercontent.com/xun082/md/main/blogs.images20250730165225.png)
```

正则（概念）：`!\[([^\]]*)\]\((https://raw\.githubusercontent\.com/[^)\s]+)\)`  
对每个匹配：保留原有 `![alt]`，只替换括号内的 URL。

## 资源目录（固定）

以**工作区根目录**为基准，图片目录为：

`moment的笔记学习/img/`

若目录不存在则创建。

## 本地文件名

取远程 URL 的**路径最后一段**作为文件名（通常为 `blogs.imagesXXXXXXXX.png`）。  
若该路径下**已存在同名文件**，则**不再下载**，直接用于替换链接。

## 下载

- 用终端执行下载（例如 `curl -fL --create-dirs -o "<dest>" "<url>"` 或 PowerShell `Invoke-WebRequest`），将文件写入上述 `img` 目录，文件名为上一步解析出的 basename。
- 下载失败时：说明错误，不要删除或覆盖已有文件；未成功的匹配项不要改成坏链（可保留原 URL 或向用户说明）。

## 替换为相对路径

替换后的链接必须是**相对于当前正在编辑的那份 Markdown 文件**的路径，指向 `moment的笔记学习/img/<文件名>`。

- 禁止使用与工作区根绑死的绝对路径（除非用户明确要求）。
- 从「该 `.md` 文件所在目录」到「`moment的笔记学习/img/`」计算相对路径，再拼上文件名。不同子目录下的笔记，相对前缀不同，须按文件分别计算。

示例：若 Markdown 在 `moment的笔记学习/前端工程化/07. 前端性能指标/某篇.md`，则链到同一张图可写为 `../../img/blogs.images20250730165225.png`（以实际层级为准）。

## 执行顺序（每个用户给出的 `.md` 文件）

1. 读取文件全文，找出所有匹配的远程 raw 图片 URL。
2. 对每个 URL：解析 basename → 目标路径 `moment的笔记学习/img/<basename>`。
3. 若目标文件已存在：跳过下载；否则下载到该路径。
4. 将文中对应 `](原URL)` 替换为 `](相对路径)`，`![...]` 保持不变。
5. 保存该 Markdown 文件。

## 用户未给出文件列表时

停止并回复：请明确列出要处理的 Markdown 路径（相对工作区根或绝对路径均可），再按本 skill 执行。
