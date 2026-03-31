import { Card, Input, Button, Select, Row, Col, Typography, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";

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

  return (
    <div style={{ padding: 20, background: "#f5f6f8" }}>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <Title level={3} style={{ marginBottom: 0 }}>
            Support Ticket
          </Title>
          <Text type="secondary">
            When customers have problems, they open support tickets.
          </Text>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            style={{ width: 200 }}
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
          <Col span={6}>
            <Text>Select Request Type</Text>
            <Select defaultValue="Reissue Request" style={{ width: "100%" }} />
          </Col>

          <Col span={6}>
            <Text>Search PNR</Text>
            <Input placeholder="02AU6FD" />
          </Col>

          <Col span={6}>
            <Text>Passenger Name</Text>
            <Input placeholder="Mark Anderson" />
          </Col>

          <Col span={6}>
            <Text>Ticket Number</Text>
            <Input placeholder="996502333736727" />
          </Col>

          <Col span={6} style={{ marginTop: 15 }}>
            <Text>Choose Reason</Text>
            <Select defaultValue="Voluntary Reissue" style={{ width: "100%" }} />
          </Col>

          <Col span={6} style={{ marginTop: 15 }}>
            <Text>Change Date</Text>
            <Input placeholder="20 Jan 2023" />
          </Col>

          <Col span={6} style={{ marginTop: 15 }}>
            <Text>Flight No</Text>
            <Input placeholder="BG602" />
          </Col>

          <Col span={6} style={{ marginTop: 15 }}>
            <Text>Remarks</Text>
            <Input placeholder="Write your remarks" />
          </Col>
        </Row>

        <Button type="primary" style={{ marginTop: 20 }}>
          Submit Ticket
        </Button>
      </Card>

      {/* HISTORY + FAQ */}
      <Row gutter={16}>
        <Col span={16}>
          <Card title="Latest Support History" extra={<Button>Export</Button>}>
            <Table columns={columns} dataSource={data} pagination={false} />
          </Card>
        </Col>

        <Col span={8}>
          <Card title="Frequently Asked Questions">
            <p><b>How do tickets get issued?</b></p>
            <p style={{ color: "#6b7280" }}>
              To issue a ticket, go to the booking search, make a booking,
              fill out passenger info, create a PNR, then click order ticket.
            </p>

            <p>What is the process refund tickets?</p>
            <p>How can I reissue tickets?</p>
            <p>How can see ticket history by PNR?</p>
            <p>How can see issue ticket?</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
}