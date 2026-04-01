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
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Grid } from "antd";
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
const { useBreakpoint } = Grid;
const screens = useBreakpoint();
const isMobile = !screens.md;
  // 🔥 TABLE
  const columns = [
   { title: "ID", dataIndex: "id", width: 60 },
{ title: "Title", dataIndex: "title", width: 120 },
{ title: "User", dataIndex: "user", width: 100 },
{ title: "Date", dataIndex: "date", width: 100 },
{
  title: "Status",
  dataIndex: "status",
  width: 140,              // 🔥 IMPORTANT
  align: "center",         // 🔥 CENTER FIX
   render: (s) => (
  <span style={{
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "4px 12px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 500,
    whiteSpace: "nowrap",   // 🔥 prevent break
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
  }}>
    {s}
  </span>

      ),
    },
  ];
const exportToExcel = () => {
  const excelData = filtered.map((item) => ({
    "Support Req No": item.id,
    "Request Type": item.type,
    "Date": item.date,
    "Status": item.status,
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Support Tickets");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const dataBlob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(dataBlob, "support_tickets.xlsx");
};
  return (
    <div style={{ padding: 20, background: "#f5f6f8", minHeight: "100vh" }}>
      
      {/* HEADER */}
      <div style={{ marginBottom: 24 }}>
        <Title level={3}>Reports</Title>
        <Text type="secondary">Analyze ticket performance</Text>
      </div>

      {/* 🔥 STATS */}
      <Row gutter={[12, 12]} style={{ marginBottom: 20 }}>
        {[
          { title: "Total Tickets", value: data.length, icon: <FileTextOutlined /> },
          { title: "Open", value: data.filter(d => d.status === "Open").length, icon: <ClockCircleOutlined /> },
          { title: "In Progress", value: data.filter(d => d.status === "In Progress").length, icon: <CheckCircleOutlined /> },
          { title: "Closed", value: data.filter(d => d.status === "Closed").length, icon: <CloseCircleOutlined /> },
        ].map((item, i) => (
          <Col xs={12} sm={12} md={8} lg={6} key={i}>
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
            <Button onClick={exportToExcel} icon={<DownloadOutlined />}>
  Export
</Button>
          </Col>
        </Row>
      </Card>

      {/* 🔥 TABLE */}
      {isMobile ? (

  /* 📱 MOBILE → CARD VIEW (NO SCROLL) */
  <div>
    {filtered.map((t) => (
      <Card
        key={t.id}
        style={{
          marginBottom: 12,
          borderRadius: 12,
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
        }}
      >
        {/* TITLE */}
        <div style={{ fontWeight: 600 }}>{t.title}</div>
        <div style={{ fontSize: 12, color: "#9ca3af" }}>
          #{t.id}
        </div>

        {/* DETAILS */}
        <div style={{ marginTop: 8 }}>
          <div><b>User:</b> {t.user}</div>
          <div><b>Date:</b> {t.date}</div>
        </div>

        {/* STATUS */}
        <div style={{ marginTop: 10 }}>
          <span style={{
            padding: "4px 12px",
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 500,
            whiteSpace: "nowrap",
            background:
              t.status === "Open"
                ? "#fef3c7"
                : t.status === "In Progress"
                ? "#dbeafe"
                : "#dcfce7",
            color:
              t.status === "Open"
                ? "#b45309"
                : t.status === "In Progress"
                ? "#1d4ed8"
                : "#15803d",
          }}>
            {t.status}
          </span>
        </div>
      </Card>
    ))}
  </div>

) : (

  /* 💻 DESKTOP → TABLE */
  <Card style={{ borderRadius: 14 }}>
    <Table
      columns={columns}
      dataSource={filtered}
      rowKey="id"
      pagination={{ pageSize: 5 }}
    />
  </Card>

)}
    </div>
  );
}

// 🔥 STYLE
const card = {
  borderRadius: 14,
  boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
};