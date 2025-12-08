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
