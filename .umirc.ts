export default {
  // less-loader 配置：选择 variable 入口，让编译输出基于 CSS 变量
  lessLoader: {
    javascriptEnabled: true,
    modifyVars: {
      "@root-entry-name": "variable",
      "@my-root-entry-name": "variable",
    },
  },
  routes: [
    {
      path: "/",
      component: "index",
      routes: [
        { path: "/videojs", component: "@/pages/videojs" },
        { path: "/yuying", component: "@/pages/yuying" },
        { path: "/react-ace", component: "@/pages/react-ace" },
        {
          path: "/video-frame-preview",
          component: "@/pages/VideoFramePreview",
        },
        {
          path: "/cross-tab-communication",
          component: "@/pages/crossTabCommunication",
        },
        {
          path: "/requestAnimationFrame",
          component: "@/pages/requestAnimationFrame",
        },
        {
          path: "/close-tab",
          component: "@/pages/closeTab",
        },
        {
          path: "/to-picture",
          component: "@/pages/toPicture",
        },
        {
          path: "/promise",
          component: "@/pages/promise",
        },
        {
          path: "/LabelClickModalBugDemo",
          component: "@/pages/label-click-modal-bug",
        },
        {
          path: "/theme-switch",
          component: "@/pages/theme-switch",
        },
      ],
    },
  ],
};
