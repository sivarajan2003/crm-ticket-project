import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import TicketsPage from "./pages/TicketsPage";
import TicketDetails from "./pages/TicketDetails";
import NotificationPage from "./pages/NotificationPage";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
//import Products from "./pages/Products";

import SupportTicket from "./pages/SupportTicket";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
//import Projects from "./pages/Projects";
import MyTickets from "./pages/MyTickets";
import CreateTicket from "./pages/CreateTicket";
import SupportChat from "./pages/SupportChat";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<MainLayout />}>

          {/* Dashboard */}
          <Route index element={<Dashboard />} />
          <Route path="support-ticket" element={<SupportTicket />} />

          {/* Tickets */}
          <Route path="tickets" element={<TicketsPage />} />
          <Route path="tickets/:id" element={<TicketDetails />} />

          {/* NEW ROUTES 🔥 */}
          <Route path="my-tickets" element={<MyTickets />} />
        <Route path="create-ticket" element={<CreateTicket />} /> 
          <Route path="support-chat" element={<SupportChat />} />
          {/* Sidebar Pages */}
          <Route path="users" element={<Users />} />

          <Route path="reports" element={<Reports />} />
          
          {/* FIXED NAME */}
          <Route path="notifications" element={<NotificationPage />} />

          {/* Settings */}
          <Route path="settings" element={<Settings />} />

        </Route>

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;