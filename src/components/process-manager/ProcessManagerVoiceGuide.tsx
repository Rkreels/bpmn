
import { useEffect } from "react";
import { useVoice } from "@/contexts/VoiceContext";
import { useVoiceTrainer } from "@/contexts/VoiceTrainerContext";

export const ProcessManagerVoiceGuide = () => {
  const { speakText } = useVoice();
  const { isTrainerEnabled } = useVoiceTrainer();

  useEffect(() => {
    if (isTrainerEnabled) {
      const welcomeMessage = `Welcome to Process Manager! This is your comprehensive platform for designing, managing, and optimizing business process models using BPMN standards.
      
      Here you can:
      - Create and edit process diagrams using drag-and-drop BPMN elements
      - Manage process templates and reusable components in the repository
      - Set process properties including ownership, classification, and metadata
      - Validate process models for correctness and compliance
      - Simulate process execution to identify bottlenecks and optimization opportunities
      - Export processes in multiple formats including BPMN XML, JSON, and PDF
      - Collaborate with team members on process improvement initiatives
      
      The Editor tab provides a visual canvas with element palette for modeling.
      Properties tab allows you to configure process metadata and business rules.
      Repository tab contains templates and reusable process components.
      
      All modeling actions provide voice feedback and the system guides you through best practices.
      Use the element palette to add tasks, gateways, events, and connectors to your process flow.`;

      // Delay the welcome message slightly to allow page to load
      const timer = setTimeout(() => {
        speakText(welcomeMessage);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isTrainerEnabled, speakText]);

  return null; // This component only provides voice guidance
};
