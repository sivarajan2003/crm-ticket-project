import { Layout, Grid } from "antd";
import { useState } from "react";
import Sidebar from "./Sidebar";
import AppHeader from "./Header";
import { Outlet } from "react-router-dom";


const { Content } = Layout;

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [active, setActive] = useState("dashboard");

  return (
    <Layout style={{ minHeight: "100vh" }}>

      {/* SIDEBAR */}
      <Sidebar
  collapsed={collapsed}
  setCollapsed={setCollapsed}
  active={active}
  setActive={setActive}
/>

      {/* RIGHT SIDE */}
      <Layout
        style={{
          marginLeft: screens.xs ? 0 : collapsed ? 80 : 260,
          transition: "all 0.2s",
          minHeight: "100vh",
          background: "#ffffff",
        }}
      >

        {/* HEADER */}
        <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* CONTENT (STATIC) */}
        <Content
          style={{
            margin: 0,
            background: "#f5f6f8",
            padding: "20px",
            minHeight: "calc(100vh - 64px)",
          }}
        >
          
          <Outlet />
        </Content>

      </Layout>
    </Layout>
  );
}