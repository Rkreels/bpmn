
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";

// Page imports
import Dashboard from "./pages/Dashboard";
import ProcessManager from "./pages/ProcessManager";
import JourneyModeler from "./pages/JourneyModeler";
import CollaborationHub from "./pages/CollaborationHub";
import ProcessIntelligence from "./pages/ProcessIntelligence";
import Repository from "./pages/Repository";
import NotFound from "./pages/NotFound";
import TransformationCockpit from "./pages/TransformationCockpit";
import ReportsDashboards from "./pages/ReportsDashboards";
import UserManagement from "./pages/UserManagement";
import Settings from "./pages/Settings";

// Set up QueryClient for data fetching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/process-manager" element={<ProcessManager />} />
        <Route path="/journey-modeler" element={<JourneyModeler />} />
        <Route path="/collaboration-hub" element={<CollaborationHub />} />
        <Route path="/repository" element={<Repository />} />
        <Route path="/process-intelligence" element={<ProcessIntelligence />} />
        <Route path="/transformation-cockpit" element={<TransformationCockpit />} />
        <Route path="/reports-dashboards" element={<ReportsDashboards />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/settings" element={<Settings />} />
        
        {/* Additional paths for improved navigation */}
        <Route path="/reports" element={<ReportsDashboards />} />
        <Route path="/users" element={<UserManagement />} />
        
        {/* Catch all not found routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
