import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useVoice } from '@/contexts/VoiceContext';
import { demoProcesses } from '@/data/processManagerDemoData';
import { BookOpen, Play } from 'lucide-react';

interface DemoLoaderProps {
  onLoadDemo: (elements: any[], connections: any[], processName: string) => void;
}

export const DemoLoader: React.FC<DemoLoaderProps> = ({ onLoadDemo }) => {
  const [selectedDemo, setSelectedDemo] = useState<string>('');
  const { toast } = useToast();
  const { speakText } = useVoice();

  const handleLoadDemo = () => {
    const demo = demoProcesses.find(p => p.id === selectedDemo);
    if (!demo) {
      toast({
        title: "Error",
        description: "Please select a demo process",
        variant: "destructive"
      });
      return;
    }

    onLoadDemo(demo.elements, demo.connections, demo.name);
    
    toast({
      title: "Demo Loaded",
      description: `${demo.name} has been loaded successfully`
    });
    
    speakText(`Demo process ${demo.name} loaded. This ${demo.category} process contains ${demo.elements.length} elements and demonstrates typical business process modeling patterns.`);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Load Demo Process
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Select value={selectedDemo} onValueChange={setSelectedDemo}>
            <SelectTrigger>
              <SelectValue placeholder="Select a demo process" />
            </SelectTrigger>
            <SelectContent>
              {demoProcesses.map((demo) => (
                <SelectItem key={demo.id} value={demo.id}>
                  <div className="flex flex-col">
                    <span className="font-medium">{demo.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {demo.category} • v{demo.version}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {selectedDemo && (
          <div className="text-sm text-muted-foreground">
            {demoProcesses.find(p => p.id === selectedDemo)?.elements.length} elements • 
            {demoProcesses.find(p => p.id === selectedDemo)?.connections.length} connections
          </div>
        )}
        
        <Button 
          onClick={handleLoadDemo} 
          disabled={!selectedDemo}
          className="w-full"
        >
          <Play className="h-4 w-4 mr-2" />
          Load Demo Process
        </Button>
      </CardContent>
    </Card>
  );
};