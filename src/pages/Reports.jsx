import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Select,
  DatePicker,
  Table,
  Button,
  Typography,
} from "antd";
import {
  FileTextOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

export default function Reports() {
  const [status, setStatus] = useState("All");

  // 🔥 Dummy Data
  const data = [
    { id: 1, title: "Login Bug", user: "John", status: "Open", date: "01-04-2026" },
    { id: 2, title: "Payment Error", user: "Mike", status: "Closed", date: "02-04-2026" },
    { id: 3, title: "UI Issue", user: "Arun", status: "In Progress", date: "03-04-2026" },
  ];

  const filtered = data.filter((d) =>
    status === "All" ? true : d.status === status
  );

  // 🔥 TABLE
  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Title", dataIndex: "title" },
    { title: "User", dataIndex: "user" },
    { title: "Date", dataIndex: "date" },
    {
      title: "Status",
      dataIndex: "status",
      render: (s) => (
        <span
          style={{
            padding: "4px 10px",
            borderRadius: 20,
            fontSize: 12,
            background:
              s === "Open"
                ? "#fef3c7"
                : s === "In Progress"
                ? "#dbeafe"
                : "#dcfce7",
            color:
              s === "Open"
                ? "#b45309"
                : s === "In Progress"
                ? "#1d4ed8"
                : "#15803d",
          }}
        >
          {s}
        </span>
      ),
    },
  ];

  return (
    <div style={{ padding: 20, background: "#f5f6f8", minHeight: "100vh" }}>
      
      {/* HEADER */}
      <div style={{ marginBottom: 24 }}>
        <Title level={3}>Reports</Title>
        <Text type="secondary">Analyze ticket performance</Text>
      </div>

      {/* 🔥 STATS */}
      <Row gutter={16} style={{ marginBottom: 20 }}>
        {[
          { title: "Total Tickets", value: data.length, icon: <FileTextOutlined /> },
          { title: "Open", value: data.filter(d => d.status === "Open").length, icon: <ClockCircleOutlined /> },
          { title: "In Progress", value: data.filter(d => d.status === "In Progress").length, icon: <CheckCircleOutlined /> },
          { title: "Closed", value: data.filter(d => d.status === "Closed").length, icon: <CloseCircleOutlined /> },
        ].map((item, i) => (
          <Col xs={24} sm={12} lg={6} key={i}>
            <Card style={card}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 13, color: "#6b7280" }}>{item.title}</div>
                  <div style={{ fontSize: 24, fontWeight: 700 }}>{item.value}</div>
                </div>
                <div style={{ fontSize: 22 }}>{item.icon}</div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 🔥 FILTER */}
      <Card style={{ marginBottom: 20, borderRadius: 12 }}>
        <Row gutter={16} align="middle">
          <Col xs={24} sm={12} lg={8}>
            <RangePicker style={{ width: "100%" }} />
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Select
              value={status}
              onChange={setStatus}
              style={{ width: "100%" }}
            >
              <Option value="All">All Status</Option>
              <Option value="Open">Open</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Closed">Closed</Option>
            </Select>
          </Col>

          <Col xs={24} sm={12} lg={4}>
            <Button type="primary" icon={<DownloadOutlined />} block>
              Export
            </Button>
          </Col>
        </Row>
      </Card>

      {/* 🔥 TABLE */}
      <Card style={{ borderRadius: 14 }}>
        <Table
          columns={columns}
          dataSource={filtered}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
}

// 🔥 STYLE
const card = {
  borderRadius: 14,
  boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
};