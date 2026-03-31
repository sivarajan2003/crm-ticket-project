import { useNavigate } from "react-router-dom";
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  Typography,
  message,
  Divider
} from "antd";

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
    <div
      style={{
        padding: "30px",
        background: "#f9fafb",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}
      <div style={{ marginBottom: 24 }}>
        <Title level={3} style={{ marginBottom: 5 }}>
          Create Ticket
        </Title>
        <Text type="secondary">
          Fill in the details to create and assign a new ticket
        </Text>
      </div>

      {/* FORM CARD */}
      <Card
        style={{
          borderRadius: 12,
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        }}
        bodyStyle={{ padding: "30px" }}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          
          {/* BASIC INFO */}
          <Title level={5} style={{ marginBottom: 16 }}>
            Basic Information
          </Title>

          <Form.Item
            label="Ticket Title"
            name="title"
            rules={[{ required: true, message: "Enter ticket title" }]}
          >
            <Input size="large" placeholder="Enter ticket title" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea
              rows={4}
              placeholder="Enter ticket description"
            />
          </Form.Item>

          <Divider />

          {/* ASSIGNMENT */}
          <Title level={5} style={{ marginBottom: 16 }}>
            Assignment Details
          </Title>

          <Row gutter={20}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Assign Developer"
                name="developer"
                rules={[{ required: true, message: "Select developer" }]}
              >
                <Select size="large" placeholder="Select developer">
                  <Option value="John">John</Option>
                  <Option value="Mike">Mike</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Status"
                name="status"
                initialValue="Open"
              >
                <Select size="large">
                  <Option value="Open">Open</Option>
                  <Option value="In Progress">In Progress</Option>
                  <Option value="Closed">Closed</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Priority"
            name="priority"
            initialValue="Medium"
          >
            <Select size="large">
              <Option value="Low">Low</Option>
              <Option value="Medium">Medium</Option>
              <Option value="High">High</Option>
            </Select>
          </Form.Item>

          <Divider />

          {/* ACTION BUTTONS */}
          <Row justify="end" gutter={12}>
            <Col>
              <Button size="large" onClick={() => navigate("/tickets")}>
                Cancel
              </Button>
            </Col>

            <Col>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
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