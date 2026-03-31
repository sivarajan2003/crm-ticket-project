import { useState } from "react";
import { Card, Input, Button, Tag, Row, Col } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

export default function Projects() {

  const [search, setSearch] = useState("");

  const projects = [
    {
      id: "#PRJ001",
      name: "CRM System",
      manager: "John",
      tickets: 12,
      status: "Active",
    },
    {
      id: "#PRJ002",
      name: "E-commerce App",
      manager: "Mike",
      tickets: 8,
      status: "In Progress",
    },
    {
      id: "#PRJ003",
      name: "Ticket System",
      manager: "Alex",
      tickets: 5,
      status: "Completed",
    },
  ];

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status) => {
    if (status === "Active") return "green";
    if (status === "In Progress") return "blue";
    if (status === "Completed") return "purple";
    return "default";
  };

  return (
    <div style={{ padding: 20, background: "#f5f6f8", minHeight: "100vh" }}>

      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 26, fontWeight: 700 }}>Projects</div>
          <div style={{ color: "#6b7280" }}>Manage all ticket projects</div>
        </div>

        <Button type="primary" icon={<PlusOutlined />}>
          Add Project
        </Button>
      </div>

      {/* STATS */}
      <Row gutter={16} style={{ marginBottom: 20 }}>
        {[
          { title: "Total Projects", value: 3, color: "#6366f1" },
          { title: "Active", value: 1, color: "#10b981" },
          { title: "In Progress", value: 1, color: "#3b82f6" },
          { title: "Completed", value: 1, color: "#a855f7" },
        ].map((item, i) => (
          <Col xs={24} sm={12} lg={6} key={i}>
            <Card style={{ borderRadius: 14 }}>
              <div>
                <div style={{ fontSize: 12, color: "#9ca3af" }}>{item.title}</div>
                <div style={{ fontSize: 26, fontWeight: 700 }}>{item.value}</div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* SEARCH */}
      <Card style={{ borderRadius: 12, marginBottom: 20 }}>
        <Input
          placeholder="Search project..."
          prefix={<SearchOutlined />}
          style={{ maxWidth: 300 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Card>

      {/* TABLE */}
      <Card style={{ borderRadius: 14 }}>
        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>
          Project Directory ({filtered.length})
        </div>

        <table className="w-full">
          <thead>
            <tr style={{ textAlign: "left", color: "#9ca3af" }}>
              <th>ID</th>
              <th>Name</th>
              <th>Manager</th>
              <th>Tickets</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} style={{ borderTop: "1px solid #eee" }}>
                <td>{p.id}</td>
                <td style={{ fontWeight: 600 }}>{p.name}</td>
                <td>{p.manager}</td>
                <td>{p.tickets}</td>
                <td>
                  <Tag color={getStatusColor(p.status)}>
                    {p.status}
                  </Tag>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

    </div>
  );
}