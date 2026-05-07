/**
 * @Author: 刘昌隆
 * @Date: 2024/5/15
 */
import { Link, Outlet } from "umi";
import "./index.less";
import { useEffect, useState } from "react";
import { Button } from "antd";
import Index from "@/moment的笔记学习/前端工程化/07. 前端性能指标/长任务";
export default function Layout() {
  // return <Outlet />;
  return <Index></Index>;
}
