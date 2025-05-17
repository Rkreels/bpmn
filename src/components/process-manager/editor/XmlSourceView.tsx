
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Save, Download, Copy, Check, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useVoice } from "@/contexts/VoiceContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface XmlSourceViewProps {
  xmlSource: string;
  onXmlChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const XmlSourceView: React.FC<XmlSourceViewProps> = ({
  xmlSource,
  onXmlChange
}) => {
  const { toast } = useToast();
  const { isVoiceEnabled, speakText } = useVoice();
  const isMobile = useIsMobile();
  const [isCopied, setIsCopied] = React.useState(false);
  
  const handleFormatXml = () => {
    try {
      // Simple XML formatting
      const formatted = xmlSource
        .replace(/></g, '>\n<')
        .replace(/><\/bpmn:/g, '>\n  </bpmn:')
        .replace(/<bpmn:(\w+)/g, '\n<bpmn:$1')
        .replace(/^\s*[\r\n]/gm, '');
      
      // Create a new change event
      const event = {
        target: {
          value: formatted
        }
      } as React.ChangeEvent<HTMLTextAreaElement>;
      
      onXmlChange(event);
      
      toast({
        title: "XML Formatted",
        description: "The XML source has been formatted for better readability."
      });
      
      if (isVoiceEnabled) {
        speakText("XML formatted successfully");
      }
    } catch (error) {
      toast({
        title: "Format Failed",
        description: "Failed to format the XML. Please check for syntax errors.",
        variant: "destructive"
      });
    }
  };
  
  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(xmlSource);
      setIsCopied(true);
      
      toast({
        title: "Copied to Clipboard",
        description: "The XML source has been copied to your clipboard."
      });
      
      if (isVoiceEnabled) {
        speakText("XML copied to clipboard");
      }
      
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy to clipboard. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const handleExport = () => {
    try {
      const blob = new Blob([xmlSource], { type: "application/xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "process-model.bpmn";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "XML Exported",
        description: "The XML source has been exported as a BPMN file."
      });
      
      if (isVoiceEnabled) {
        speakText("XML exported successfully");
      }
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export the XML. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h3 className="text-lg font-medium">BPMN XML Source</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handleFormatXml} className="flex-1 sm:flex-none">
            <RefreshCw className="h-4 w-4 mr-2" />
            Format XML
          </Button>
          <Button variant="outline" size="sm" onClick={handleCopyToClipboard} className="flex-1 sm:flex-none">
            {isCopied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport} className="flex-1 sm:flex-none">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      <div className="flex-1 border rounded-md overflow-hidden">
        <textarea
          className="font-mono text-sm w-full h-full p-4 focus:outline-none resize-none bg-white"
          value={xmlSource}
          onChange={onXmlChange}
          spellCheck="false"
          placeholder="<?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?>&#10;&lt;bpmn:definitions xmlns:bpmn=&quot;http://www.omg.org/spec/BPMN/20100524/MODEL&quot;&gt;&#10;  &lt;!-- Your BPMN XML content here --&gt;&#10;&lt;/bpmn:definitions&gt;"
        ></textarea>
      </div>
    </div>
  );
};
