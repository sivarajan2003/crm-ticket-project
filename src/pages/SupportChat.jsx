import { useState, useEffect } from "react";
import {
  Row, Col, Card, Input, Typography, Avatar, Tag, Button, Divider
} from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { Modal, Form, Select } from "antd";
const { Text } = Typography;

export default function SupportChat() {

  const [activeTab, setActiveTab] = useState("open");
  const [selected, setSelected] = useState(0);
 // ✅ FIRST declare tickets
const [tickets, setTickets] = useState(() => {
  const saved = localStorage.getItem("tickets");
  return saved ? JSON.parse(saved) : [
      {
    id: 1,
    title: "Settlement related",
    subtitle: "Delayed/Failed settlements",
    user: "Shubham",
    message: "Why our settlement is on hold?",
    status: "Active",
    type: "open"
  },
  {
    id: 2,
    title: "Product inquiry",
    subtitle: "Optimiser",
    user: "Vivek Anand",
    message: "Any estimated time?",
    status: "Pending",
    type: "open"
  },
  {
    id: 3,
    title: "Refund issue",
    subtitle: "Closed ticket",
    user: "Rahul",
    message: "Issue resolved",
    status: "Closed",
    type: "closed"
  },
    {
      id: 1,
      title: "Settlement related",
      subtitle: "Delayed/Failed settlements",
      user: "Shubham",
      message: "Why our settlement is on hold?",
      status: "Active",
      type: "open"
    },
    {
      id: 2,
      title: "Product inquiry",
      subtitle: "Optimiser",
      user: "Vivek Anand",
      message: "Any estimated time?",
      status: "Pending",
      type: "open"
    }
  ];
});
// ✅ THEN use filter
const filteredTickets = tickets.filter(t => t.type === activeTab);
const selectedTicket = filteredTickets.find(t => t.id === selected) || filteredTickets[0];
useEffect(() => {
  if (filteredTickets.length > 0) {
    setSelected(filteredTickets[0].id);
  }
}, [activeTab]);
useEffect(() => {
  localStorage.setItem("tickets", JSON.stringify(tickets));
}, [tickets]);
const [replyModal, setReplyModal] = useState(false);
const [replyType, setReplyType] = useState("");
const [replyText, setReplyText] = useState("");
const [isModalOpen, setIsModalOpen] = useState(false);
const [form] = Form.useForm();
  return (
    <div style={{ padding: "10px", minHeight: "100vh", background: "#f5f6f8" }}>

      <Row gutter={[16, 16]}>

        {/* LEFT PANEL */}
        <Col xs={24} md={8}>
          <Card
            variant="borderless"
            style={{
              borderRadius: 16,
              boxShadow: "0 6px 18px rgba(15,23,42,0.06)"
            }}
          >

            {/* HEADER */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#111827" }}>
                Support requests
              </div>

              <Button
  type="link"
  icon={<PlusOutlined />}
  style={{ fontSize: 13, padding: 0 }}
  onClick={() => setIsModalOpen(true)}   // ✅ ADD THIS
>
  Raise new request
</Button>
            </div>

            {/* SEARCH */}
            <Input
              placeholder="Search tickets..."
              prefix={<SearchOutlined style={{ color: "#9ca3af" }} />}
              style={{
                height: 38,
                borderRadius: 8,
                marginBottom: 14
              }}
            />

            {/* TABS */}
            <div style={{
              display: "flex",
              background: "#f3f4f6",
              borderRadius: 10,
              padding: 3,
              marginBottom: 16
            }}>
              {["open", "closed"].map(tab => (
                <div
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    flex: 1,
                    textAlign: "center",
                    padding: "6px",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 600,
                    background: activeTab === tab ? "#fff" : "transparent",
                    color: activeTab === tab ? "#1677ff" : "#6b7280"
                  }}
                >
                  {tab === "open" ? "Open" : "Closed"}
                </div>
              ))}
            </div>

            {/* TICKET LIST */}
           {filteredTickets.map((t, index) => (
            
              <div
                key={t.id}
                onClick={() => setSelected(t.id)}
                style={{
                  padding: 14,
                  borderRadius: 12,
                  marginBottom: 10,
                  cursor: "pointer",
                  background: selected === index ? "#eef2ff" : "#fff",
                  border: selected === t.id
                    ? "1px solid #6366f1"
                    : "1px solid #f0f0f0"
                }}
              >

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Text style={{ fontWeight: 600, fontSize: 14 }}>
                    {t.title}
                  </Text>

                  <Tag
                    color={t.status === "Active" ? "green" : "orange"}
                    style={{ fontSize: 11 }}
                  >
                    {t.status}
                  </Tag>
                </div>

                <div style={{ fontSize: 12, color: "#6b7280" }}>
                  {t.subtitle}
                </div>

                <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 4 }}>
                  {t.message}
                </div>

              </div>
            ))}

          </Card>
        </Col>

        {/* RIGHT PANEL */}
        <Col xs={24} md={16}>
          <Card
            variant="borderless"
            style={{
              borderRadius: 16,
              boxShadow: "0 6px 18px rgba(15,23,42,0.06)"
            }}
          >

            {/* HEADER */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#111827" }}>
  {selectedTicket?.title} » {selectedTicket?.subtitle}
</div>

<div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>
  JUN 3, 2021 • #{selectedTicket?.id}
</div>
              </div>

             <Tag color={selectedTicket?.status === "Active" ? "green" : "orange"}>
  {selectedTicket?.status}
</Tag>
            </div>

            <Divider />

            {/* CHAT */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* USER */}
              <div style={{ display: "flex", gap: 10 }}>
                <Avatar size={36}>U</Avatar>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>
  {selectedTicket?.user}
</div>
                  <div style={{ fontSize: 11, color: "#9ca3af" }}>
                    2 days ago
                  </div>
                </div>
              </div>

              {/* SUPPORT */}
              <div style={{ display: "flex", gap: 10 }}>
                <Avatar size={36} style={{ background: "#1677ff" }}>
                  S
                </Avatar>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>
                    Razorpay support
                  </div>
                  <div style={{ fontSize: 13 }}>
                    There is issue with your bank account. Our team is checking.
                  </div>
                  <div style={{ fontSize: 11, color: "#9ca3af" }}>
                    15 hours ago
                  </div>
                </div>
              </div>

              {/* MORE */}
              <div style={{ textAlign: "center" }}>
                <Button type="link" style={{ fontSize: 13 }}>
                  20 more replies
                </Button>
              </div>

              {/* LAST */}
              <div style={{ display: "flex", gap: 10 }}>
                <Avatar size={36}>V</Avatar>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>
                    Vivek Anand
                  </div>
                  <div style={{ fontSize: 13 }}>
                    Any estimated time for resolution?
                  </div>
                  <div style={{ fontSize: 11, color: "#9ca3af" }}>
                    5 mins ago
                  </div>
                </div>
              </div>

            </div>

            <Divider />

            {/* FOOTER */}
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 12, color: "#6b7280" }}>
                This request is open and our team is working on it.
                <br />
                You can expect reply before <b>23 Jan'21</b>
              </div>

             <Button
  style={{ marginTop: 12, borderRadius: 20, fontSize: 13 }}
  onClick={() => setReplyModal(true)}
>
  ↩ Send a reply
</Button>
            </div>

          </Card>
        </Col>

      </Row>
      <Modal
  title="Create Support Request"
  open={isModalOpen}
  onCancel={() => {
    setIsModalOpen(false);
    form.resetFields();
  }}
  footer={null}
  centered
>
  <Form form={form} layout="vertical" onFinish={(values) => {
    
    // 🔥 ADD NEW TICKET
    const newTicket = {
      id: Date.now(),
      title: values.title,
      subtitle: values.category,
      user: "You",
      message: values.message,
      status: "Active",
      type: "open"
    };

   setTickets(prev => [newTicket, ...prev]);

    setIsModalOpen(false);
    form.resetFields();
  }}>

    <Form.Item
      label="Title"
      name="title"
      rules={[{ required: true, message: "Enter title" }]}
    >
      <Input placeholder="Enter request title" />
    </Form.Item>

    <Form.Item
      label="Category"
      name="category"
    >
      <Select placeholder="Select category">
        <Select.Option value="Payment">Payment</Select.Option>
        <Select.Option value="Technical">Technical</Select.Option>
        <Select.Option value="General">General</Select.Option>
      </Select>
    </Form.Item>

    <Form.Item
      label="Message"
      name="message"
      rules={[{ required: true, message: "Enter message" }]}
    >
      <Input.TextArea rows={3} placeholder="Describe your issue..." />
    </Form.Item>

    <Button type="primary" htmlType="submit" block>
      Create Request
    </Button>

  </Form>
</Modal>
<Modal
  title="Send Reply"
  open={replyModal}
  onCancel={() => {
    setReplyModal(false);
    setReplyType("");
    setReplyText("");
  }}
  footer={null}
  centered
>

  {/* SELECT TYPE */}
  <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>

    <Button
      onClick={() => setReplyType("email")}
      type={replyType === "email" ? "primary" : "default"}
    >
      📧 Email
    </Button>

    <Button
      onClick={() => setReplyType("whatsapp")}
      type={replyType === "whatsapp" ? "primary" : "default"}
    >
      💬 WhatsApp
    </Button>

    <Button
      onClick={() => setReplyType("message")}
      type={replyType === "message" ? "primary" : "default"}
    >
      📝 Message
    </Button>

  </div>

  {/* MESSAGE BOX */}
  {replyType && (
    <>
      <Input.TextArea
        rows={4}
        placeholder={`Enter ${replyType} message...`}
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        style={{ marginBottom: 10 }}
      />

      <Button
        type="primary"
        block
        onClick={() => {
          console.log("Send:", replyType, replyText);

          // 👉 Here you can integrate API later

          setReplyModal(false);
          setReplyType("");
          setReplyText("");

          alert(`${replyType} sent successfully ✅`);
        }}
      >
        Send {replyType}
      </Button>
    </>
  )}

</Modal>
    </div>
  );
}