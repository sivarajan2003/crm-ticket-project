import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import TicketsPage from "./pages/TicketsPage";
import TicketDetails from "./pages/TicketDetails";
import NotificationPage from "./pages/NotificationPage";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Products from "./pages/Products";
import Contact from "./pages/administration/Contact";
import Users from "./pages/administration/Users";
import RolesPermissions from "./pages/administration/RolesPermissions";
import Tasks from "./pages/Tasks";
import Payments from "./pages/Payments";
import Tickets from "./pages/Tickets";
import Notes from "./pages/Notes";
import AuditLogs from "./pages/administration/AuditLogs";
import LeadAutomation from "./pages/administration/LeadAutomation";
import ActionPlans from "./pages/administration/ActionPlans";
//marketing
import MarketingDashboard from "./pages/marketing/MarketingDashboard";
import CampaignsList from "./pages/marketing/CampaignsList";
import WhatsAppCampaign from "./pages/marketing/WhatsAppCampaign";


import SupportTicket from "./pages/SupportTicket";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import Projects from "./pages/Projects";
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
          <Route path="projects" element={<Projects />} />

          {/* FIXED NAME */}
          <Route path="notifications" element={<NotificationPage />} />

          {/* Settings */}

          <Route path="roles" element={<RolesPermissions />} />
          <Route path="audit-logs" element={<AuditLogs />} />
          <Route path="lead-automation" element={<LeadAutomation />} />
          <Route path="action-plans" element={<ActionPlans />} />
          <Route path="marketing-dashboard" element={<MarketingDashboard />} />
          <Route path="campaigns" element={<CampaignsList />} />
          <Route path="whatsapp-campaign" element={<WhatsAppCampaign />} />

          <Route path="settings" element={<Settings />} />

        </Route>

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;