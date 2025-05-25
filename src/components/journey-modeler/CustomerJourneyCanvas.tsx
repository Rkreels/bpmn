import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
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

interface TouchPoint {
  id: string;
  name: string;
  channel: string;
  emotion: "very-negative" | "negative" | "neutral" | "positive" | "very-positive";
  duration: string;
  painPoints: string[];
  opportunities: string[];
}

interface JourneyStage {
  id: string;
  name: string;
  description: string;
  touchPoints: TouchPoint[];
}

export const CustomerJourneyCanvas: React.FC = () => {
  const [selectedPersona, setSelectedPersona] = useState("business-user");
  const { toast } = useToast();

  const journeyStages: JourneyStage[] = [
    {
      id: "awareness",
      name: "Awareness",
      description: "Customer becomes aware of the need",
      touchPoints: [
        {
          id: "search",
          name: "Online Search",
          channel: "Website",
          emotion: "neutral",
          duration: "5 min",
          painPoints: ["Too many options", "Unclear information"],
          opportunities: ["Better SEO", "Clear value proposition"]
        },
        {
          id: "social",
          name: "Social Media",
          channel: "Social",
          emotion: "positive",
          duration: "2 min",
          painPoints: [],
          opportunities: ["Engaging content", "Community building"]
        }
      ]
    },
    {
      id: "consideration",
      name: "Consideration",
      description: "Customer evaluates options",
      touchPoints: [
        {
          id: "demo",
          name: "Product Demo",
          channel: "Sales Call",
          emotion: "very-positive",
          duration: "30 min",
          painPoints: [],
          opportunities: ["Personalized demos", "Follow-up materials"]
        },
        {
          id: "pricing",
          name: "Pricing Review",
          channel: "Website",
          emotion: "negative",
          duration: "10 min",
          painPoints: ["Complex pricing", "Hidden costs"],
          opportunities: ["Transparent pricing", "Calculator tool"]
        }
      ]
    },
    {
      id: "purchase",
      name: "Purchase",
      description: "Customer makes the decision",
      touchPoints: [
        {
          id: "checkout",
          name: "Checkout Process",
          channel: "Website",
          emotion: "neutral",
          duration: "15 min",
          painPoints: ["Too many steps", "Security concerns"],
          opportunities: ["Streamlined flow", "Trust signals"]
        }
      ]
    },
    {
      id: "onboarding",
      name: "Onboarding",
      description: "Customer gets started",
      touchPoints: [
        {
          id: "welcome",
          name: "Welcome Email",
          channel: "Email",
          emotion: "positive",
          duration: "2 min",
          painPoints: [],
          opportunities: ["Personalization", "Quick wins"]
        },
        {
          id: "setup",
          name: "Account Setup",
          channel: "Platform",
          emotion: "negative",
          duration: "45 min",
          painPoints: ["Complex setup", "Lack of guidance"],
          opportunities: ["Guided setup", "Progress indicators"]
        }
      ]
    },
    {
      id: "usage",
      name: "Usage",
      description: "Customer uses the product",
      touchPoints: [
        {
          id: "daily-use",
          name: "Daily Usage",
          channel: "Platform",
          emotion: "positive",
          duration: "60 min",
          painPoints: ["Performance issues", "Feature discovery"],
          opportunities: ["Performance optimization", "In-app guidance"]
        }
      ]
    },
    {
      id: "advocacy",
      name: "Advocacy",
      description: "Customer becomes an advocate",
      touchPoints: [
        {
          id: "referral",
          name: "Referral Program",
          channel: "Email",
          emotion: "very-positive",
          duration: "5 min",
          painPoints: [],
          opportunities: ["Incentive optimization", "Easy sharing"]
        }
      ]
    }
  ];

  const handlePersonaChange = (persona: string) => {
    setSelectedPersona(persona);
    toast({
      title: "Persona Changed",
      description: `Switched to ${persona.replace('-', ' ')} persona view`
    });
  };

  const handleManagePersonas = () => {
    toast({
      title: "Manage Personas",
      description: "Opening persona management interface..."
    });
  };

  const handleAddStage = () => {
    toast({
      title: "Add Stage",
      description: "Creating new journey stage..."
    });
  };

  const handleAddTouchpoint = (stageId: string) => {
    toast({
      title: "Add Touchpoint",
      description: `Adding new touchpoint to ${stageId} stage`
    });
  };

  const handleEditStage = (stageId: string) => {
    toast({
      title: "Edit Stage",
      description: `Editing ${stageId} stage`
    });
  };

  const handleDeleteStage = (stageId: string) => {
    toast({
      title: "Delete Stage",
      description: `Deleting ${stageId} stage`
    });
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

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-bold">Customer Journey Map</h2>
          <p className="text-muted-foreground text-sm md:text-base">Visualize and optimize the customer experience</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select 
            value={selectedPersona} 
            onChange={(e) => handlePersonaChange(e.target.value)}
            className="px-3 py-2 border rounded-md text-xs md:text-sm"
          >
            <option value="business-user">Business User</option>
            <option value="technical-user">Technical User</option>
            <option value="decision-maker">Decision Maker</option>
          </select>
          <Button 
            variant="outline" 
            onClick={handleManagePersonas}
            size="sm"
            className="text-xs md:text-sm"
          >
            <User className="h-4 w-4 mr-2" />
            Manage Personas
          </Button>
          <Button 
            onClick={handleAddStage}
            size="sm"
            className="text-xs md:text-sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Stage
          </Button>
        </div>
      </div>

      {/* Journey Stages */}
      <div className="relative w-full">
        <div className="flex gap-4 overflow-x-auto pb-4 min-h-[400px]">
          {journeyStages.map((stage, stageIndex) => (
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
                        onClick={() => handleEditStage(stage.id)}
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
                  {stage.touchPoints.map((touchPoint) => (
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
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs"
                    onClick={() => handleAddTouchpoint(stage.id)}
                  >
                    <Plus className="h-3 w-3 mr-2" />
                    Add Touchpoint
                  </Button>
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
              {journeyStages.map((stage, index) => {
                const avgEmotion = stage.touchPoints.reduce((acc, tp) => {
                  const emotionValue = {
                    "very-negative": 1,
                    "negative": 2,
                    "neutral": 3,
                    "positive": 4,
                    "very-positive": 5
                  }[tp.emotion];
                  return acc + emotionValue;
                }, 0) / stage.touchPoints.length;
                
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
