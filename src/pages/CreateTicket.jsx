import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Input, Select, Button, Row, Col, Typography, message } from "antd";

const { Title, Text } = Typography;
const { Option } = Select;

export default function CreateTicket() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    const saved = JSON.parse(localStorage.getItem("tickets")) || [];

    const newTicket = {
      id: Date.now(),
      ...values,
    };

    localStorage.setItem("tickets", JSON.stringify([...saved, newTicket]));

    message.success("Ticket Created Successfully ✅");
    navigate("/tickets");
  };

  return (
    <div style={{ padding: "20px", background: "#f5f6f8", minHeight: "100vh" }}>

      {/* HEADER (same like Leads) */}
      <div style={{ marginBottom: 20 }}>
        <Title level={3} style={{ marginBottom: 4 }}>Create Ticket</Title>
        <Text type="secondary">Create and assign a new ticket</Text>
      </div>

      {/* CARD FORM */}
      <Card
        style={{
          borderRadius: 16,
          boxShadow: "0 6px 18px rgba(15,23,42,0.06)",
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >

          {/* TITLE */}
          <Form.Item
            label="Ticket Title"
            name="title"
            rules={[{ required: true, message: "Enter ticket title" }]}
          >
            <Input placeholder="Enter ticket title" />
          </Form.Item>

          {/* DESCRIPTION */}
          <Form.Item
            label="Description"
            name="description"
          >
            <Input.TextArea rows={4} placeholder="Enter description" />
          </Form.Item>

          {/* ROW */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Assign Developer"
                name="developer"
                rules={[{ required: true, message: "Select developer" }]}
              >
                <Select placeholder="Select developer">
                  <Option value="John">John</Option>
                  <Option value="Mike">Mike</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Status"
                name="status"
                initialValue="Open"
              >
                <Select>
                  <Option value="Open">Open</Option>
                  <Option value="In Progress">In Progress</Option>
                  <Option value="Closed">Closed</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* PRIORITY */}
          <Form.Item
            label="Priority"
            name="priority"
            initialValue="Medium"
          >
            <Select>
              <Option value="Low">Low</Option>
              <Option value="Medium">Medium</Option>
              <Option value="High">High</Option>
            </Select>
          </Form.Item>

          {/* BUTTONS */}
          <Row gutter={10}>
            <Col span={12}>
              <Button
                block
                onClick={() => navigate("/tickets")}
              >
                Cancel
              </Button>
            </Col>

            <Col span={12}>
              <Button
                type="primary"
                htmlType="submit"
                block
              >
                Create Ticket
              </Button>
            </Col>
          </Row>

        </Form>
      </Card>
    </div>
  );
}