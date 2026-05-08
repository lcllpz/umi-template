import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  // 每个测试最长运行时间
  timeout: 30 * 1000,
  // 断言超时
  expect: { timeout: 5000 },
  // CI 环境下失败不重试，本地可以重试一次
  retries: process.env.CI ? 0 : 1,
  // 并行运行
  fullyParallel: true,
  // 测试报告
  reporter: "html",
  use: {
    // 本地开发服务地址
    baseURL: "http://localhost:8000",
    // 失败时截图
    screenshot: "only-on-failure",
    // 失败时录制视频
    video: "retain-on-failure",
    // 失败时保存 trace，方便调试
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  // 运行测试前自动启动开发服务（可选，也可以手动启动）
  // webServer: {
  //   command: 'npm run dev',
  //   url: 'http://localhost:8000',
  //   reuseExistingServer: true,
  // },
});
