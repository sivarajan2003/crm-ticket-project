import { Card, Input, Button, Select, Row, Col, Typography, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Tabs, Grid } from "antd";
import { Collapse } from "antd";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
const { Title, Text } = Typography;

export default function SupportTicket() {
  const columns = [
    {
      title: "Support Req No",
      dataIndex: "id",
    },
    {
      title: "Request Type",
      dataIndex: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Support Status",
      dataIndex: "status",
      render: (text) => (
        <span
          style={{
            color:
              text === "Approve"
                ? "green"
                : text === "Cancel"
                ? "red"
                : text === "Inprocess"
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

  const data = [
    {
      id: "SR#136354726",
      type: "Refund Request",
      date: "20/01/2023",
      status: "Inprocess",
    },
    {
      id: "SR#136354745",
      type: "Reissue Request",
      date: "25/01/2023",
      status: "Approve",
    },
    {
      id: "SR#136354787",
      type: "VIP Request",
      date: "23/01/2023",
      status: "Submit",
    },
    {
      id: "SR#136354756",
      type: "Void Request",
      date: "23/01/2023",
      status: "Cancel",
    },
  ];
const { useBreakpoint } = Grid;
const screens = useBreakpoint();
const isMobile = !screens.md;

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
    <div
  style={{
    padding: isMobile ? 12 : 20,
    background: "#f5f6f8",
    minHeight: "100vh"
  }}
>
      {/* HEADER */}
      <div
  style={{
    display: "flex",
    flexWrap: "wrap",          // ✅ allow wrapping
    gap: 10,
    justifyContent: "space-between",
    marginBottom: 20
  }}
>
        <div>
          <Title level={3} style={{ marginBottom: 0 }}>
            Support Ticket
          </Title>
          <Text type="secondary">
            When customers have problems, they open support tickets.
          </Text>
        </div>

        <div
  style={{
    display: "flex",
    flexWrap: "wrap",     // ✅ prevent overflow
    gap: 10,
    width: "100%",
    justifyContent: isMobile ? "flex-start" : "flex-end"
  }}
>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            style={{ width: isMobile ? "100%" : 200 }}
          />
          <Button>₹ 1,120</Button>
          <Button type="primary">Air Travel</Button>
        </div>
      </div>

      {/* CREATE TICKET */}
      <Card style={{ borderRadius: 12, marginBottom: 20 }}>
        <Title level={5}>Create New Ticket</Title>
        <Text type="secondary">
          Fill up all the information here, then click submit button
        </Text>

        <Row gutter={16} style={{ marginTop: 20 }}>
          <Col xs={24} sm={12} lg={6}>
            <Text>Select Request Type</Text>
            <Select defaultValue="Reissue Request" style={{ width: "100%" }} />
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Text>Search PNR</Text>
            <Input placeholder="02AU6FD" />
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Text>Passenger Name</Text>
            <Input placeholder="Mark Anderson" />
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Text>Ticket Number</Text>
            <Input placeholder="996502333736727" />
          </Col>

          <Col xs={24} sm={12} lg={6} style={{ marginTop: 15 }}>
            <Text>Choose Reason</Text>
            <Select defaultValue="Voluntary Reissue" style={{ width: "100%" }} />
          </Col>

          <Col xs={24} sm={12} lg={6} style={{ marginTop: 15 }}>
            <Text>Change Date</Text>
            <Input placeholder="20 Jan 2023" />
          </Col>

          <Col xs={24} sm={12} lg={6} style={{ marginTop: 15 }}>
            <Text>Flight No</Text>
            <Input placeholder="BG602" />
          </Col>

          <Col xs={24} sm={12} lg={6} style={{ marginTop: 15 }}>
            <Text>Remarks</Text>
            <Input placeholder="Write your remarks" />
          </Col>
        </Row>

        <Button type="primary" style={{ marginTop: 20 }}>
          Submit Ticket
        </Button>
      </Card>

      {/* HISTORY + FAQ */}
      {/* 🔥 RESPONSIVE HISTORY */}

{isMobile ? (

  /* 📱 MOBILE → TABS + CARD */
  <Tabs defaultActiveKey="1">

    {/* HISTORY */}
    <Tabs.TabPane tab="History" key="1">

      {data.map((item) => (
        <Card
          key={item.id}
          style={{
            marginBottom: 12,
            borderRadius: 12,
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
          }}
        >
          <div style={{ fontWeight: 600 }}>{item.type}</div>
          <div style={{ fontSize: 13, color: "#6b7280" }}>{item.id}</div>

          <div style={{ marginTop: 6 }}>{item.date}</div>

          <div style={{ marginTop: 8 }}>
            <span
              style={{
                color:
                  item.status === "Approve"
                    ? "green"
                    : item.status === "Cancel"
                    ? "red"
                    : item.status === "Inprocess"
                    ? "#7c3aed"
                    : "#1677ff",
                fontWeight: 600,
              }}
            >
              {item.status}
            </span>
          </div>
        </Card>
      ))}

    </Tabs.TabPane>

    {/* FAQ */}
    <Tabs.TabPane tab="FAQ" key="2">
  <Card>
    <Collapse accordion>

      <Collapse.Panel header="How do tickets get issued?" key="1">
        <p style={{ color: "#6b7280" }}>
          To issue a ticket, go to booking search, create PNR and confirm booking.
        </p>
      </Collapse.Panel>

      <Collapse.Panel header="What is refund process?" key="2">
        <p style={{ color: "#6b7280" }}>
          Refund requests can be raised via support ticket and processed within 3–5 days.
        </p>
      </Collapse.Panel>

      <Collapse.Panel header="How to reissue tickets?" key="3">
        <p style={{ color: "#6b7280" }}>
          Use reissue option, select new date and confirm changes.
        </p>
      </Collapse.Panel>

      <Collapse.Panel header="How to view ticket history?" key="4">
        <p style={{ color: "#6b7280" }}>
          Go to "My Tickets" and search using PNR or ticket number.
        </p>
      </Collapse.Panel>

    </Collapse>
  </Card>
</Tabs.TabPane>
  </Tabs>

) : (

  /* 💻 DESKTOP → ORIGINAL */
  <Row gutter={16}>

    <Col xs={24} lg={16}>
      <Card title="Latest Support History" extra={<Button>Export</Button>}>
        <Table columns={columns} dataSource={data} pagination={false} />
      </Card>
    </Col>

    <Col xs={24} lg={8}>
      <Card title="Frequently Asked Questions">
  <Collapse accordion>

    <Collapse.Panel header="How do tickets get issued?" key="1">
      <p style={{ color: "#6b7280" }}>
        To issue a ticket, go to booking search, create PNR, select flight and confirm payment.
      </p>
    </Collapse.Panel>

    <Collapse.Panel header="What is the refund process?" key="2">
      <p style={{ color: "#6b7280" }}>
        Refund requests can be submitted through support ticket. Processing takes 3–5 working days.
      </p>
    </Collapse.Panel>

    <Collapse.Panel header="How can I reissue tickets?" key="3">
      <p style={{ color: "#6b7280" }}>
        Use reissue option in booking panel, select new date and confirm changes.
      </p>
    </Collapse.Panel>

    <Collapse.Panel header="How to view ticket history?" key="4">
      <p style={{ color: "#6b7280" }}>
        Go to "My Tickets" and search using PNR or ticket number.
      </p>
    </Collapse.Panel>

  </Collapse>
</Card>
    </Col>

  </Row>

)}
    </div>
  );
}