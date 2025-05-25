
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useVoice } from "@/contexts/VoiceContext";
import { useJourneyData, TouchPoint } from "@/hooks/useJourneyData";
import { CreateStageDialog } from "./dialogs/CreateStageDialog";
import { CreateTouchpointDialog } from "./dialogs/CreateTouchpointDialog";
import { 
  User, 
  Heart, 
  Frown, 
  Meh, 
  Smile, 
  Star,
  Clock,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Globe,
  Plus,
  Edit,
  Trash2
} from "lucide-react";

export const CustomerJourneyCanvas: React.FC = () => {
  const { journeys, personas, updateJourney, deleteStage } = useJourneyData();
  const { speakText } = useVoice();
  const { toast } = useToast();
  const [selectedPersona, setSelectedPersona] = useState<string>(personas[0]?.id || "");
  const [selectedJourney, setSelectedJourney] = useState<string>(journeys[0]?.id || "");

  const currentJourney = journeys.find(j => j.id === selectedJourney);
  const currentPersona = personas.find(p => p.id === selectedPersona);

  const handlePersonaChange = (personaId: string) => {
    setSelectedPersona(personaId);
    const persona = personas.find(p => p.id === personaId);
    toast({
      title: "Persona Changed",
      description: `Switched to ${persona?.name || 'Unknown'} persona view`
    });
    speakText(`Switched to ${persona?.name} persona. This ${persona?.role} persona will help you understand the specific needs and pain points throughout their customer journey.`);
  };

  const handleJourneyChange = (journeyId: string) => {
    setSelectedJourney(journeyId);
    const journey = journeys.find(j => j.id === journeyId);
    toast({
      title: "Journey Changed",
      description: `Now viewing ${journey?.name || 'Unknown'} journey`
    });
    speakText(`Now viewing ${journey?.name} customer journey. This journey contains ${journey?.stages.length || 0} stages and helps visualize the complete customer experience.`);
  };

  const handleDeleteStage = (stageId: string) => {
    if (!currentJourney) return;
    
    const stage = currentJourney.stages.find(s => s.id === stageId);
    if (stage && stage.touchpoints.length > 0) {
      toast({
        title: "Cannot Delete Stage",
        description: "Remove all touchpoints before deleting this stage.",
        variant: "destructive"
      });
      speakText("Cannot delete this stage because it contains touchpoints. Please remove all touchpoints first, then try deleting the stage again.");
      return;
    }
    
    deleteStage(currentJourney.id, stageId);
  };

  const getEmotionIcon = (emotion: TouchPoint["emotion"]) => {
    switch (emotion) {
      case "very-negative": return <Frown className="h-4 w-4 text-red-600" />;
      case "negative": return <Frown className="h-4 w-4 text-orange-500" />;
      case "neutral": return <Meh className="h-4 w-4 text-gray-500" />;
      case "positive": return <Smile className="h-4 w-4 text-green-500" />;
      case "very-positive": return <Star className="h-4 w-4 text-green-600" />;
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel.toLowerCase()) {
      case "website": return <Globe className="h-4 w-4" />;
      case "email": return <Mail className="h-4 w-4" />;
      case "phone": return <Phone className="h-4 w-4" />;
      case "social": return <MessageSquare className="h-4 w-4" />;
      case "sales call": return <Phone className="h-4 w-4" />;
      case "platform": return <Globe className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  if (!currentJourney) {
    return (
      <div className="w-full text-center py-12">
        <Map className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-lg font-medium">No Journey Selected</p>
        <p className="text-muted-foreground">Create a new journey to start mapping customer experiences</p>
      </div>
    );
  }

  return (
    <div 
      className="w-full space-y-6"
      onMouseEnter={() => speakText(`Customer Journey Canvas for ${currentJourney.name}. This interactive canvas allows you to visualize and optimize the complete customer experience across all touchpoints and stages.`)}
    >
      {/* Header */}
      <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-bold">Customer Journey Map</h2>
          <p className="text-muted-foreground text-sm md:text-base">Visualize and optimize the customer experience</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={selectedJourney} onValueChange={handleJourneyChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select journey" />
            </SelectTrigger>
            <SelectContent>
              {journeys.map((journey) => (
                <SelectItem key={journey.id} value={journey.id}>
                  {journey.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedPersona} onValueChange={handlePersonaChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select persona" />
            </SelectTrigger>
            <SelectContent>
              {personas.map((persona) => (
                <SelectItem key={persona.id} value={persona.id}>
                  {persona.name} - {persona.role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <CreateStageDialog 
            journeyId={currentJourney.id}
            trigger={
              <Button size="sm" className="text-xs md:text-sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Stage
              </Button>
            }
          />
        </div>
      </div>

      {/* Journey Info */}
      {currentPersona && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{currentPersona.name}</h3>
                <p className="text-sm text-muted-foreground">{currentPersona.role} • {currentPersona.department}</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    {currentPersona.techSavviness} tech savvy
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {currentPersona.decisionInfluence} influence
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Journey Stages */}
      <div className="relative w-full">
        <div className="flex gap-4 overflow-x-auto pb-4 min-h-[400px]">
          {currentJourney.stages.sort((a, b) => a.order - b.order).map((stage, stageIndex) => (
            <div key={stage.id} className="flex-shrink-0 w-72 md:w-80">
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-base md:text-lg truncate">{stage.name}</CardTitle>
                      <p className="text-xs md:text-sm text-muted-foreground mt-1 line-clamp-2">{stage.description}</p>
                    </div>
                    <div className="flex items-center gap-1 ml-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6"
                        onClick={() => {
                          toast({
                            title: "Edit Stage",
                            description: `Editing ${stage.name} stage`
                          });
                          speakText(`Opening edit dialog for ${stage.name} stage. You can modify the stage name, description, and order in the customer journey sequence.`);
                        }}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6"
                        onClick={() => handleDeleteStage(stage.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {stage.touchpoints.map((touchPoint) => (
                    <div key={touchPoint.id} className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          {getChannelIcon(touchPoint.channel)}
                          <span className="font-medium text-sm truncate">{touchPoint.name}</span>
                        </div>
                        <div className="flex items-center gap-2 ml-2">
                          {getEmotionIcon(touchPoint.emotion)}
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {touchPoint.duration}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-xs text-muted-foreground mb-2">
                        <Badge variant="outline" className="text-xs">{touchPoint.channel}</Badge>
                      </div>

                      {touchPoint.painPoints.length > 0 && (
                        <div className="mb-2">
                          <div className="text-xs font-medium text-red-600 mb-1">Pain Points:</div>
                          <ul className="text-xs text-red-600 space-y-1">
                            {touchPoint.painPoints.map((pain, index) => (
                              <li key={index} className="flex items-start gap-1">
                                <span className="text-red-400">•</span>
                                <span className="line-clamp-2">{pain}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {touchPoint.opportunities.length > 0 && (
                        <div>
                          <div className="text-xs font-medium text-green-600 mb-1">Opportunities:</div>
                          <ul className="text-xs text-green-600 space-y-1">
                            {touchPoint.opportunities.map((opportunity, index) => (
                              <li key={index} className="flex items-start gap-1">
                                <span className="text-green-400">•</span>
                                <span className="line-clamp-2">{opportunity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <CreateTouchpointDialog 
                    journeyId={currentJourney.id}
                    stageId={stage.id}
                    trigger={
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        <Plus className="h-3 w-3 mr-2" />
                        Add Touchpoint
                      </Button>
                    }
                  />
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Emotional Journey Chart */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <Heart className="h-5 w-5" />
            Emotional Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 flex items-end gap-2 md:gap-8 relative overflow-x-auto">
            <div className="flex gap-2 md:gap-8 min-w-max">
              {currentJourney.stages.sort((a, b) => a.order - b.order).map((stage, index) => {
                const avgEmotion = stage.touchpoints.length > 0 
                  ? stage.touchpoints.reduce((acc, tp) => {
                      const emotionValue = {
                        "very-negative": 1,
                        "negative": 2,
                        "neutral": 3,
                        "positive": 4,
                        "very-positive": 5
                      }[tp.emotion];
                      return acc + emotionValue;
                    }, 0) / stage.touchpoints.length
                  : 3;
                
                const height = (avgEmotion / 5) * 100;
                
                return (
                  <div key={stage.id} className="flex-shrink-0 flex flex-col items-center w-16 md:w-20">
                    <div className="w-full bg-muted rounded-t relative" style={{ height: "100px" }}>
                      <div 
                        className="w-full bg-primary rounded-t transition-all duration-300" 
                        style={{ height: `${height}%`, position: "absolute", bottom: 0 }}
                      ></div>
                    </div>
                    <div className="text-xs text-center mt-2 font-medium px-1">{stage.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-4">
            <span>Very Negative</span>
            <span>Very Positive</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
