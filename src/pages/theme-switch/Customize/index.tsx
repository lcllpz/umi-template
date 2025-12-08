import React from "react";
import styles from "./index.less";
const Customize = () => {
  return (
    <div className={styles.customizeBox}>
      &emsp;&emsp;结合 less-loader（通常搭配 Webpack/Vite
      等构建工具），不仅能通过
      <span style={{ fontWeight: 800 }}>
        配置定义全局 Less 变量、还可以定义Less变量来控制路径，
      </span>
      实现类似 Ant Design 中 @root-entry-name 的动态路径 /
      主题控制逻辑，这是前端工程化中管理 Less 路径和样式的核心方案。
    </div>
  );
};

export default Customize;
