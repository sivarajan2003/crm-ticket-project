import { Card, Input, Button, Select, Row, Col, Typography, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Tabs, Grid } from "antd";
import { Collapse } from "antd";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const { Title, Text } = Typography;

export default function SupportTicket() {
  const navigate = useNavigate();

  const columns = [
    { title: "Ticket ID", dataIndex: "id" },
    { title: "Issue Type", dataIndex: "type" },
    { title: "Date", dataIndex: "date" },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => (
        <span
          style={{
            color:
              text === "Completed"
                ? "green"
                : text === "Rejected"
                ? "red"
                : text === "In Progress"
                ? "#7c3aed"
                : "#1677ff",
            fontWeight: 600,
          }}
        >
          {text}
        </span>
      ),
    },
  ];

 const [data, setData] = useState([
    { id: "TCK#1001", type: "Bug Fix", date: "20/01/2023", status: "In Progress" },
    { id: "TCK#1002", type: "Feature Request", date: "25/01/2023", status: "Completed" },
    { id: "TCK#1003", type: "UI Issue", date: "23/01/2023", status: "Open" },
    { id: "TCK#1004", type: "Performance Issue", date: "23/01/2023", status: "Rejected" },
  ]);
const [form, setForm] = useState({
  type: "Bug Fix",
  project: "",
  module: "",
  dev: "",
  priority: "Medium",
  date: "",
  env: "",
  remarks: "",
});
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tickets");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "tickets.xlsx");
  };
const handleChange = (key, value) => {
  setForm({ ...form, [key]: value });
};
const handleSubmit = () => {
  const newTicket = {
    id: "TCK#" + (data.length + 1001),
    type: form.type,
    date: form.date || new Date().toLocaleDateString(),
    status: "Open",
  };

  setData([newTicket, ...data]); // add to top

  // reset form
  setForm({
    type: "Bug Fix",
    project: "",
    module: "",
    dev: "",
    priority: "Medium",
    date: "",
    env: "",
    remarks: "",
  });
};
  return (
    <div style={{ padding: isMobile ? 12 : 20, background: "#f5f6f8", minHeight: "100vh" }}>

      {/* HEADER */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
        justifyContent: "space-between",
        marginBottom: 20
      }}>
        <div>
          <Title level={3} style={{ marginBottom: 0 }}>
            Project Tickets
          </Title>
          <Text type="secondary">
            Manage and track all development issues and requests.
          </Text>
        </div>

        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          width: "100%",
          justifyContent: isMobile ? "flex-start" : "flex-end"
        }}>
          <Input
            placeholder="Search tickets"
            prefix={<SearchOutlined />}
            style={{ width: isMobile ? "100%" : 200 }}
          />
          <Button onClick={exportToExcel}>Export</Button>
          <Button type="primary" onClick={() => navigate("/create-ticket")}>
  Create Ticket
</Button>
        </div>
      </div>

      {/* CREATE */}
      <Card style={{ borderRadius: 12, marginBottom: 20 }}>
        <Title level={5}>Create New Ticket</Title>
        <Text type="secondary">Fill details and submit</Text>

        <Row gutter={16} style={{ marginTop: 20 }}>
          <Col xs={24} sm={12} lg={6}>
            <Text>Issue Type</Text>
            <Select defaultValue="Bug Fix" style={{ width: "100%" }} />
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Text>Project Name</Text>
            <Input placeholder="Ticket System" />
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Text>Module</Text>
            <Input placeholder="Login / Dashboard" />
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Text>Assigned Developer</Text>
            <Input placeholder="John Doe" />
          </Col>

          <Col xs={24} sm={12} lg={6} style={{ marginTop: 15 }}>
            <Text>Priority</Text>
            <Select defaultValue="Medium" style={{ width: "100%" }} />
          </Col>

          <Col xs={24} sm={12} lg={6} style={{ marginTop: 15 }}>
            <Text>Due Date</Text>
            <Input placeholder="20 Jan 2023" />
          </Col>

          <Col xs={24} sm={12} lg={6} style={{ marginTop: 15 }}>
            <Text>Environment</Text>
            <Input placeholder="Production / Dev" />
          </Col>

          <Col xs={24} sm={12} lg={6} style={{ marginTop: 15 }}>
            <Text>Remarks</Text>
            <Input placeholder="Describe issue" />
          </Col>
        </Row>

        <Button type="primary" onClick={handleSubmit}>
  Submit Ticket
</Button>
      </Card>

      {/* HISTORY */}
      {isMobile ? (
        <Tabs defaultActiveKey="1">

          <Tabs.TabPane tab="History" key="1">
            {data.map((item) => (
              <Card key={item.id} style={{ marginBottom: 12, borderRadius: 12 }}>
                <div style={{ fontWeight: 600 }}>{item.type}</div>
                <div style={{ fontSize: 13, color: "#6b7280" }}>{item.id}</div>
                <div style={{ marginTop: 6 }}>{item.date}</div>
                <div style={{ marginTop: 8 }}>
                  <span style={{ fontWeight: 600 }}>{item.status}</span>
                </div>
              </Card>
            ))}
          </Tabs.TabPane>

          <Tabs.TabPane tab="FAQ" key="2">
            <Card>
              <Collapse accordion>
                <Collapse.Panel header="How to create a ticket?" key="1">
                  <p style={{ color: "#6b7280" }}>
                    Fill the form with issue details and submit.
                  </p>
                </Collapse.Panel>

                <Collapse.Panel header="How to track status?" key="2">
                  <p style={{ color: "#6b7280" }}>
                    Check status in dashboard or ticket history.
                  </p>
                </Collapse.Panel>

                <Collapse.Panel header="How to assign developer?" key="3">
                  <p style={{ color: "#6b7280" }}>
                    Select developer while creating ticket.
                  </p>
                </Collapse.Panel>
              </Collapse>
            </Card>
          </Tabs.TabPane>

        </Tabs>
      ) : (

        <Row gutter={16}>
          <Col xs={24} lg={16}>
            <Card title="Latest Ticket History" extra={<Button onClick={exportToExcel}>Export</Button>}>
              <Table columns={columns} dataSource={data} pagination={false} />
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card title="FAQs">
              <Collapse accordion>
                <Collapse.Panel header="How to create ticket?" key="1">
                  <p>Create ticket using form.</p>
                </Collapse.Panel>

                <Collapse.Panel header="How to track progress?" key="2">
                  <p>Check dashboard or history table.</p>
                </Collapse.Panel>
              </Collapse>
            </Card>
          </Col>
        </Row>

      )}

    </div>
  );
}