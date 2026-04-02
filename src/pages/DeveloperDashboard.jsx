import React, { useState } from "react";
import { Row, Col, Card, Grid } from "antd";
import { motion } from "framer-motion";
import {
  CodeOutlined,
  BugOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { useBreakpoint } = Grid;

const DeveloperDashboard = () => {

  const screens = useBreakpoint();

  // SAMPLE DATA
  const tasks = [
    { id: 1, title: "Fix Login Bug", dev: "You", status: "In Progress" },
    { id: 2, title: "API Error", dev: "You", status: "Open" },
    { id: 3, title: "UI Alignment", dev: "You", status: "Closed" },
  ];

  // KPI DATA
  const stats = [
    {
      title: "ASSIGNED",
      value: tasks.length,
      icon: <CodeOutlined />,
      color: "#7c3aed",
    },
    {
      title: "PENDING",
      value: tasks.filter(t => t.status === "Open").length,
      icon: <ClockCircleOutlined />,
      color: "#f97316",
    },
    {
      title: "COMPLETED",
      value: tasks.filter(t => t.status === "Closed").length,
      icon: <CheckCircleOutlined />,
      color: "#10b981",
    },
    {
      title: "BUGS",
      value: 2,
      icon: <BugOutlined />,
      color: "#ef4444",
    },
  ];
const releases = [
  {
    version: "v2.1.0",
    title: "New Dashboard UI",
    date: "10 Apr 2026",
    status: "Released"
  },
  {
    version: "v2.0.5",
    title: "Bug Fixes & Performance",
    date: "05 Apr 2026",
    status: "Hotfix"
  },
];
  return (
    <div style={{ padding: 20, background: "#f5f6f8", minHeight: "100vh" }}>

      {/* HEADER */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 26, fontWeight: 700 }}>
          Developer Dashboard 
        </div>
        <div style={{ fontSize: 14, color: "#6b7280" }}>
          Track your development tasks
        </div>
      </div>

      {/* KPI CARDS */}
      <Row gutter={[16, 16]}>
        {stats.map((item, i) => (
          <Col xs={12} sm={12} md={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card
                style={{
                  borderRadius: 16,
                  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  
                  {/* TEXT */}
                  <div>
                    <div style={{
                      fontSize: 12,
                      color: "#9ca3af",
                      fontWeight: 600
                    }}>
                      {item.title}
                    </div>

                    <div style={{
                      fontSize: 28,
                      fontWeight: 700
                    }}>
                      {item.value}
                    </div>
                  </div>

                  {/* ICON ANIMATION */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 12,
                      background: `${item.color}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: item.color,
                      fontSize: 22
                    }}
                  >
                    {item.icon}
                  </motion.div>

                </div>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* TASK SECTION */}
      <div style={{ marginTop: 25 }}>
        <Card style={{ borderRadius: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 15 }}>
            My Development Tasks
          </div>

          {/* ✅ MOBILE VIEW → CARD */}
          {!screens.md && (
            <Row gutter={[12, 12]}>
              {tasks.map((t, i) => (
                <Col xs={12} sm={12} md={12} lg={6}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <Card style={{ borderRadius: 12 }}>
                      <div style={{ fontWeight: 600 }}>{t.title}</div>
                      <div style={{ fontSize: 13, color: "#6b7280" }}>
                        #{t.id}
                      </div>

                      <div style={{ marginTop: 10 }}>
                        <span style={statusStyle(t.status)}>
                          {t.status}
                        </span>
                      </div>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          )}

          {/* ✅ TABLE VIEW (TAB + DESKTOP) */}
          {screens.md && (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ color: "#9ca3af", fontSize: 13 }}>
                  <th style={th}>ID</th>
                  <th style={th}>Task</th>
                  <th style={th}>Developer</th>
                  <th style={th}>Status</th>
                </tr>
              </thead>

              <tbody>
                {tasks.map((t) => (
                  <tr key={t.id} style={row}>
                    <td style={td}>#{t.id}</td>

                    <td style={{ ...td, fontWeight: 600 }}>
                      {t.title}
                    </td>

                    <td style={td}>{t.dev}</td>

                    <td style={td}>
                      <span style={statusStyle(t.status)}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </Card>
      </div>
      {/* 🚀 RELEASE SECTION */}
<div style={{ marginTop: 25 }}>
  <Card style={{ borderRadius: 16 }}>
    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 15 }}>
      🚀 Latest Releases
    </div>

    <Row gutter={[16, 16]}>
      {releases.map((item, i) => (
        <Col xs={24} sm={12} md={12} lg={8} key={i}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card
              style={{
                borderRadius: 14,
                boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
              }}
            >
              <div style={{ fontSize: 13, color: "#6b7280" }}>
                {item.version}
              </div>

              <div style={{ fontSize: 16, fontWeight: 600 }}>
                {item.title}
              </div>

              <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 5 }}>
                {item.date}
              </div>

              <div style={{ marginTop: 10 }}>
                <span style={releaseStatus(item.status)}>
                  {item.status}
                </span>
              </div>
            </Card>
          </motion.div>
        </Col>
      ))}
    </Row>
  </Card>
</div>

    </div>
  );
};

export default DeveloperDashboard;


/* 🔥 STYLES */

const th = {
  padding: "10px",
  textAlign: "left",
};

const td = {
  padding: "12px",
  fontSize: 14,
};

const row = {
  borderTop: "1px solid #eee",
};

const statusStyle = (status) => {
  if (status === "Open")
    return { background: "#fef3c7", color: "#b45309", padding: "5px 12px", borderRadius: 20 };

  if (status === "In Progress")
    return { background: "#dbeafe", color: "#1d4ed8", padding: "5px 12px", borderRadius: 20 };

  return { background: "#dcfce7", color: "#15803d", padding: "5px 12px", borderRadius: 20 };
};
const releaseStatus = (status) => {
  if (status === "Released")
    return {
      background: "#dcfce7",
      color: "#15803d",
      padding: "4px 10px",
      borderRadius: 20,
      fontSize: 12
    };

  return {
    background: "#fef3c7",
    color: "#b45309",
    padding: "4px 10px",
    borderRadius: 20,
    fontSize: 12
  };
};