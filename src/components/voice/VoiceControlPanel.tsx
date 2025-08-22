import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useVoice } from '@/contexts/VoiceContext';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Settings,
  TestTube,
  AlertCircle 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const VoiceControlPanel: React.FC = () => {
  const { 
    isVoiceEnabled, 
    toggleVoice, 
    isSupported, 
    voices, 
    selectedVoice, 
    setSelectedVoice,
    speakText,
    stopSpeaking
  } = useVoice();
  
  const [volume, setVolume] = useState([0.8]);
  const [rate, setRate] = useState([0.9]);
  const [pitch, setPitch] = useState([1.0]);

  const handleTestVoice = () => {
    const testMessage = "Hello! This is a voice test. I'm your AI assistant ready to help you with process modeling.";
    speakText(testMessage);
  };

  const handleVoiceSelection = (voiceIndex: string) => {
    const voice = voices[parseInt(voiceIndex)];
    if (voice) {
      setSelectedVoice(voice);
    }
  };

  if (!isSupported) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-destructive" />
            Voice Not Supported
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Voice synthesis is not supported in your browser.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Voice Control</span>
          <Badge variant={isVoiceEnabled ? "default" : "secondary"}>
            {isVoiceEnabled ? "Enabled" : "Disabled"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Voice Assistant</span>
          <Button
            variant={isVoiceEnabled ? "default" : "outline"}
            size="sm"
            onClick={toggleVoice}
            className="flex items-center gap-2"
          >
            {isVoiceEnabled ? (
              <>
                <Volume2 className="w-4 h-4" />
                On
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                Off
              </>
            )}
          </Button>
        </div>

        {isVoiceEnabled && (
          <>
            {/* Voice Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Voice</label>
              <Select 
                value={selectedVoice ? voices.indexOf(selectedVoice).toString() : ""}
                onValueChange={handleVoiceSelection}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a voice" />
                </SelectTrigger>
                <SelectContent className="z-50 bg-popover">
                  {voices.map((voice, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      <div className="flex flex-col">
                        <span>{voice.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {voice.lang} - {voice.localService ? 'Local' : 'Remote'}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Voice Settings */}
            <div className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Volume: {Math.round(volume[0] * 100)}%</label>
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={1}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Speed: {Math.round(rate[0] * 100)}%</label>
                <Slider
                  value={rate}
                  onValueChange={setRate}
                  max={2}
                  min={0.5}
                  step={0.1}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Pitch: {Math.round(pitch[0] * 100)}%</label>
                <Slider
                  value={pitch}
                  onValueChange={setPitch}
                  max={2}
                  min={0.5}
                  step={0.1}
                  className="w-full"
                />
              </div>
            </div>

            {/* Test Button */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleTestVoice}
              className="w-full flex items-center gap-2"
            >
              <TestTube className="w-4 h-4" />
              Test Voice
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};