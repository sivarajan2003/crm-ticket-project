import { useState } from "react";
import {
  Card,
  Input,
  Row,
  Col,
  Typography,
  Tag,
  Table,
  Select,
  Tabs,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {  Grid } from "antd";
const { Title, Text } = Typography;
const { Option } = Select;

export default function MyTickets() {
  const currentUser = "John";

  const [tickets, setTickets] = useState([
    { id: 1, title: "Login Bug", developer: "John", status: "In Progress", priority: "High" },
    { id: 2, title: "UI Issue", developer: "John", status: "Open", priority: "Medium" },
    { id: 3, title: "Payment Error", developer: "John", status: "Closed", priority: "Low" },
  ]);

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const myTickets = tickets.filter(t => t.developer === currentUser);

  const filtered = myTickets
    .filter(t =>
      t.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter(t =>
      activeTab === "All" ? true : t.status === activeTab
    );

  // 🔥 COLORS
  const statusColor = {
    Open: "gold",
    "In Progress": "blue",
    Closed: "green",
  };

  const priorityColor = {
    High: "red",
    Medium: "orange",
    Low: "green",
  };

  // 🔥 TABLE
  const columns = [
    {
      title: "Ticket",
      render: (_, r) => (
        <div>
          <div style={{ fontWeight: 600 }}>{r.title}</div>
          <div style={{ fontSize: 12, color: "#9ca3af" }}>
            #{r.id}
          </div>
        </div>
      ),
    },
    {
      title: "Status",
      render: (_, r) => <Tag color={statusColor[r.status]}>{r.status}</Tag>,
    },
    {
      title: "Priority",
      render: (_, r) => <Tag color={priorityColor[r.priority]}>{r.priority}</Tag>,
    },
    {
      title: "Actions",
      render: (_, r) => (
        <div style={{ display: "flex", gap: 8 }}>
          <EyeOutlined style={iconStyle} />
          <EditOutlined style={{ ...iconStyle, color: "#1677ff" }} />
          <DeleteOutlined
            style={{ ...iconStyle, color: "#ef4444" }}
            onClick={() =>
              setTickets(tickets.filter(t => t.id !== r.id))
            }
          />
        </div>
      ),
    },
  ];
  const { useBreakpoint } = Grid;
const screens = useBreakpoint();
const isMobile = !screens.md;

  return (
    <div style={{ padding: 20, background: "#f5f6f8", minHeight: "100vh" }}>

      {/* HEADER */}
      <div style={{ marginBottom: 20 }}>
        <Title level={3}>My Tickets</Title>
        <Text type="secondary">Track and manage your work</Text>
      </div>

      {/* 🔥 STATS */}
      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
  {[
    {
      title: "Total Tickets",
      count: myTickets.length,
      gradient: "linear-gradient(135deg,#6366f1,#8b5cf6)",
      icon: <FileText size={24} />,
    },
    {
      title: "Open",
      count: myTickets.filter(t => t.status === "Open").length,
      gradient: "linear-gradient(135deg,#f97316,#fb923c)",
      icon: <Clock size={24} />,
    },
    {
      title: "In Progress",
      count: myTickets.filter(t => t.status === "In Progress").length,
      gradient: "linear-gradient(135deg,#3b82f6,#60a5fa)",
      icon: <CheckCircle size={24} />,
    },
    {
      title: "Closed",
      count: myTickets.filter(t => t.status === "Closed").length,
      gradient: "linear-gradient(135deg,#16a34a,#4ade80)",
      icon: <XCircle size={24} />,
    },
  ].map((item, index) => (
    <Col xs={24} sm={12} lg={6} key={index}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <div
          style={{
            background: item.gradient,
            borderRadius: 18,
            padding: "20px",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}

          // 🔥 HOVER EFFECT
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-6px) scale(1.03)";
            e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0px)";
            e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.15)";
          }}
        >

          {/* TEXT */}
          <div>
            <div style={{ fontSize: 13, opacity: 0.85 }}>
              {item.title}
            </div>

            <div style={{
              fontSize: 30,
              fontWeight: 700,
              marginTop: 5
            }}>
              {item.count}
            </div>

            <div style={{ fontSize: 12, opacity: 0.7 }}>
              {item.title === "Total Tickets"
                ? "All assigned tickets"
                : item.title === "Open"
                ? "Pending tickets"
                : item.title === "In Progress"
                ? "Ongoing work"
                : "Completed tickets"}
            </div>
          </div>

          {/* ICON */}
          <div style={{ fontSize: 28, opacity: 0.9 }}>
            {item.icon}
          </div>

        </div>
      </motion.div>
    </Col>
  ))}
</Row>
      {/* 🔥 SEARCH + FILTER */}
      <Card style={{ marginBottom: 20, borderRadius: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search tickets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 300 }}
          />

          <Select defaultValue="newest" style={{ width: 150 }}>
            <Option value="newest">Newest</Option>
            <Option value="oldest">Oldest</Option>
          </Select>
        </div>

        {/* 🔥 TABS */}
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          style={{ marginTop: 10 }}
        >
          {["All", "Open", "In Progress", "Closed"].map(tab => (
            <Tabs.TabPane tab={tab} key={tab} />
          ))}
        </Tabs>
      </Card>

      {/* 🔥 TABLE */}
      {/* 🔥 RESPONSIVE VIEW */}

{isMobile ? (

  /* 📱 MOBILE VIEW → CARD FORMAT */
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
        <div style={{ fontWeight: 600 }}>{t.title}</div>
        <div style={{ fontSize: 12, color: "#9ca3af" }}>
          #{t.id}
        </div>

        <div style={{ marginTop: 8 }}>
          <Tag color={statusColor[t.status]}>{t.status}</Tag>
          <Tag color={priorityColor[t.priority]}>{t.priority}</Tag>
        </div>

        {/* ACTIONS */}
        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          <EyeOutlined style={iconStyle} />
          <EditOutlined style={{ ...iconStyle, color: "#1677ff" }} />
          <DeleteOutlined
            style={{ ...iconStyle, color: "#ef4444" }}
            onClick={() =>
              setTickets(tickets.filter(x => x.id !== t.id))
            }
          />
        </div>
      </Card>
    ))}
  </div>

) : (

  /* 💻 DESKTOP VIEW → TABLE */
  <Card style={{ borderRadius: 14 }}>
    <Table
      columns={columns}
      dataSource={filtered}
      rowKey="id"
    />
  </Card>

)}
    </div>
  );
}

// 🔥 ICON STYLE
const iconStyle = {
  fontSize: 16,
  cursor: "pointer",
};