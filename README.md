# 1. 功能列表

1. video.js 插件使用
2. 语音播放:

- "video.js": "^8.10.0",

3. 代码编辑器：展示、写代码、字符/唤起弹框

```js
    "file-loader": "^6.2.0",
    "react-ace": "^11.0.1",
    "react-ace-builds": " ^7.4.1",
```

4. 视频帧预览
5. 浏览器标签页通信

- react-redux 是不能够跨标签通信
- BroadcastChannel、localStorage 实现通信
- FormStorage：封装 BroadcastChannel、localStorage，自动兼容降级。

6. requestAnimationFrame 优化长列表

7. 关闭浏览器标签
   ![alt text](./src/assets/image.png)

8. 网页复制成图片到剪切板技术

9. Promise 源码实现：/promise
10. 原生与 react 的冒泡机制：/label-click-modal-bug

11. ant4.0 的主题切换：/theme-switch

- 实现 ant4.x 的主题切换
- 使用 ant 提供的 less 变量控制路径引入 css：解决@ant-design/pro-components(使用的是 import "antd/dist/antd.css"，官方没有给出方案) 覆盖 ant 的主题变量
- 实现 less 变量控制路径引入 css

12. 手写虚拟列表：/virtualList

13. e2e测试->playwright

- 测试CustomAceEditor组件

```js
# 1. 安装 Playwright
yarn add -D @playwright/test   # 只是装了 JS 的 API 代码
npx playwright install chromium  # 才是真正下载浏览器内核（几百 MB）

npx playwright install chromium   # 只装 Chrome 内核（最常用，体积最小）
npx playwright install firefox    # 只装 Firefox
npx playwright install webkit     # 只装 Safari 内核
npx playwright install            # 三个全装

playwright.config.ts // 配置中心

# 2. 先启动开发服务（手动开一个终端）
npm run dev

# 3. 另一个终端跑测试
npm run e2e

# 带 UI 界面调试（推荐，可以看到每一步操作）
npm run e2e:ui

# 单步调试某个测试
npm run e2e:debug
```
