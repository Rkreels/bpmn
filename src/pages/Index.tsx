
import React from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RealTimeMonitoring } from '@/components/enterprise/RealTimeMonitoring';
import { ComplianceManagement } from '@/components/enterprise/ComplianceManagement';
import { AdvancedSearch } from '@/components/enterprise/AdvancedSearch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  return (
    <MainLayout pageTitle="Enterprise Process Management Platform" className="bg-muted/30">
      <div className="space-y-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="monitoring">Real-Time Monitoring</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="search">Advanced Search</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="flex flex-col gap-8 max-w-6xl mx-auto py-8">
              <section className="text-center">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Enterprise Process Management Platform</h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Complete enterprise-grade business process management with real-time monitoring, compliance tracking, and advanced analytics
                </p>
              </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Process Manager</CardTitle>
              <CardDescription>Model, design and manage business processes</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Create and edit BPMN diagrams</p>
              <Button asChild>
                <Link to="/process-manager">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Repository</CardTitle>
              <CardDescription>Store and organize all your process assets</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Browse your process repository</p>
              <Button asChild>
                <Link to="/repository">
                  Explore <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Process Intelligence</CardTitle>
              <CardDescription>Analyze and optimize your processes</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Gain insights from process data</p>
              <Button asChild>
                <Link to="/process-intelligence">
                  Analyze <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Journey Modeler</CardTitle>
              <CardDescription>Map customer and user journeys</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Design customer experience flows</p>
              <Button asChild>
                <Link to="/journey-modeler">
                  Design <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Collaboration Hub</CardTitle>
              <CardDescription>Work together on process projects</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Share and collaborate</p>
              <Button asChild>
                <Link to="/collaboration-hub">
                  Collaborate <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
              <CardDescription>Get an overview of process activities</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">View your process metrics</p>
              <Button asChild>
                <Link to="/dashboard">
                  View Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="monitoring" className="space-y-6">
            <RealTimeMonitoring />
          </TabsContent>
          
          <TabsContent value="compliance" className="space-y-6">
            <ComplianceManagement />
          </TabsContent>
          
          <TabsContent value="search" className="space-y-6">
            <AdvancedSearch />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Index;
