
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { VoiceProvider } from "@/contexts/VoiceContext";
import { VoiceTrainerProvider } from "@/contexts/VoiceTrainerContext";

// Import pages
import Dashboard from "@/pages/Dashboard";
import ProcessManager from "@/pages/ProcessManager";
import JourneyModeler from "@/pages/JourneyModeler";
import CollaborationHub from "@/pages/CollaborationHub";
import Repository from "@/pages/Repository";
import ProcessIntelligence from "@/pages/ProcessIntelligence";
import ProcessMining from "@/pages/ProcessMining";
import TransformationCockpit from "@/pages/TransformationCockpit";
import Reports from "@/pages/Reports";
import Users from "@/pages/Users";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <VoiceProvider>
      <VoiceTrainerProvider>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/process-manager" element={<ProcessManager />} />
            <Route path="/journey-modeler" element={<JourneyModeler />} />
            <Route path="/collaboration-hub" element={<CollaborationHub />} />
            <Route path="/repository" element={<Repository />} />
            <Route path="/process-intelligence" element={<ProcessIntelligence />} />
            <Route path="/process-mining" element={<ProcessMining />} />
            <Route path="/transformation-cockpit" element={<TransformationCockpit />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </div>
      </VoiceTrainerProvider>
    </VoiceProvider>
  );
}

export default App;
