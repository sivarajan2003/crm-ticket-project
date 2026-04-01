import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Modal, Input, Select, message } from "antd";
import { Tabs, Grid } from "antd";
export default function TicketsPage() {
  const navigate = useNavigate();

  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem("tickets");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, title: "Login Bug", developer: "John", status: "In Progress" },
          { id: 2, title: "UI Issue", developer: "Mike", status: "Open" },
        ];
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
const [isModalOpen, setIsModalOpen] = useState(false);
const [mode, setMode] = useState("view"); // view / edit
const [currentTicket, setCurrentTicket] = useState(null);
const { useBreakpoint } = Grid;
const screens = useBreakpoint();
const isMobile = !screens.md;

  useEffect(() => {
    localStorage.setItem("tickets", JSON.stringify(tickets));
  }, [tickets]);
  // 👁 VIEW
const handleView = (ticket) => {
  setCurrentTicket(ticket);
  setMode("view");
  setIsModalOpen(true);
};

// ✏️ EDIT
const handleEdit = (ticket) => {
  setCurrentTicket(ticket);
  setMode("edit");
  setIsModalOpen(true);
};

// 💾 SAVE
const handleSave = () => {
  const updated = tickets.map(t =>
    t.id === currentTicket.id ? currentTicket : t
  );
  setTickets(updated);
  setIsModalOpen(false);
};

  // 🔍 Filter
  const filteredTickets = tickets.filter((t) => {
    return (
      t.title.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "All" || t.status === filter)
    );
  });

  return (
    <div style={{ padding: "20px", minHeight: "100vh", background: "#f5f6f8" }}>
      
      {/* 🔥 HEADER LIKE LEADS */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 26, fontWeight: 700, color: "#111827" }}>
          Tickets
        </div>
        <div style={{ fontSize: 14, color: "#6b7280" }}>
          Manage and track all tickets
        </div>
      </div>

      {/* 🔥 ACTION BUTTON */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <button
          onClick={() => navigate("/create-ticket")}
          style={{
            height: 40,
            padding: "0 18px",
            background: "#1677ff",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          + Add Ticket
        </button>
      </div>

      {/* 🔥 SEARCH + FILTER (LIKE LEADS) */}
      <div
        style={{
          background: "#fff",
          padding: 16,
          borderRadius: 12,
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <input
          placeholder="Search tickets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            height: 40,
            borderRadius: 8,
            border: "1px solid #ddd",
            padding: "0 10px",
            width: "250px",
          }}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            height: 40,
            borderRadius: 8,
            border: "1px solid #ddd",
            padding: "0 10px",
          }}
        >
          <option>All</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Closed</option>
        </select>
      </div>

      {/* 🔥 TABLE CARD */}
     {/* 🔥 RESPONSIVE TABLE */}

{isMobile ? (

  /* 📱 MOBILE VIEW → CARD + TABS */
  <Tabs defaultActiveKey="1">

    <Tabs.TabPane tab="Tickets" key="1">

      {filteredTickets.map((t) => (
        <div
          key={t.id}
          style={{
            background: "#fff",
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
          }}
        >
          <div style={{ fontWeight: 600 }}>{t.title}</div>

          <div style={{ fontSize: 13, color: "#6b7280" }}>
            #{t.id} • {t.developer}
          </div>

          {/* STATUS */}
          <div style={{ marginTop: 8 }}>
            <span
              style={{
                padding: "4px 10px",
                borderRadius: 20,
                fontSize: 12,
                background:
                  t.status === "Open"
                    ? "#fef3c7"
                    : t.status === "In Progress"
                    ? "#dbeafe"
                    : "#dcfce7",
                color:
                  t.status === "Open"
                    ? "#b45309"
                    : t.status === "In Progress"
                    ? "#1d4ed8"
                    : "#15803d",
              }}
            >
              {t.status}
            </span>
          </div>

          {/* ACTIONS */}
          <div style={{ display: "flex", gap: 10, marginTop: 10 }}>

            <EyeOutlined
              onClick={(e) => {
                e.stopPropagation();
                handleView(t);
              }}
            />

            <EditOutlined
              style={{ color: "#1677ff" }}
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(t);
              }}
            />

            <DeleteOutlined
              style={{ color: "#ef4444" }}
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm("Delete ticket?")) {
                  setTickets(tickets.filter(item => item.id !== t.id));
                }
              }}
            />

          </div>

        </div>
      ))}

    </Tabs.TabPane>

  </Tabs>

) : (

  /* 💻 DESKTOP VIEW → YOUR TABLE */
  <div
    style={{
      background: "#fff",
      borderRadius: 14,
      boxShadow: "0 6px 18px rgba(15,23,42,0.06)",
    }}
  >

    <div style={{ padding: "20px 24px", borderBottom: "1px solid #f0f0f0" }}>
      <span style={{ fontSize: 16, fontWeight: 600 }}>
        Ticket Directory ({filteredTickets.length})
      </span>
    </div>

    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ background: "#f9fafb" }}>
          <tr>
            <th style={th}>ID</th>
            <th style={th}>Title</th>
            <th style={th}>Developer</th>
            <th style={th}>Status</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredTickets.map((t) => (
            <tr key={t.id}>
              <td style={td}>#{t.id}</td>
              <td style={td}>{t.title}</td>
              <td style={td}>{t.developer}</td>

              <td style={td}>
                <span
                  style={{
                    padding: "5px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    background:
                      t.status === "Open"
                        ? "#fef3c7"
                        : t.status === "In Progress"
                        ? "#dbeafe"
                        : "#dcfce7",
                    color:
                      t.status === "Open"
                        ? "#b45309"
                        : t.status === "In Progress"
                        ? "#1d4ed8"
                        : "#15803d",
                  }}
                >
                  {t.status}
                </span>
              </td>

              {/* ACTIONS FIXED */}
              <td style={td}>
                <div style={{ display: "flex", gap: 10 }}>

                  <EyeOutlined onClick={() => handleView(t)} />

                  <EditOutlined
                    style={{ color: "#1677ff" }}
                    onClick={() => handleEdit(t)}
                  />

                  <DeleteOutlined
                    style={{ color: "#ef4444" }}
                    onClick={() => {
                      if (window.confirm("Delete ticket?")) {
                        setTickets(tickets.filter(item => item.id !== t.id));
                      }
                    }}
                  />

                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>

  </div>

)}
      <Modal
  title={mode === "view" ? "View Ticket" : "Edit Ticket"}
  open={isModalOpen}
  onCancel={() => setIsModalOpen(false)}
  footer={
    mode === "view"
      ? [
          <button onClick={() => setIsModalOpen(false)}>Close</button>
        ]
      : [
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>,
          <button onClick={handleSave} style={{ background: "#1677ff", color: "#fff" }}>
            Save
          </button>
        ]
  }
>
  {currentTicket && (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

      <Input
        value={currentTicket.title}
        disabled={mode === "view"}
        onChange={(e) =>
          setCurrentTicket({ ...currentTicket, title: e.target.value })
        }
      />

      <Input
        value={currentTicket.developer}
        disabled={mode === "view"}
        onChange={(e) =>
          setCurrentTicket({ ...currentTicket, developer: e.target.value })
        }
      />

      <Select
        value={currentTicket.status}
        disabled={mode === "view"}
        onChange={(value) =>
          setCurrentTicket({ ...currentTicket, status: value })
        }
      >
        <Select.Option value="Open">Open</Select.Option>
        <Select.Option value="In Progress">In Progress</Select.Option>
        <Select.Option value="Closed">Closed</Select.Option>
      </Select>

    </div>
  )}
</Modal>
    </div>
  );
}

// 🔥 SAME STYLE AS LEADS
const th = {
  padding: "14px",
  textAlign: "left",
  fontSize: "13px",
  color: "#6b7280",
  fontWeight: 600,
};

const td = {
  padding: "14px",
  fontSize: "14px",
};
const iconStyle = {
  cursor: "pointer",
  fontSize: "16px",
  transition: "0.2s",
};

const actionBtn = {
  padding: "6px 12px",
  border: "none",
  borderRadius: "6px",
  background: "#1677ff",
  color: "#fff",
  cursor: "pointer",
};