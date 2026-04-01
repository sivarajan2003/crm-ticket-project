import { useState } from "react";
import {
  Card, Input, Button, Tag, Row, Col, Avatar,
  Modal, Form, Select, message, Tabs, Grid
} from "antd";
import {
  SearchOutlined, PlusOutlined,
  EyeOutlined, EditOutlined, DeleteOutlined
} from "@ant-design/icons";

const { Option } = Select;

export default function Users() {

  const currentUser = { id: 1, role: "Admin" }; // 🔥 change to "Developer" to test restriction

  const [users, setUsers] = useState([
    { id: 1, code: "#USR001", name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, code: "#USR002", name: "Mike Smith", email: "mike@example.com", role: "Developer", status: "Inactive" },
  ]);

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [form] = Form.useForm();

  // 🔍 FILTER
  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  // 🎯 STATUS COLOR
  const getStatusColor = (status) =>
    status === "Active" ? "green" : "red";

  // ➕ ADD USER
  const handleAdd = () => {
    setEditingUser(null);
    form.resetFields();
    setModalOpen(true);
  };

  // ✏️ EDIT USER
  const handleEdit = (user) => {
    if (currentUser.role !== "Admin") {
      message.warning("Only Admin can edit users");
      return;
    }

    setEditingUser(user);
    form.setFieldsValue(user);
    setModalOpen(true);
  };

  // ❌ DELETE USER
  const handleDelete = (id) => {
    if (currentUser.role !== "Admin") {
      message.warning("Only Admin can delete users");
      return;
    }

    setUsers(users.filter((u) => u.id !== id));
    message.success("User deleted");
  };

  // 💾 SAVE USER
  const handleSubmit = (values) => {
    if (editingUser) {
      // UPDATE
      setUsers(users.map((u) =>
        u.id === editingUser.id ? { ...u, ...values } : u
      ));
      message.success("User updated");
    } else {
      // CREATE
      const newUser = {
        id: Date.now(),
        code: `#USR${Math.floor(Math.random() * 1000)}`,
        ...values,
      };
      setUsers([newUser, ...users]);
      message.success("User added");
    }

    setModalOpen(false);
    form.resetFields();
  };
const { useBreakpoint } = Grid;
const screens = useBreakpoint();
const isMobile = !screens.md;
  return (
    <div style={{ padding: 20, background: "#f5f6f8", minHeight: "100vh" }}>

      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 26, fontWeight: 700 }}>Users</div>
          <div style={{ color: "#6b7280" }}>Manage system users</div>
        </div>

        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add User
        </Button>
      </div>

      {/* SEARCH */}
      <Card style={{ borderRadius: 12, marginBottom: 20 }}>
        <Input
          placeholder="Search users..."
          prefix={<SearchOutlined />}
          style={{ maxWidth: 300 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Card>

      {/* TABLE */}
      {/* 🔥 RESPONSIVE VIEW */}

{isMobile ? (

  /* 📱 MOBILE → CARD + TABS */
  <Tabs defaultActiveKey="1">

    <Tabs.TabPane tab="Users" key="1">

      {filtered.map((u) => {
        const isAdmin = currentUser.role === "Admin";

        return (
          <Card
            key={u.id}
            style={{
              marginBottom: 12,
              borderRadius: 12,
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Avatar style={{ background: "#6366f1" }}>
                {u.name.charAt(0)}
              </Avatar>

              <div>
                <div style={{ fontWeight: 600 }}>{u.name}</div>
                <div style={{ fontSize: 12, color: "#9ca3af" }}>{u.code}</div>
              </div>
            </div>

            <div style={{ marginTop: 10 }}>{u.email}</div>

            <div style={{ marginTop: 8 }}>
              <Tag color="blue">{u.role}</Tag>
              <Tag color={getStatusColor(u.status)}>{u.status}</Tag>
            </div>

            {/* ACTIONS */}
            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <EyeOutlined />

              <EditOutlined
                style={{ color: "#1677ff" }}
                onClick={() => handleEdit(u)}
              />

              <DeleteOutlined
                style={{ color: "#ef4444" }}
                onClick={() => handleDelete(u.id)}
              />
            </div>

          </Card>
        );
      })}

    </Tabs.TabPane>

  </Tabs>

) : (

  /* 💻 DESKTOP → ORIGINAL TABLE */
  <Card style={{ borderRadius: 14 }}>
    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>
      User Directory ({filtered.length})
    </div>

    <table className="w-full">
      <thead>
        <tr style={{ textAlign: "left", color: "#9ca3af" }}>
          <th>User</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
          <th style={{ textAlign: "center" }}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {filtered.map((u) => {
          const isAdmin = currentUser.role === "Admin";

          return (
            <tr key={u.id} style={{ borderTop: "1px solid #eee" }}>

              <td style={{ padding: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Avatar style={{ background: "#6366f1" }}>
                    {u.name.charAt(0)}
                  </Avatar>
                  <div>
                    <div style={{ fontWeight: 600 }}>{u.name}</div>
                    <div style={{ fontSize: 12, color: "#9ca3af" }}>{u.code}</div>
                  </div>
                </div>
              </td>

              <td>{u.email}</td>

              <td><Tag color="blue">{u.role}</Tag></td>

              <td>
                <Tag color={getStatusColor(u.status)}>
                  {u.status}
                </Tag>
              </td>

              {/* ACTIONS */}
              <td style={{ textAlign: "center" }}>
                <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>

                  <EyeOutlined />

                  <EditOutlined
                    style={{ color: "#1677ff" }}
                    disabled={!isAdmin}
                    onClick={() => handleEdit(u)}
                  />

                  <DeleteOutlined
                    style={{ color: "#ef4444" }}
                    disabled={!isAdmin}
                    onClick={() => handleDelete(u.id)}
                  />

                </div>
              </td>

            </tr>
          );
        })}
      </tbody>
    </table>
  </Card>

)}

      {/* 🔥 MODAL */}
      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>

          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
            <Select>
              <Option value="Admin">Admin</Option>
              <Option value="Developer">Developer</Option>
              <Option value="Support">Support</Option>
            </Select>
          </Form.Item>

          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            {editingUser ? "Update User" : "Create User"}
          </Button>

        </Form>
      </Modal>

    </div>
  );
}