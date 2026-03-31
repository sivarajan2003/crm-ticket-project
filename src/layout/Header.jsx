import { Layout, Dropdown, Select } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DownOutlined,
  LogoutOutlined,
  SettingOutlined
} from "@ant-design/icons";

const { Header } = Layout;
const { Option } = Select;

export default function AppHeader({ collapsed, setCollapsed }) {

  // Dummy user (no backend)
  const currentUser = { name: "Admin" };

  const handleLogout = () => {
    console.log("Logged out");
    // optional: localStorage.clear();
  };

  return (
    <Header
      style={{
        background: "#ffffff",
        padding: "0 24px",
        height: 64,
        position: "sticky",
        top: 0,
        zIndex: 99,
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        borderBottom: "1px solid #f3f4f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Sidebar Toggle */}
      <div
        onClick={() => setCollapsed(!collapsed)}
        style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
      >
        {collapsed ? (
          <MenuUnfoldOutlined style={{ fontSize: 20 }} />
        ) : (
          <MenuFoldOutlined style={{ fontSize: 20 }} />
        )}
      </div>

      {/* Profile Dropdown */}
      <Dropdown
        placement="bottomRight"
        trigger={["click"]}
        menu={{
          items: [
            {
              key: "profile",
              icon: <SettingOutlined />,
              label: "Profile"
            },
            { type: "divider" },
            {
              key: "logout",
              icon: <LogoutOutlined style={{ color: "red" }} />,
              label: <span style={{ color: "red" }}>Logout</span>
            }
          ],
          onClick: ({ key }) => {
            if (key === "profile") {
              console.log("Profile clicked");
            }
            if (key === "logout") {
              handleLogout();
            }
          }
        }}
      >
        <div
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#e0e7ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#4f46e5"
            }}
          >
            <UserOutlined />
          </div>

          <span>{currentUser.name}</span>
          <DownOutlined />
        </div>
      </Dropdown>
    </Header>
  );
}