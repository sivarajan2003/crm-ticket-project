import React from "react";
import { motion } from "framer-motion";
import { Row, Col, Card } from "antd";
import {
  FileTextOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from "@ant-design/icons";

const Dashboard = () => {

  // SAMPLE DATA
  const tickets = [
    { id: 1, title: "Login Bug", dev: "John", status: "In Progress" },
    { id: 2, title: "UI Issue", dev: "Mike", status: "Open" },
    { id: 3, title: "Payment Error", dev: "John", status: "Closed" },
  ];

  // ANIMATION
  const cardAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div style={{ padding: "20px", background: "#f5f6f8", minHeight: "100vh" }}>

      {/* HEADER (LEADS STYLE) */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 26, fontWeight: 700, color: "#111827" }}>
          Dashboard
        </div>
        <div style={{ fontSize: 14, color: "#6b7280" }}>
          Ticket management overview
        </div>
      </div>

      {/* 🔥 KPI CARDS */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
  {[
    {
      title: "TOTAL TICKETS",
      value: tickets.length,
      color: "#7c3aed",
      icon: <FileTextOutlined />,
    },
    {
      title: "OPEN",
      value: tickets.filter(t => t.status === "Open").length,
      color: "#f97316",
      icon: <ClockCircleOutlined />,
    },
    {
      title: "IN PROGRESS",
      value: tickets.filter(t => t.status === "In Progress").length,
      color: "#2563eb",
      icon: <CheckCircleOutlined />,
    },
    {
      title: "CLOSED",
      value: tickets.filter(t => t.status === "Closed").length,
      color: "#10b981",
      icon: <CloseCircleOutlined />,
    },

    // 🔥 NEW CARDS
    {
      title: "HIGH PRIORITY",
      value: tickets.filter(t => t.priority === "High").length || 2,
      color: "#ef4444",
      icon: <CloseCircleOutlined />,
    },
    {
      title: "ASSIGNED TO ME",
      value: tickets.filter(t => t.dev === "John").length,
      color: "#0ea5e9",
      icon: <FileTextOutlined />,
    },
    {
      title: "PENDING REVIEW",
      value: 3,
      color: "#f59e0b",
      icon: <ClockCircleOutlined />,
    },
    {
      title: "SLA BREACH",
      value: 1,
      color: "#dc2626",
      icon: <CloseCircleOutlined />,
    },
  ].map((item, i) => (
    <Col xs={24} sm={12} lg={6} key={i}>
      <motion.div
        variants={cardAnimation}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.08 }}
      >
        <Card
          style={{
            borderRadius: 16,
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            cursor: "pointer",
            transition: "0.3s"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>

            {/* TEXT */}
            <div>
              <div style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#9ca3af",
                textTransform: "uppercase"
              }}>
                {item.title}
              </div>

              <div style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#111827"
              }}>
                {item.value}
              </div>
            </div>

            {/* ICON */}
            <div style={{
              width: 46,
              height: 46,
              borderRadius: 12,
              background: `${item.color}15`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: item.color,
              fontSize: 22
            }}>
              {item.icon}
            </div>

          </div>
        </Card>
      </motion.div>
    </Col>
  ))}
</Row>
      {/* MAIN CONTENT */}
      <Row gutter={[16, 16]}>

        {/* TABLE */}
        <Col xs={24} lg={16}>
          <Card style={{ borderRadius: 16 }}>
            <div style={{
              fontSize: 16,
              fontWeight: 600,
              marginBottom: 15
            }}>
              Ticket Management
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", color: "#9ca3af", fontSize: 13 }}>
                  <th style={th}>ID</th>
                  <th style={th}>Title</th>
                  <th style={th}>Developer</th>
                  <th style={th}>Status</th>
                </tr>
              </thead>

              <tbody>
                {tickets.map((t) => (
                  <tr key={t.id} style={row}>
                    <td style={td}>#{t.id}</td>

                    <td style={{ ...td, fontWeight: 600 }}>
                      {t.title}
                    </td>

                    <td style={td}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={avatar}>👨</div>
                        {t.dev}
                      </div>
                    </td>

                    <td style={td}>
                      <span style={statusStyle(t.status)}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </Card>
        </Col>

        {/* RIGHT PANEL */}
        <Col xs={24} lg={8}>
          <Card style={{ borderRadius: 16 }}>

            <div style={{
              fontSize: 16,
              fontWeight: 600,
              marginBottom: 15
            }}>
              Statistics
            </div>

            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#2563eb" }}>
                34.5%
              </div>
              <div style={{ fontSize: 13, color: "#9ca3af" }}>
                Increase
              </div>
            </div>

            <div style={{
              height: 100,
              background: "#f3f4f6",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 15
            }}>
              Chart Placeholder
            </div>

            <button style={primaryBtn}>Export Reports</button>
            <button style={secondaryBtn}>Transaction History</button>

          </Card>
        </Col>

      </Row>

    </div>
  );
};

export default Dashboard;


/* 🔥 STYLES */

const th = {
  padding: "10px",
};

const td = {
  padding: "12px",
  fontSize: 14,
};

const row = {
  borderTop: "1px solid #eee",
};

const avatar = {
  width: 30,
  height: 30,
  borderRadius: "50%",
  background: "#e0e7ff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const statusStyle = (status) => {
  if (status === "Open")
    return { background: "#fef3c7", color: "#b45309", padding: "5px 10px", borderRadius: 20 };
  if (status === "In Progress")
    return { background: "#dbeafe", color: "#1d4ed8", padding: "5px 10px", borderRadius: 20 };
  return { background: "#dcfce7", color: "#15803d", padding: "5px 10px", borderRadius: 20 };
};

const primaryBtn = {
  width: "100%",
  padding: "10px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  marginBottom: 10,
};

const secondaryBtn = {
  width: "100%",
  padding: "10px",
  borderRadius: 8,
  border: "1px solid #ddd",
};