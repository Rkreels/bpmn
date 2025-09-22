import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Heart, 
  Frown, 
  Meh, 
  Smile, 
  Users, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Star,
  MessageSquare,
  AlertTriangle,
  Target,
  Zap,
  BarChart3
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from 'recharts';
import { useToast } from '@/hooks/use-toast';

interface TouchpointMetrics {
  id: string;
  name: string;
  channel: string;
  sentiment: number; // -1 to 1
  nps: number; // Net Promoter Score
  effortScore: number; // Customer Effort Score (1-5)
  satisfactionScore: number; // CSAT (1-5)
  completionRate: number; // Percentage
  dropoffRate: number; // Percentage
  avgDuration: number; // minutes
  interactions: number;
  painPoints: string[];
  emotionalJourney: Array<{
    stage: string;
    emotion: number; // -1 to 1
    description: string;
  }>;
}

interface PersonaInsight {
  id: string;
  name: string;
  avatar: string;
  segment: string;
  primaryNeeds: string[];
  painPoints: string[];
  preferredChannels: string[];
  journeyOptimization: {
    currentSatisfaction: number;
    potentialSatisfaction: number;
    keyImprovements: string[];
  };
  behaviorPatterns: {
    peakActivityTimes: string[];
    preferredInteractionStyle: string;
    decisionFactors: string[];
  };
}

export const CustomerExperienceAnalytics: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPersona, setSelectedPersona] = useState<string>('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');

  const [touchpointMetrics] = useState<TouchpointMetrics[]>([
    {
      id: 'web-landing',
      name: 'Website Landing',
      channel: 'Digital',
      sentiment: 0.3,
      nps: 42,
      effortScore: 3.2,
      satisfactionScore: 3.8,
      completionRate: 78,
      dropoffRate: 22,
      avgDuration: 2.5,
      interactions: 15420,
      painPoints: ['Slow loading time', 'Confusing navigation', 'Limited mobile optimization'],
      emotionalJourney: [
        { stage: 'Arrival', emotion: 0.1, description: 'Neutral, searching for information' },
        { stage: 'Exploration', emotion: -0.2, description: 'Slightly frustrated with navigation' },
        { stage: 'Decision', emotion: 0.4, description: 'Pleased with product information' }
      ]
    },
    {
      id: 'support-chat',
      name: 'Live Chat Support',
      channel: 'Digital',
      sentiment: 0.6,
      nps: 68,
      effortScore: 2.1,
      satisfactionScore: 4.2,
      completionRate: 92,
      dropoffRate: 8,
      avgDuration: 8.3,
      interactions: 8950,
      painPoints: ['Wait times during peak hours', 'Limited agent availability'],
      emotionalJourney: [
        { stage: 'Initial Contact', emotion: -0.3, description: 'Frustrated with the issue' },
        { stage: 'Agent Interaction', emotion: 0.2, description: 'Hopeful for resolution' },
        { stage: 'Resolution', emotion: 0.7, description: 'Satisfied with help received' }
      ]
    },
    {
      id: 'mobile-app',
      name: 'Mobile Application',
      channel: 'Mobile',
      sentiment: 0.4,
      nps: 55,
      effortScore: 2.8,
      satisfactionScore: 4.0,
      completionRate: 85,
      dropoffRate: 15,
      avgDuration: 5.2,
      interactions: 12680,
      painPoints: ['App crashes occasionally', 'Complex checkout process'],
      emotionalJourney: [
        { stage: 'App Launch', emotion: 0.2, description: 'Positive anticipation' },
        { stage: 'Navigation', emotion: 0.1, description: 'Generally smooth experience' },
        { stage: 'Checkout', emotion: -0.1, description: 'Minor frustration with complexity' }
      ]
    },
    {
      id: 'phone-support',
      name: 'Phone Support',
      channel: 'Voice',
      sentiment: 0.2,
      nps: 35,
      effortScore: 3.8,
      satisfactionScore: 3.5,
      completionRate: 75,
      dropoffRate: 25,
      avgDuration: 12.8,
      interactions: 4250,
      painPoints: ['Long hold times', 'Multiple transfers', 'Inconsistent information'],
      emotionalJourney: [
        { stage: 'Initial Call', emotion: -0.2, description: 'Anxious about wait time' },
        { stage: 'Agent Connection', emotion: 0.0, description: 'Neutral, explaining issue' },
        { stage: 'Resolution Attempt', emotion: -0.1, description: 'Slightly disappointed with outcome' }
      ]
    }
  ]);

  const [personas] = useState<PersonaInsight[]>([
    {
      id: 'tech-savvy-millennial',
      name: 'Tech-Savvy Millennial',
      avatar: '/api/placeholder/48/48',
      segment: 'Digital Natives',
      primaryNeeds: ['Speed', 'Self-service options', 'Mobile optimization', 'Personalization'],
      painPoints: ['Slow response times', 'Complex processes', 'Lack of automation'],
      preferredChannels: ['Mobile App', 'Live Chat', 'Social Media'],
      journeyOptimization: {
        currentSatisfaction: 72,
        potentialSatisfaction: 89,
        keyImprovements: ['Faster mobile app', 'AI-powered recommendations', 'One-click actions']
      },
      behaviorPatterns: {
        peakActivityTimes: ['Morning commute', 'Lunch break', 'Evening'],
        preferredInteractionStyle: 'Self-directed with quick support',
        decisionFactors: ['Speed', 'Reviews', 'Price', 'Features']
      }
    },
    {
      id: 'busy-professional',
      name: 'Busy Professional',
      avatar: '/api/placeholder/48/48',
      segment: 'Time-Conscious',
      primaryNeeds: ['Efficiency', 'Reliability', 'Professional service', 'Quick resolution'],
      painPoints: ['Time-consuming processes', 'Multiple touchpoints', 'Lack of priority service'],
      preferredChannels: ['Phone', 'Email', 'Desktop Web'],
      journeyOptimization: {
        currentSatisfaction: 68,
        potentialSatisfaction: 85,
        keyImprovements: ['Priority support line', 'Streamlined processes', 'Account management']
      },
      behaviorPatterns: {
        peakActivityTimes: ['Early morning', 'Late evening'],
        preferredInteractionStyle: 'Direct and efficient',
        decisionFactors: ['Reliability', 'Time savings', 'Professional service', 'Value']
      }
    },
    {
      id: 'budget-conscious-family',
      name: 'Budget-Conscious Family',
      avatar: '/api/placeholder/48/48',
      segment: 'Value Seekers',
      primaryNeeds: ['Best value', 'Transparency', 'Family-friendly options', 'Long-term benefits'],
      painPoints: ['Hidden fees', 'Complex pricing', 'Limited family features'],
      preferredChannels: ['Website', 'Email', 'In-store'],
      journeyOptimization: {
        currentSatisfaction: 65,
        potentialSatisfaction: 82,
        keyImprovements: ['Clear pricing', 'Family packages', 'Loyalty rewards']
      },
      behaviorPatterns: {
        peakActivityTimes: ['Weekends', 'Evening after work'],
        preferredInteractionStyle: 'Thorough research and comparison',
        decisionFactors: ['Price', 'Value', 'Family benefits', 'Long-term costs']
      }
    }
  ]);

  // Mock data for charts
  const overallSatisfactionTrend = [
    { date: 'Week 1', satisfaction: 72, nps: 42, effort: 3.2 },
    { date: 'Week 2', satisfaction: 74, nps: 45, effort: 3.1 },
    { date: 'Week 3', satisfaction: 71, nps: 41, effort: 3.3 },
    { date: 'Week 4', satisfaction: 76, nps: 48, effort: 2.9 },
    { date: 'Week 5', satisfaction: 78, nps: 52, effort: 2.8 },
    { date: 'Week 6', satisfaction: 75, nps: 49, effort: 3.0 }
  ];

  const emotionalJourneyData = [
    { stage: 'Awareness', emotion: 0.1, persona1: 0.2, persona2: 0.0, persona3: 0.1 },
    { stage: 'Consideration', emotion: 0.0, persona1: 0.1, persona2: -0.1, persona3: -0.2 },
    { stage: 'Purchase', emotion: -0.2, persona1: -0.1, persona2: -0.3, persona3: -0.4 },
    { stage: 'Onboarding', emotion: 0.3, persona1: 0.4, persona2: 0.2, persona3: 0.1 },
    { stage: 'Usage', emotion: 0.4, persona1: 0.5, persona2: 0.3, persona3: 0.2 },
    { stage: 'Support', emotion: 0.2, persona1: 0.6, persona2: 0.0, persona3: -0.1 },
    { stage: 'Renewal', emotion: 0.1, persona1: 0.3, persona2: 0.0, persona3: -0.2 }
  ];

  const channelPerformanceData = touchpointMetrics.map(tp => ({
    name: tp.name,
    satisfaction: tp.satisfactionScore,
    effort: tp.effortScore,
    completion: tp.completionRate,
    nps: tp.nps
  }));

  const sentimentDistribution = [
    { name: 'Very Positive', value: 18, color: '#10b981' },
    { name: 'Positive', value: 32, color: '#3b82f6' },
    { name: 'Neutral', value: 28, color: '#6b7280' },
    { name: 'Negative', value: 15, color: '#f59e0b' },
    { name: 'Very Negative', value: 7, color: '#ef4444' }
  ];

  const getEmotionIcon = (emotion: number) => {
    if (emotion > 0.3) return <Smile className="w-4 h-4 text-green-500" />;
    if (emotion > 0) return <Meh className="w-4 h-4 text-yellow-500" />;
    return <Frown className="w-4 h-4 text-red-500" />;
  };

  const getEmotionColor = (emotion: number) => {
    if (emotion > 0.3) return 'text-green-600';
    if (emotion > 0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSentimentBadge = (sentiment: number) => {
    if (sentiment > 0.3) return <Badge className="bg-green-100 text-green-800">Positive</Badge>;
    if (sentiment > 0) return <Badge className="bg-yellow-100 text-yellow-800">Neutral</Badge>;
    return <Badge className="bg-red-100 text-red-800">Negative</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Customer Experience Analytics</h2>
          <p className="text-muted-foreground">Voice of customer insights and emotional journey mapping</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <BarChart3 className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="touchpoints">Touchpoints</TabsTrigger>
          <TabsTrigger value="emotions">Emotional Journey</TabsTrigger>
          <TabsTrigger value="personas">Persona Insights</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Star className="w-8 h-8 text-yellow-500 mr-3" />
                  <div>
                    <p className="text-sm text-muted-foreground">Avg CSAT</p>
                    <p className="text-2xl font-bold">3.9/5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="w-8 h-8 text-blue-500 mr-3" />
                  <div>
                    <p className="text-sm text-muted-foreground">Net Promoter Score</p>
                    <p className="text-2xl font-bold">49</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Zap className="w-8 h-8 text-green-500 mr-3" />
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Effort Score</p>
                    <p className="text-2xl font-bold">2.9/5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Heart className="w-8 h-8 text-red-500 mr-3" />
                  <div>
                    <p className="text-sm text-muted-foreground">Emotional Score</p>
                    <p className="text-2xl font-bold">+0.3</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Satisfaction Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={overallSatisfactionTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="satisfaction" stroke="#3b82f6" name="CSAT Score" />
                    <Line type="monotone" dataKey="nps" stroke="#10b981" name="NPS" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sentiment Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={sentimentDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {sentimentDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Channel Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={channelPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="satisfaction" fill="#3b82f6" name="CSAT Score" />
                  <Bar dataKey="completion" fill="#10b981" name="Completion Rate %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="touchpoints" className="space-y-6">
          <div className="space-y-4">
            {touchpointMetrics.map((touchpoint) => (
              <Card key={touchpoint.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-semibold text-lg">{touchpoint.name}</h3>
                        <Badge variant="outline">{touchpoint.channel}</Badge>
                        {getSentimentBadge(touchpoint.sentiment)}
                      </div>

                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">CSAT Score</p>
                          <p className="text-xl font-bold">{touchpoint.satisfactionScore}/5</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">NPS</p>
                          <p className="text-xl font-bold">{touchpoint.nps}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Effort Score</p>
                          <p className="text-xl font-bold">{touchpoint.effortScore}/5</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Completion Rate</p>
                          <p className="text-xl font-bold">{touchpoint.completionRate}%</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Avg Duration</p>
                          <p className="font-semibold">{touchpoint.avgDuration} min</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Interactions</p>
                          <p className="font-semibold">{touchpoint.interactions.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Drop-off Rate</p>
                          <p className="font-semibold text-red-600">{touchpoint.dropoffRate}%</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-2">Emotional Journey</p>
                        <div className="flex items-center space-x-4">
                          {touchpoint.emotionalJourney.map((stage, index) => (
                            <div key={index} className="flex items-center space-x-1">
                              {getEmotionIcon(stage.emotion)}
                              <span className="text-sm">{stage.stage}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {touchpoint.painPoints.length > 0 && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Key Pain Points</p>
                          <div className="flex flex-wrap gap-1">
                            {touchpoint.painPoints.map((pain, index) => (
                              <Badge key={index} variant="destructive" className="text-xs">
                                {pain}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Feedback
                      </Button>
                      <Button size="sm">
                        <Target className="w-4 h-4 mr-1" />
                        Optimize
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="emotions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Emotional Journey Mapping</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={emotionalJourneyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="stage" />
                  <YAxis domain={[-1, 1]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="persona1" stroke="#3b82f6" name="Tech-Savvy Millennial" strokeWidth={2} />
                  <Line type="monotone" dataKey="persona2" stroke="#ef4444" name="Busy Professional" strokeWidth={2} />
                  <Line type="monotone" dataKey="persona3" stroke="#10b981" name="Budget-Conscious Family" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-3 gap-4">
            {personas.map((persona) => (
              <Card key={persona.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={persona.avatar} />
                      <AvatarFallback>{persona.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {persona.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Satisfaction</p>
                      <div className="flex items-center gap-2">
                        <Progress value={persona.journeyOptimization.currentSatisfaction} className="h-2" />
                        <span className="text-sm font-semibold">{persona.journeyOptimization.currentSatisfaction}%</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Key Pain Points</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {persona.painPoints.slice(0, 2).map((pain, index) => (
                          <Badge key={index} variant="destructive" className="text-xs">
                            {pain}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Preferred Channels</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {persona.preferredChannels.slice(0, 2).map((channel, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {channel}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="personas" className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <Select value={selectedPersona} onValueChange={setSelectedPersona}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select persona for detailed analysis" />
              </SelectTrigger>
              <SelectContent>
                {personas.map((persona) => (
                  <SelectItem key={persona.id} value={persona.id}>
                    {persona.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedPersona ? (
            (() => {
              const persona = personas.find(p => p.id === selectedPersona);
              return persona ? (
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={persona.avatar} />
                          <AvatarFallback>{persona.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold">{persona.name}</h3>
                          <p className="text-muted-foreground">{persona.segment}</p>
                          
                          <div className="grid grid-cols-2 gap-6 mt-4">
                            <div>
                              <h4 className="font-semibold mb-2">Primary Needs</h4>
                              <div className="space-y-1">
                                {persona.primaryNeeds.map((need, index) => (
                                  <Badge key={index} variant="outline" className="mr-1 mb-1">
                                    {need}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold mb-2">Pain Points</h4>
                              <div className="space-y-1">
                                {persona.painPoints.map((pain, index) => (
                                  <Badge key={index} variant="destructive" className="mr-1 mb-1">
                                    {pain}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Journey Optimization Potential</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Current Satisfaction</span>
                            <span className="font-semibold">{persona.journeyOptimization.currentSatisfaction}%</span>
                          </div>
                          <Progress value={persona.journeyOptimization.currentSatisfaction} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Potential Satisfaction</span>
                            <span className="font-semibold text-green-600">{persona.journeyOptimization.potentialSatisfaction}%</span>
                          </div>
                          <Progress value={persona.journeyOptimization.potentialSatisfaction} className="h-2" />
                        </div>

                        <div className="p-3 bg-green-50 rounded-lg">
                          <p className="text-sm font-semibold text-green-800 mb-1">
                            Improvement Potential: +{persona.journeyOptimization.potentialSatisfaction - persona.journeyOptimization.currentSatisfaction}%
                          </p>
                          <p className="text-xs text-green-600">
                            Key improvements could significantly enhance satisfaction
                          </p>
                        </div>

                        <div>
                          <h5 className="font-semibold mb-2">Key Improvement Areas</h5>
                          <div className="space-y-1">
                            {persona.journeyOptimization.keyImprovements.map((improvement, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <Target className="w-3 h-3 text-blue-500" />
                                <span className="text-sm">{improvement}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Behavior Patterns</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h5 className="font-semibold mb-2">Peak Activity Times</h5>
                          <div className="flex flex-wrap gap-1">
                            {persona.behaviorPatterns.peakActivityTimes.map((time, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                <Clock className="w-3 h-3 mr-1" />
                                {time}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="font-semibold mb-2">Interaction Style</h5>
                          <p className="text-sm text-muted-foreground">{persona.behaviorPatterns.preferredInteractionStyle}</p>
                        </div>

                        <div>
                          <h5 className="font-semibold mb-2">Decision Factors</h5>
                          <div className="space-y-1">
                            {persona.behaviorPatterns.decisionFactors.map((factor, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${
                                  index === 0 ? 'bg-green-500' : 
                                  index === 1 ? 'bg-blue-500' : 
                                  index === 2 ? 'bg-yellow-500' : 'bg-gray-400'
                                }`} />
                                <span className="text-sm">{factor}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="font-semibold mb-2">Preferred Channels</h5>
                          <div className="flex flex-wrap gap-1">
                            {persona.preferredChannels.map((channel, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {channel}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : null;
            })()
          ) : (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Select a persona to view detailed insights</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Critical Experience Issues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-semibold text-red-800">Phone Support Wait Times</h4>
                    <p className="text-sm text-muted-foreground">
                      Average hold time of 12.8 minutes is causing significant customer frustration and 25% drop-off rate.
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="destructive">High Impact</Badge>
                      <Badge variant="outline">Immediate Action Required</Badge>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold text-orange-800">Mobile App Performance</h4>
                    <p className="text-sm text-muted-foreground">
                      App crashes and complex checkout process are affecting 15% of mobile users.
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Badge className="bg-orange-500 text-white">Medium Impact</Badge>
                      <Badge variant="outline">2-Week Timeline</Badge>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h4 className="font-semibold text-yellow-800">Website Navigation</h4>
                    <p className="text-sm text-muted-foreground">
                      Confusing navigation is impacting user experience, particularly for budget-conscious families.
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Badge className="bg-yellow-500 text-white">Medium Impact</Badge>
                      <Badge variant="outline">UX Redesign Needed</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-500" />
                  Optimization Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-green-800">Expand Live Chat Hours</h4>
                    <p className="text-sm text-muted-foreground">
                      Live chat has the highest satisfaction (4.2/5) and lowest effort score (2.1/5). Consider 24/7 availability.
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Badge className="bg-green-500 text-white">High ROI</Badge>
                      <Badge variant="outline">+$45k Annual Revenue</Badge>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-blue-800">Personalization for Millennials</h4>
                    <p className="text-sm text-muted-foreground">
                      Tech-savvy millennials show +17% satisfaction potential with AI-powered recommendations.
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Badge className="bg-blue-500 text-white">High Impact</Badge>
                      <Badge variant="outline">AI Integration</Badge>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-purple-800">Family-Focused Features</h4>
                    <p className="text-sm text-muted-foreground">
                      Clear pricing and family packages could improve budget-conscious family satisfaction by +17%.
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Badge className="bg-purple-500 text-white">Segment Growth</Badge>
                      <Badge variant="outline">Product Development</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Wins</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>• Extend chat hours to 18:00</p>
                    <p>• Add mobile app stability fixes</p>
                    <p>• Implement callback option for phone support</p>
                    <p>• Improve website search functionality</p>
                  </div>
                  <div className="mt-4">
                    <Badge className="bg-green-100 text-green-800">2-4 weeks</Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Medium-term Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>• Redesign mobile checkout flow</p>
                    <p>• Implement AI chat assistance</p>
                    <p>• Create family pricing packages</p>
                    <p>• Add priority support tier</p>
                  </div>
                  <div className="mt-4">
                    <Badge className="bg-blue-100 text-blue-800">2-3 months</Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Long-term Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>• Predictive customer support</p>
                    <p>• Omnichannel experience</p>
                    <p>• Advanced personalization</p>
                    <p>• Proactive issue resolution</p>
                  </div>
                  <div className="mt-4">
                    <Badge className="bg-purple-100 text-purple-800">6-12 months</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};