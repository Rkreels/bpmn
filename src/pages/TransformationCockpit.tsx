
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  BarChart4,
  Calendar,
  ChevronRight,
  Download,
  Filter,
  LineChart,
  Plus,
  Search,
  Settings,
  Share2,
  Target,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CardMetric } from "@/components/ui/card-metric";

export default function TransformationCockpit() {
  return (
    <MainLayout pageTitle="Transformation Cockpit">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Business Transformation</h1>
            <p className="text-muted-foreground">Monitor and manage your transformation initiatives</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              New Initiative
            </Button>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <CardMetric
            title="Transformation Initiatives"
            value="12"
            icon={<Target className="h-5 w-5" />}
            trend={{ value: 20, isUpward: true, isPositive: true }}
          />
          <CardMetric
            title="Processes Impacted"
            value="48"
            icon={<BarChart4 className="h-5 w-5" />}
            trend={{ value: 8, isUpward: true, isPositive: true }}
            variant="primary"
          />
          <CardMetric
            title="Completion Rate"
            value="67%"
            icon={<LineChart className="h-5 w-5" />}
            trend={{ value: 5, isUpward: true, isPositive: true }}
            variant="success"
          />
          <CardMetric
            title="At Risk Initiatives"
            value="3"
            icon={<AlertCircle className="h-5 w-5" />}
            trend={{ value: 2, isUpward: false, isPositive: true }}
            variant="warning"
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="initiatives" className="space-y-4">
          <TabsList>
            <TabsTrigger value="initiatives">Initiatives</TabsTrigger>
            <TabsTrigger value="valueDrivers">Value Drivers</TabsTrigger>
            <TabsTrigger value="kpis">KPIs</TabsTrigger>
            <TabsTrigger value="heatmap">Impact Heatmap</TabsTrigger>
          </TabsList>
          
          <TabsContent value="initiatives" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search initiatives..." className="pl-8" />
              </div>
              <Button className="gap-1">
                <Plus className="h-4 w-4" />
                New Initiative
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {transformationInitiatives.map((initiative, index) => (
                <InitiativeCard key={index} initiative={initiative} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="valueDrivers" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Business Value Drivers</h3>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-1" /> Add Value Driver
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ValueDriverCard 
                title="Cost Efficiency" 
                description="Reduce operational costs across processes"
                impactScore={85}
                initiatives={4}
                processes={12}
              />
              <ValueDriverCard 
                title="Customer Experience" 
                description="Improve end-to-end customer journeys"
                impactScore={78}
                initiatives={3}
                processes={8}
              />
              <ValueDriverCard 
                title="Digital Transformation" 
                description="Implement digital solutions to manual processes"
                impactScore={92}
                initiatives={5}
                processes={18}
              />
              <ValueDriverCard 
                title="Compliance" 
                description="Ensure regulatory compliance across operations"
                impactScore={65}
                initiatives={2}
                processes={9}
              />
              <ValueDriverCard 
                title="Workforce Optimization" 
                description="Enhance employee productivity"
                impactScore={72}
                initiatives={3}
                processes={11}
              />
              <ValueDriverCard 
                title="Innovation" 
                description="Drive new product and service development"
                impactScore={68}
                initiatives={2}
                processes={6}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="kpis" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Performance Indicators</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" /> Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" /> Export
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" /> Add KPI
                </Button>
              </div>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">KPI Name</th>
                      <th className="text-left p-3 font-medium">Category</th>
                      <th className="text-left p-3 font-medium">Target</th>
                      <th className="text-left p-3 font-medium">Current</th>
                      <th className="text-left p-3 font-medium">Status</th>
                      <th className="text-left p-3 font-medium">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    <KpiTableRow 
                      name="Order Processing Time" 
                      category="Operational" 
                      target="< 24 hours" 
                      current="22 hours" 
                      status="On Track" 
                      trend="Improving" 
                    />
                    <KpiTableRow 
                      name="Customer Satisfaction" 
                      category="Customer" 
                      target="> 4.5/5" 
                      current="4.3/5" 
                      status="At Risk" 
                      trend="Stable" 
                    />
                    <KpiTableRow 
                      name="Cost per Transaction" 
                      category="Financial" 
                      target="< $12.50" 
                      current="$13.20" 
                      status="Off Track" 
                      trend="Worsening" 
                    />
                    <KpiTableRow 
                      name="First-Time Resolution Rate" 
                      category="Customer" 
                      target="> 85%" 
                      current="87%" 
                      status="On Track" 
                      trend="Improving" 
                    />
                    <KpiTableRow 
                      name="System Downtime" 
                      category="Technical" 
                      target="< 0.1%" 
                      current="0.08%" 
                      status="On Track" 
                      trend="Stable" 
                    />
                    <KpiTableRow 
                      name="Employee Productivity" 
                      category="Workforce" 
                      target="+15%" 
                      current="+12%" 
                      status="At Risk" 
                      trend="Improving" 
                    />
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="heatmap" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Process Impact Heatmap</h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-sm">
                  <span className="h-3 w-3 inline-block bg-emerald-500 rounded-sm"></span>
                  <span className="mr-2">Low</span>
                  <span className="h-3 w-3 inline-block bg-yellow-500 rounded-sm"></span>
                  <span className="mr-2">Medium</span>
                  <span className="h-3 w-3 inline-block bg-red-500 rounded-sm"></span>
                  <span>High</span>
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-1" /> Configure
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" /> Export
                </Button>
              </div>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <div className="text-center p-20 border border-dashed rounded-md">
                  [Impact Heatmap Visualization]
                  <p className="text-muted-foreground mt-2">
                    The heatmap would display the impact of transformation initiatives on different processes across departments
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

interface TransformationInitiative {
  name: string;
  description: string;
  status: "Planning" | "In Progress" | "Completed" | "On Hold";
  completion: number;
  owner: string;
  startDate: string;
  endDate: string;
  priority: "High" | "Medium" | "Low";
}

const transformationInitiatives: TransformationInitiative[] = [
  {
    name: "Order-to-Cash Optimization",
    description: "Streamline and automate the order-to-cash process to reduce cycle time and improve accuracy",
    status: "In Progress",
    completion: 45,
    owner: "Sarah Miller",
    startDate: "2023-08-15",
    endDate: "2024-02-28",
    priority: "High"
  },
  {
    name: "Customer Onboarding Redesign",
    description: "Redesign the customer onboarding journey to improve experience and reduce dropoffs",
    status: "In Progress",
    completion: 70,
    owner: "Michael Chen",
    startDate: "2023-06-01",
    endDate: "2023-12-31",
    priority: "High"
  },
  {
    name: "Procure-to-Pay Automation",
    description: "Implement automation in procurement and payment processes to reduce manual effort",
    status: "Planning",
    completion: 15,
    owner: "Jennifer Adams",
    startDate: "2023-11-01",
    endDate: "2024-05-30",
    priority: "Medium"
  },
  {
    name: "Compliance Framework Integration",
    description: "Integrate regulatory compliance frameworks into core business processes",
    status: "On Hold",
    completion: 25,
    owner: "Robert Taylor",
    startDate: "2023-09-15",
    endDate: "2024-04-15",
    priority: "Medium"
  },
];

interface InitiativeCardProps {
  initiative: TransformationInitiative;
}

function InitiativeCard({ initiative }: InitiativeCardProps) {
  const statusColors = {
    "Planning": "bg-blue-100 text-blue-800",
    "In Progress": "bg-amber-100 text-amber-800",
    "Completed": "bg-green-100 text-green-800",
    "On Hold": "bg-gray-100 text-gray-800",
  };
  
  const priorityColors = {
    "High": "bg-red-100 text-red-800",
    "Medium": "bg-amber-100 text-amber-800",
    "Low": "bg-blue-100 text-blue-800",
  };
  
  return (
    <Card className="hover:border-primary cursor-pointer">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>{initiative.name}</CardTitle>
          <Badge className={statusColors[initiative.status]}>{initiative.status}</Badge>
        </div>
        <CardDescription className="mt-1">{initiative.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{initiative.completion}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${initiative.completion >= 70 ? 'bg-green-500' : initiative.completion >= 40 ? 'bg-amber-500' : 'bg-blue-500'}`} 
                style={{ width: `${initiative.completion}%` }}
              ></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <div className="text-muted-foreground">Owner</div>
              <div>{initiative.owner}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Priority</div>
              <div>
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${priorityColors[initiative.priority]}`}>
                  {initiative.priority}
                </span>
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">Start Date</div>
              <div className="flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                {new Date(initiative.startDate).toLocaleDateString()}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">End Date</div>
              <div className="flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                {new Date(initiative.endDate).toLocaleDateString()}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button variant="ghost" size="sm" className="gap-1">
              View Details
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ValueDriverCardProps {
  title: string;
  description: string;
  impactScore: number;
  initiatives: number;
  processes: number;
}

function ValueDriverCard({ title, description, impactScore, initiatives, processes }: ValueDriverCardProps) {
  return (
    <Card className="hover:border-primary cursor-pointer">
      <CardContent className="p-4">
        <h4 className="font-medium text-lg">{title}</h4>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Impact Score</span>
            <span className="font-medium">{impactScore}/100</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${impactScore >= 80 ? 'bg-green-500' : impactScore >= 60 ? 'bg-amber-500' : 'bg-red-500'}`} 
              style={{ width: `${impactScore}%` }}
            ></div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Initiatives</div>
            <div className="font-medium">{initiatives}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Processes</div>
            <div className="font-medium">{processes}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface KpiTableRowProps {
  name: string;
  category: string;
  target: string;
  current: string;
  status: "On Track" | "At Risk" | "Off Track";
  trend: "Improving" | "Stable" | "Worsening";
}

function KpiTableRow({ name, category, target, current, status, trend }: KpiTableRowProps) {
  const statusColor = {
    "On Track": "bg-green-100 text-green-800",
    "At Risk": "bg-amber-100 text-amber-800",
    "Off Track": "bg-red-100 text-red-800"
  };
  
  const trendColor = {
    "Improving": "text-green-600",
    "Stable": "text-blue-600",
    "Worsening": "text-red-600"
  };
  
  return (
    <tr className="border-b hover:bg-muted/50">
      <td className="p-3">{name}</td>
      <td className="p-3">{category}</td>
      <td className="p-3">{target}</td>
      <td className="p-3">{current}</td>
      <td className="p-3">
        <span className={`px-2 py-1 text-xs rounded-full ${statusColor[status]}`}>
          {status}
        </span>
      </td>
      <td className={`p-3 ${trendColor[trend]}`}>
        {trend === "Improving" ? "↑" : trend === "Worsening" ? "↓" : "→"} {trend}
      </td>
    </tr>
  );
}
