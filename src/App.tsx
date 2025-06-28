
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VoiceProvider } from "@/contexts/VoiceContext";
import ProcessManager from "./pages/ProcessManager";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <VoiceProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProcessManager />} />
            <Route path="/process-manager" element={<ProcessManager />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </VoiceProvider>
  </QueryClientProvider>
);

export default App;
