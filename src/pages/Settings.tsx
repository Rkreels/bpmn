
import React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Volume2, Volume1, VolumeX, Bell, Globe, Shield, Database, Share2 } from "lucide-react";
import { useVoice } from "@/contexts/VoiceContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export default function Settings() {
  const { isVoiceEnabled, toggleVoice, speakText } = useVoice();
  const [activeTab, setActiveTab] = React.useState("general");

  const handleTestVoice = () => {
    speakText("Voice navigation is now active. You will receive guidance as you navigate through the application.");
    toast({
      title: "Voice Test",
      description: "Testing voice synthesis. If you don't hear anything, check your browser permissions.",
    });
  };

  return (
    <MainLayout pageTitle="Settings">
      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="localization">Localization</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card id="settings-voice-section">
              <CardHeader>
                <CardTitle>Voice Navigation</CardTitle>
                <CardDescription>
                  Control the voice guidance system that provides contextual information as you navigate through the application.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {isVoiceEnabled ? (
                      <Volume2 className="h-5 w-5 text-primary" />
                    ) : (
                      <VolumeX className="h-5 w-5 text-muted-foreground" />
                    )}
                    <div>
                      <p className="font-medium">Voice Navigation</p>
                      <p className="text-sm text-muted-foreground">
                        Receive spoken guidance when navigating between modules
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={isVoiceEnabled}
                    onCheckedChange={toggleVoice}
                    id="voice-toggle"
                  />
                </div>
                
                <div className="pt-2">
                  <Button
                    variant="outline"
                    onClick={handleTestVoice}
                    disabled={!isVoiceEnabled}
                    className="flex items-center gap-2"
                  >
                    <Volume1 className="h-4 w-4" />
                    Test Voice
                  </Button>
                </div>
                
                {!isVoiceEnabled && (
                  <div className="rounded-md bg-muted p-3 text-sm">
                    <p>Voice navigation is currently disabled. Enable it to receive contextual guidance as you navigate through the application.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Additional general settings */}
            <Card>
              <CardHeader>
                <CardTitle>Application Preferences</CardTitle>
                <CardDescription>Customize your experience with ProcessFlow</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                  </div>
                  <Switch id="dark-mode-toggle" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto-save</p>
                    <p className="text-sm text-muted-foreground">Automatically save changes every 2 minutes</p>
                  </div>
                  <Switch id="auto-save-toggle" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  <CardTitle>Notification Settings</CardTitle>
                </div>
                <CardDescription>Configure how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Process Updates</p>
                      <p className="text-sm text-muted-foreground">Get notified when processes are updated</p>
                    </div>
                    <Switch id="process-updates" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Compliance Alerts</p>
                      <p className="text-sm text-muted-foreground">Receive alerts for compliance issues</p>
                    </div>
                    <Switch id="compliance-alerts" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="localization" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  <CardTitle>Regional Settings</CardTitle>
                </div>
                <CardDescription>Customize language and date format preferences</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Content for localization tab */}
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <label htmlFor="language" className="text-sm font-medium">Language</label>
                    <select id="language" className="w-full p-2 border rounded-md">
                      <option value="en">English</option>
                      <option value="de">German</option>
                      <option value="fr">French</option>
                      <option value="es">Spanish</option>
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="date-format" className="text-sm font-medium">Date Format</label>
                    <select id="date-format" className="w-full p-2 border rounded-md">
                      <option value="mdy">MM/DD/YYYY</option>
                      <option value="dmy">DD/MM/YYYY</option>
                      <option value="ymd">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  <CardTitle>Security Settings</CardTitle>
                </div>
                <CardDescription>Configure security and privacy preferences</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Content for security tab */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <Switch id="two-factor" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Session Timeout</p>
                      <p className="text-sm text-muted-foreground">Automatically log out after inactivity</p>
                    </div>
                    <Switch id="session-timeout" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  <CardTitle>System Integrations</CardTitle>
                </div>
                <CardDescription>Connect ProcessFlow with external systems</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Content for integrations tab */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded bg-blue-100 flex items-center justify-center">
                        <Share2 className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">SAP ERP Integration</p>
                        <p className="text-sm text-muted-foreground">Connect to SAP systems</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded bg-blue-100 flex items-center justify-center">
                        <Share2 className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Microsoft Teams</p>
                        <p className="text-sm text-muted-foreground">Enable process sharing in Teams</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded bg-blue-100 flex items-center justify-center">
                        <Share2 className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Jira Integration</p>
                        <p className="text-sm text-muted-foreground">Map IT tickets to processes</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
