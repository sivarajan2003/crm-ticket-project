import React from "react";
import { Row, Col, Input, Button, Switch, Avatar } from "antd";
import { Tabs, Grid } from "antd";
import {
  UserOutlined,
  LockOutlined,
  BellOutlined,
  HomeOutlined
} from "@ant-design/icons";

export default function Settings() {
const { useBreakpoint } = Grid;
const screens = useBreakpoint();
const isMobile = !screens.md;
  return (
    <div style={{ padding: "20px", minHeight: "100vh", background: "#f5f6f8" }}>

      {/* 🔥 HEADER (SAME AS TICKETS) */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 26, fontWeight: 700, color: "#111827" }}>
          Settings
        </div>
        <div style={{ fontSize: 14, color: "#6b7280" }}>
          Manage your account and preferences
        </div>
      </div>

      <Row gutter={20}>

        {/* LEFT SIDE */}
        <Col xs={24} lg={16}>

          {/* PROFILE */}
          <div style={card}>
            <div style={sectionTitle}>
              <UserOutlined /> Profile Settings
            </div>

            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <Avatar size={70} icon={<UserOutlined />} />
            </div>

            <Input placeholder="Full Name" style={input} />
            <Input placeholder="Email Address" style={input} />
            <Input placeholder="Phone Number" style={input} />

            <Button style={primaryBtn} block>
              Save Profile
            </Button>
          </div>

          {/* COMPANY */}
          <div style={{ ...card, marginTop: 20 }}>
            <div style={sectionTitle}>
              <HomeOutlined /> Company Settings
            </div>

            <Input placeholder="Company Name" style={input} />
            <Input placeholder="Website" style={input} />
            <Input placeholder="Address" style={input} />

            <Button style={primaryBtn} block>
              Save Company
            </Button>
          </div>

        </Col>

        {/* RIGHT SIDE */}
        <Col xs={24} lg={8}>

          {/* NOTIFICATIONS */}
          <div style={card}>
            <div style={sectionTitle}>
              <BellOutlined /> Notifications
            </div>

            <div style={row}>
              <span>Email Alerts</span>
              <Switch defaultChecked />
            </div>

            <div style={divider} />

            <div style={row}>
              <span>SMS Alerts</span>
              <Switch />
            </div>

            <div style={divider} />

            <div style={row}>
              <span>Ticket Updates</span>
              <Switch defaultChecked />
            </div>
          </div>

          {/* SECURITY */}
          <div style={{ ...card, marginTop: 20 }}>
            <div style={sectionTitle}>
              <LockOutlined /> Security
            </div>

            <Input.Password placeholder="Current Password" style={input} />
            <Input.Password placeholder="New Password" style={input} />
            <Input.Password placeholder="Confirm Password" style={input} />

            <Button style={{ ...primaryBtn, background: "#ef4444" }} block>
              Change Password
            </Button>
          </div>

        </Col>

      </Row>
    </div>
  );
}

/* 🔥 SAME STYLE AS YOUR TICKETS PAGE */

const card = {
  background: "#fff",
  padding: 20,
  borderRadius: 14,
  boxShadow: "0 6px 18px rgba(15,23,42,0.06)"
};

const sectionTitle = {
  fontSize: 16,
  fontWeight: 600,
  color: "#111827",
  marginBottom: 16
};

const input = {
  height: 40,
  borderRadius: 8,
  marginBottom: 12
};

const primaryBtn = {
  height: 40,
  background: "#1677ff",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontWeight: 500
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: 14
};

const divider = {
  height: 1,
  background: "#f0f0f0",
  margin: "10px 0"
};