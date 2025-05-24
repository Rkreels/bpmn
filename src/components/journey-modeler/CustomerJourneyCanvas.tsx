
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Customer Journey Map</h2>
          <p className="text-muted-foreground">Visualize and optimize the customer experience</p>
        </div>
        <div className="flex items-center gap-2">
          <select 
            value={selectedPersona} 
            onChange={(e) => setSelectedPersona(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="business-user">Business User</option>
            <option value="technical-user">Technical User</option>
            <option value="decision-maker">Decision Maker</option>
          </select>
          <Button variant="outline">
            <User className="h-4 w-4 mr-2" />
            Manage Personas
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Stage
          </Button>
        </div>
      </div>

      {/* Journey Stages */}
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {journeyStages.map((stage, stageIndex) => (
            <div key={stage.id} className="flex-shrink-0 w-80">
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{stage.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{stage.description}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {stage.touchPoints.map((touchPoint) => (
                    <div key={touchPoint.id} className="p-3 border rounded-lg hover:bg-muted/50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getChannelIcon(touchPoint.channel)}
                          <span className="font-medium text-sm">{touchPoint.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
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
                                {pain}
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
                                {opportunity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus className="h-3 w-3 mr-2" />
                    Add Touchpoint
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Journey Flow Arrows */}
        <div className="absolute top-24 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
          {journeyStages.slice(0, -1).map((_, index) => (
            <div key={index} className="flex-1 flex justify-end pr-4">
              <div className="w-8 h-0.5 bg-primary"></div>
              <div className="w-0 h-0 border-l-4 border-l-primary border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Emotion Line Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Emotional Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 flex items-end gap-8 relative">
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
                <div key={stage.id} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-muted rounded-t" style={{ height: `${height}%` }}>
                    <div className="w-full bg-primary rounded-t" style={{ height: "100%" }}></div>
                  </div>
                  <div className="text-xs text-center mt-2 font-medium">{stage.name}</div>
                </div>
              );
            })}
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
