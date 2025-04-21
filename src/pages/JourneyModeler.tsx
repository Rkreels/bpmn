
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowRightIcon, 
  ChevronDown, 
  Download, 
  FileIcon, 
  ImageIcon, 
  Layers, 
  LayoutGrid, 
  Plus, 
  Save, 
  Share2, 
  Smile, 
  Users
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export default function JourneyModeler() {
  return (
    <MainLayout pageTitle="Journey Modeler">
      <Tabs defaultValue="canvas" className="w-full">
        <div className="flex items-center justify-between mb-6">
          <TabsList>
            <TabsTrigger value="canvas">Canvas</TabsTrigger>
            <TabsTrigger value="personas">Personas</TabsTrigger>
            <TabsTrigger value="touchpoints">Touchpoints</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Save className="h-4 w-4" />
              Save
            </Button>
            
            <Button variant="outline" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            
            <Button className="gap-1">
              <Plus className="h-4 w-4" />
              New Journey
            </Button>
          </div>
        </div>

        <TabsContent value="canvas" className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Customer Onboarding Journey</CardTitle>
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>New Customer</span>
                </div>
                <span>•</span>
                <div>Last edited: Yesterday</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 p-3 rounded-md mb-4 overflow-x-auto whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-sm">Tools:</span>
                  <Button variant="ghost" size="sm">Select</Button>
                  <Button variant="ghost" size="sm">Text</Button>
                  <Button variant="ghost" size="sm">Stage</Button>
                  <Button variant="ghost" size="sm">Touchpoint</Button>
                  <Button variant="ghost" size="sm">Emotion</Button>
                  <Button variant="ghost" size="sm">Connection</Button>
                  <Button variant="ghost" size="sm">Note</Button>
                </div>
              </div>
              
              {/* Journey Canvas */}
              <div className="relative min-h-[600px] bg-white border rounded-md p-4">
                {/* Stages */}
                <div className="flex flex-col gap-8">
                  {/* Stage Headers */}
                  <div className="flex gap-1">
                    {['Research', 'Comparison', 'Application', 'Verification', 'Setup', 'Onboarded'].map((stage, idx) => (
                      <div key={idx} className="flex-1 bg-muted/50 p-3 text-center rounded-md font-medium">
                        {stage}
                      </div>
                    ))}
                  </div>
                  
                  {/* Customer Actions */}
                  <div className="flex">
                    <div className="w-32 shrink-0 pr-4 flex items-start">
                      <div className="bg-enterprise-blue-100 text-enterprise-blue-800 px-3 py-1.5 rounded-md font-medium">
                        Customer Actions
                      </div>
                    </div>
                    <div className="flex-1 grid grid-cols-6 gap-1 h-40 bg-muted/10 border rounded-md relative">
                      {/* Sample touchpoints */}
                      <div className="absolute left-[10%] top-4 w-32 bg-white border shadow-sm rounded-md p-2 text-sm text-center">
                        Search online
                      </div>
                      <div className="absolute left-[25%] top-12 w-32 bg-white border shadow-sm rounded-md p-2 text-sm text-center">
                        Compare options
                      </div>
                      <div className="absolute left-[40%] top-6 w-32 bg-white border shadow-sm rounded-md p-2 text-sm text-center">
                        Fill application
                      </div>
                      <div className="absolute left-[55%] top-10 w-32 bg-white border shadow-sm rounded-md p-2 text-sm text-center">
                        Submit documents
                      </div>
                      <div className="absolute left-[70%] top-4 w-32 bg-white border shadow-sm rounded-md p-2 text-sm text-center">
                        Complete setup
                      </div>
                      <div className="absolute left-[85%] top-8 w-32 bg-white border shadow-sm rounded-md p-2 text-sm text-center">
                        First login
                      </div>
                      
                      {/* Arrows */}
                      <ArrowRightIcon className="absolute left-[22%] top-9 text-muted-foreground" />
                      <ArrowRightIcon className="absolute left-[37%] top-9 text-muted-foreground" />
                      <ArrowRightIcon className="absolute left-[52%] top-9 text-muted-foreground" />
                      <ArrowRightIcon className="absolute left-[67%] top-9 text-muted-foreground" />
                      <ArrowRightIcon className="absolute left-[82%] top-9 text-muted-foreground" />
                    </div>
                  </div>
                  
                  {/* Touchpoints */}
                  <div className="flex">
                    <div className="w-32 shrink-0 pr-4 flex items-start">
                      <div className="bg-enterprise-gray-100 text-enterprise-gray-800 px-3 py-1.5 rounded-md font-medium">
                        Touchpoints
                      </div>
                    </div>
                    <div className="flex-1 grid grid-cols-6 gap-1 h-28 bg-muted/10 border rounded-md relative">
                      {/* Sample touchpoints */}
                      <div className="absolute left-[10%] top-4 w-32 bg-white border shadow-sm rounded-md p-2 text-xs text-center">
                        Website
                      </div>
                      <div className="absolute left-[25%] top-4 w-32 bg-white border shadow-sm rounded-md p-2 text-xs text-center">
                        Comparison page
                      </div>
                      <div className="absolute left-[40%] top-4 w-32 bg-white border shadow-sm rounded-md p-2 text-xs text-center">
                        Application form
                      </div>
                      <div className="absolute left-[55%] top-4 w-32 bg-white border shadow-sm rounded-md p-2 text-xs text-center">
                        Email / Portal
                      </div>
                      <div className="absolute left-[70%] top-4 w-32 bg-white border shadow-sm rounded-md p-2 text-xs text-center">
                        Setup wizard
                      </div>
                      <div className="absolute left-[85%] top-4 w-32 bg-white border shadow-sm rounded-md p-2 text-xs text-center">
                        Dashboard
                      </div>
                    </div>
                  </div>
                  
                  {/* Emotions */}
                  <div className="flex">
                    <div className="w-32 shrink-0 pr-4 flex items-start">
                      <div className="bg-status-info/20 text-status-info px-3 py-1.5 rounded-md font-medium">
                        Emotions
                      </div>
                    </div>
                    <div className="flex-1 grid grid-cols-6 gap-1 h-20 bg-muted/10 border rounded-md">
                      <div className="flex flex-col items-center justify-center">
                        <Smile className="h-8 w-8 text-status-success" />
                        <span className="text-xs mt-1">Curious</span>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <Smile className="h-8 w-8 text-status-warning" />
                        <span className="text-xs mt-1">Overwhelmed</span>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <Smile className="h-8 w-8 text-status-danger" />
                        <span className="text-xs mt-1">Frustrated</span>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <Smile className="h-8 w-8 text-status-warning" />
                        <span className="text-xs mt-1">Anxious</span>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <Smile className="h-8 w-8 text-status-info" />
                        <span className="text-xs mt-1">Hopeful</span>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <Smile className="h-8 w-8 text-status-success" />
                        <span className="text-xs mt-1">Satisfied</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Metrics & KPIs */}
                  <div className="flex">
                    <div className="w-32 shrink-0 pr-4 flex items-start">
                      <div className="bg-primary/10 text-primary px-3 py-1.5 rounded-md font-medium">
                        Metrics
                      </div>
                    </div>
                    <div className="flex-1 grid grid-cols-6 gap-1">
                      <div className="bg-muted/10 p-2 border rounded-md">
                        <div className="text-xs font-medium text-center mb-1">Click Rate</div>
                        <div className="text-lg font-semibold text-center">42%</div>
                      </div>
                      <div className="bg-muted/10 p-2 border rounded-md">
                        <div className="text-xs font-medium text-center mb-1">Bounce Rate</div>
                        <div className="text-lg font-semibold text-center">25%</div>
                      </div>
                      <div className="bg-muted/10 p-2 border rounded-md">
                        <div className="text-xs font-medium text-center mb-1">Completion</div>
                        <div className="text-lg font-semibold text-center">68%</div>
                      </div>
                      <div className="bg-muted/10 p-2 border rounded-md">
                        <div className="text-xs font-medium text-center mb-1">Approval</div>
                        <div className="text-lg font-semibold text-center">82%</div>
                      </div>
                      <div className="bg-muted/10 p-2 border rounded-md">
                        <div className="text-xs font-medium text-center mb-1">Setup Time</div>
                        <div className="text-lg font-semibold text-center">12m</div>
                      </div>
                      <div className="bg-muted/10 p-2 border rounded-md">
                        <div className="text-xs font-medium text-center mb-1">CSAT</div>
                        <div className="text-lg font-semibold text-center">4.2</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Opportunities */}
                  <div className="flex">
                    <div className="w-32 shrink-0 pr-4 flex items-start">
                      <div className="bg-status-success/10 text-status-success px-3 py-1.5 rounded-md font-medium">
                        Opportunities
                      </div>
                    </div>
                    <div className="flex-1 bg-muted/10 border rounded-md p-3 text-sm">
                      <ul className="list-disc list-inside space-y-2">
                        <li>Simplify application form by reducing fields by 30%</li>
                        <li>Add progress indicator to show remaining steps</li>
                        <li>Integrate document scanning to avoid manual uploads</li>
                        <li>Add post-setup tutorial videos for common tasks</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="personas" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Customer Personas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border rounded-md p-4">
                  <div className="rounded-full bg-muted h-16 w-16 mx-auto mb-3 flex items-center justify-center">
                    <Users className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium text-center mb-2">Small Business Owner</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Age:</span> 35-50
                    </div>
                    <div>
                      <span className="font-medium">Goals:</span> Quick setup, cost efficiency, easy to use
                    </div>
                    <div>
                      <span className="font-medium">Challenges:</span> Limited time, technical knowledge
                    </div>
                    <div>
                      <span className="font-medium">Touchpoints:</span> Mobile app, website, email
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="rounded-full bg-muted h-16 w-16 mx-auto mb-3 flex items-center justify-center">
                    <Users className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium text-center mb-2">Corporate Financial Manager</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Age:</span> 30-45
                    </div>
                    <div>
                      <span className="font-medium">Goals:</span> Compliance, security, detailed reporting
                    </div>
                    <div>
                      <span className="font-medium">Challenges:</span> Integration complexity, regulatory requirements
                    </div>
                    <div>
                      <span className="font-medium">Touchpoints:</span> Desktop portal, account manager, phone
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="rounded-full bg-muted h-16 w-16 mx-auto mb-3 flex items-center justify-center">
                    <Users className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium text-center mb-2">Tech Startup Founder</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Age:</span> 25-40
                    </div>
                    <div>
                      <span className="font-medium">Goals:</span> Scalability, API access, automation
                    </div>
                    <div>
                      <span className="font-medium">Challenges:</span> Fast growth projections, changing needs
                    </div>
                    <div>
                      <span className="font-medium">Touchpoints:</span> API docs, chat support, community forums
                    </div>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="mt-6 gap-2">
                <Plus className="h-4 w-4" />
                Add New Persona
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="touchpoints" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Touchpoint Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Digital Touchpoints</h3>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Plus className="h-4 w-4" />
                    Add
                  </Button>
                </div>
                
                <div className="border rounded-md divide-y">
                  <TouchpointRow
                    name="Company Website"
                    type="Website"
                    owner="Marketing"
                    channels={["Desktop", "Mobile"]}
                    impactLevel="High"
                  />
                  <TouchpointRow
                    name="Customer Portal"
                    type="Web Application"
                    owner="IT"
                    channels={["Desktop", "Mobile", "Tablet"]}
                    impactLevel="Critical"
                  />
                  <TouchpointRow
                    name="Mobile App"
                    type="Native App"
                    owner="Product"
                    channels={["Mobile", "Tablet"]}
                    impactLevel="Medium"
                  />
                  <TouchpointRow
                    name="Email Notifications"
                    type="Email"
                    owner="Marketing"
                    channels={["Email"]}
                    impactLevel="Medium"
                  />
                  <TouchpointRow
                    name="Social Media"
                    type="Social"
                    owner="Marketing"
                    channels={["Multiple"]}
                    impactLevel="Low"
                  />
                </div>
                
                <div className="flex items-center justify-between mt-8">
                  <h3 className="text-lg font-medium">Physical Touchpoints</h3>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Plus className="h-4 w-4" />
                    Add
                  </Button>
                </div>
                
                <div className="border rounded-md divide-y">
                  <TouchpointRow
                    name="Branch Office"
                    type="Location"
                    owner="Operations"
                    channels={["In-Person"]}
                    impactLevel="High"
                  />
                  <TouchpointRow
                    name="Welcome Package"
                    type="Direct Mail"
                    owner="Customer Success"
                    channels={["Mail"]}
                    impactLevel="Medium"
                  />
                  <TouchpointRow
                    name="Relationship Manager"
                    type="Person"
                    owner="Sales"
                    channels={["In-Person", "Phone", "Email"]}
                    impactLevel="High"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}

interface TouchpointRowProps {
  name: string;
  type: string;
  owner: string;
  channels: string[];
  impactLevel: "Critical" | "High" | "Medium" | "Low";
}

function TouchpointRow({ name, type, owner, channels, impactLevel }: TouchpointRowProps) {
  const getImpactColor = (level: string) => {
    switch (level) {
      case "Critical": return "text-status-danger";
      case "High": return "text-status-warning";
      case "Medium": return "text-enterprise-blue-600";
      case "Low": return "text-muted-foreground";
      default: return "";
    }
  };
  
  return (
    <div className="flex items-center justify-between p-3 hover:bg-muted/50">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          {type === "Website" || type === "Web Application" ? (
            <LayoutGrid className="h-4 w-4" />
          ) : type === "Email" ? (
            <FileIcon className="h-4 w-4" />
          ) : type === "Social" || type === "Person" ? (
            <Users className="h-4 w-4" />
          ) : type === "Location" ? (
            <Layers className="h-4 w-4" />
          ) : (
            <ImageIcon className="h-4 w-4" />
          )}
        </div>
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-sm text-muted-foreground">{type}</div>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <div className="text-sm">
          <div className="font-medium">Owner</div>
          <div className="text-muted-foreground">{owner}</div>
        </div>
        <div className="text-sm">
          <div className="font-medium">Channels</div>
          <div className="text-muted-foreground">{channels.join(", ")}</div>
        </div>
        <div className="text-sm">
          <div className="font-medium">Impact</div>
          <div className={getImpactColor(impactLevel)}>{impactLevel}</div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
