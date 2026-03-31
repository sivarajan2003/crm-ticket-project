import React, { useState } from "react";
import { Row, Col, Card, Input, Tag, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { message, Modal } from "antd";
export default function NotificationPage() {

  const [selected, setSelected] = useState(0);
// DELETE CONFIRM
const handleDelete = (index) => {
  Modal.confirm({
    title: "Are you sure?",
    content: "Do you want to delete this notification?",
    okText: "Yes, Delete",
    okType: "danger",
    cancelText: "Cancel",
    onOk() {
      const updated = [...notifications];
      updated.splice(index, 1);
      setSelected(0);
      message.success("Notification deleted successfully ✅");
    }
  });
};

// MARK AS READ
const handleRead = () => {
  message.success("Marked as read ✔️");
};
  const notifications = [
    {
      id: 1,
      title: "Ticket Assigned",
      message: "Ticket #123 assigned to you",
      time: "2 mins ago",
      status: "Unread"
    },
    {
      id: 2,
      title: "Ticket Completed",
      message: "Login bug resolved successfully",
      time: "1 hour ago",
      status: "Read"
    },
    {
      id: 3,
      title: "New Ticket Created",
      message: "New issue reported by client",
      time: "3 hours ago",
      status: "Unread"
    }
  ];

  return (
    <div style={{ padding: 20, background: "#f5f6f8", minHeight: "100vh" }}>

      {/* HEADER */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 26, fontWeight: 700 }}>Notifications</div>
        <div style={{ fontSize: 14, color: "#6b7280" }}>
          Manage all system alerts
        </div>
      </div>

      <Row gutter={16}>

        {/* LEFT LIST */}
        <Col xs={24} md={8}>
          <Card style={{ borderRadius: 14 }}>

            {/* SEARCH */}
            <Input
              placeholder="Search notifications..."
              prefix={<SearchOutlined />}
              style={{ marginBottom: 15, borderRadius: 8 }}
            />

            {/* LIST */}
            {notifications.map((n, index) => (
              <div
                key={n.id}
                onClick={() => setSelected(index)}
                style={{
                  padding: 12,
                  borderRadius: 10,
                  cursor: "pointer",
                  marginBottom: 10,
                  background: selected === index ? "#eef2ff" : "#fff",
                  border: "1px solid #eee"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: 600 }}>{n.title}</span>
                  <Tag color={n.status === "Unread" ? "blue" : "default"}>
                    {n.status}
                  </Tag>
                </div>

                <div style={{ fontSize: 13, color: "#6b7280" }}>
                  {n.message}
                </div>

                <div style={{ fontSize: 12, color: "#9ca3af" }}>
                  {n.time}
                </div>
              </div>
            ))}

          </Card>
        </Col>

        {/* RIGHT DETAILS */}
        <Col xs={24} md={16}>
          <Card style={{ borderRadius: 14 }}>

            <div style={{ marginBottom: 15 }}>
              <div style={{ fontSize: 18, fontWeight: 600 }}>
                {notifications[selected].title}
              </div>
              <div style={{ fontSize: 12, color: "#9ca3af" }}>
                {notifications[selected].time}
              </div>
            </div>

            <div style={{ fontSize: 14, marginBottom: 20 }}>
              {notifications[selected].message}
            </div>

            <div style={{ display: "flex", gap: 10 }}>
             <Button type="primary" onClick={handleRead}>
  Mark as Read
</Button>

<Button danger onClick={() => handleDelete(selected)}>
  Delete
</Button>
            </div>

          </Card>
        </Col>

      </Row>
    </div>
  );
}