import React from "react";
import { motion } from "framer-motion";
import { Row, Col, Card } from "antd";
import {
  FileTextOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from "@ant-design/icons";
import { Modal } from "antd";
import { useState } from "react";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

const showModal = () => setIsModalOpen(true);
const handleCancel = () => setIsModalOpen(false);

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
    <Col xs={12} sm={12} md={8} lg={6} key={i}>
      <motion.div
  variants={cardAnimation}
  initial="hidden"
  animate="visible"
  transition={{ delay: i * 0.1 }} // stagger animation
  whileHover={{ scale: 1.06 }}
>
        <Card
  style={{
    borderRadius: 16,
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    cursor: "pointer",
    transition: "0.3s",
  }}
  hoverable
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
           {/* ICON */}
<motion.div
  animate={{
    y: [0, -6, 0],   // floating up-down
    rotate: [0, 8, -8, 0], // slight rotate
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }}
  whileHover={{
    scale: 1.2,
    rotate: 15
  }}
  style={{
    width: 50,
    height: 50,
    borderRadius: 14,
    background: `${item.color}15`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: item.color,
    fontSize: 22,
    boxShadow: `0 4px 12px ${item.color}30`
  }}
>
  <motion.div
    animate={{
      scale: [1, 1.2, 1], // pulse effect
    }}
    transition={{
      duration: 2,
      repeat: Infinity
    }}
  >
    {item.icon}
  </motion.div>
</motion.div>
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

                    <td style={{ ...td, textAlign: "center" }}>
<span style={{
  ...statusStyle(t.status),
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  whiteSpace: "nowrap",
  padding: "4px 12px",   // 🔥 control size instead of minWidth
  fontSize: 12,
  fontWeight: 500
}}>
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
            <button style={secondaryBtn} onClick={showModal}>
  Transaction History
</button>
          </Card>
        </Col>

      </Row>
<Modal
  title="Transaction History"
  open={isModalOpen}
  onCancel={handleCancel}
  footer={null}
  width={600}
>
  <table style={{
  width: "100%",
  borderCollapse: "collapse",
  tableLayout: "fixed"   // 🔥 prevents overflow
}}>
    <thead>
      <tr style={{ textAlign: "left", color: "#9ca3af" }}>
        <th style={th}>ID</th>
        <th style={th}>Action</th>
        <th style={th}>User</th>
        <th style={th}>Date</th>
      </tr>
    </thead>

    <tbody>
      {[ 
        { id: 1, action: "Created Ticket", user: "John", date: "01 Apr" },
        { id: 2, action: "Updated Status", user: "Mike", date: "02 Apr" },
        { id: 3, action: "Closed Ticket", user: "John", date: "03 Apr" },
      ].map((item) => (
        <tr key={item.id} style={row}>
          <td style={td}>#{item.id}</td>
          <td style={td}>{item.action}</td>
          <td style={td}>{item.user}</td>
          <td style={td}>{item.date}</td>
        </tr>
      ))}
    </tbody>
  </table>
</Modal>
    </div>
  );
};

export default Dashboard;


/* 🔥 STYLES */

const th = {
  padding: "10px",
  textAlign: "left",
};

const td = {
  padding: "12px",
  fontSize: 14,
  verticalAlign: "middle",
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