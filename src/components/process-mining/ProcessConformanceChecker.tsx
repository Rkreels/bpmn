
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useVoice } from "@/contexts/VoiceContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  FileText,
  Eye,
  Download,
  Filter
} from "lucide-react";

export const ProcessConformanceChecker: React.FC = () => {
  const { speakText } = useVoice();
  const [selectedModel, setSelectedModel] = useState("order-process");
  const [selectedPeriod, setSelectedPeriod] = useState("last30days");

  const conformanceMetrics = [
    { name: "Overall Conformance", value: 82, target: 90, status: "warning" },
    { name: "Path Conformance", value: 76, target: 85, status: "alert" },
    { name: "Time Conformance", value: 88, target: 90, status: "good" },
    { name: "Resource Conformance", value: 94, target: 95, status: "good" }
  ];

  const violationData = [
    { type: "Skipped Steps", count: 245, severity: "High", trend: "+12%" },
    { type: "Wrong Sequence", count: 189, severity: "Medium", trend: "-5%" },
    { type: "Unauthorized Actor", count: 67, severity: "High", trend: "+8%" },
    { type: "Time Violations", count: 156, severity: "Medium", trend: "-15%" },
    { type: "Missing Approvals", count: 34, severity: "Critical", trend: "+23%" }
  ];

  const processSteps = [
    { step: "Order Receipt", conformance: 98, violations: 12, compliant: true },
    { step: "Credit Check", conformance: 85, violations: 89, compliant: true },
    { step: "Inventory Check", conformance: 92, violations: 45, compliant: true },
    { step: "Manager Approval", conformance: 67, violations: 234, compliant: false },
    { step: "Order Processing", conformance: 89, violations: 78, compliant: true },
    { step: "Quality Control", conformance: 76, violations: 134, compliant: false },
    { step: "Shipping", conformance: 94, violations: 34, compliant: true },
    { step: "Invoice Creation", conformance: 88, violations: 67, compliant: true }
  ];

  const conformanceBreakdown = [
    { name: "Compliant", value: 1847, color: "#22c55e" },
    { name: "Minor Violations", value: 423, color: "#f59e0b" },
    { name: "Major Violations", value: 156, color: "#ef4444" },
    { name: "Critical Violations", value: 34, color: "#dc2626" }
  ];

  return (
    <div 
      className="space-y-6"
      onMouseEnter={() => speakText("Process Conformance Checker. Monitor how well your actual processes follow the defined models and identify compliance violations. Track conformance metrics and investigate deviations to ensure process integrity.")}
    >
      {/* Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Process Model</label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="order-process">Order Processing</SelectItem>
                    <SelectItem value="invoice-approval">Invoice Approval</SelectItem>
                    <SelectItem value="customer-onboarding">Customer Onboarding</SelectItem>
                    <SelectItem value="support-ticket">Support Ticket</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Time Period</label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last7days">Last 7 days</SelectItem>
                    <SelectItem value="last30days">Last 30 days</SelectItem>
                    <SelectItem value="last90days">Last 90 days</SelectItem>
                    <SelectItem value="lastyear">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conformance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {conformanceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">{metric.name}</h3>
                <Badge variant={
                  metric.status === "good" ? "default" :
                  metric.status === "warning" ? "secondary" : "destructive"
                }>
                  {metric.status === "good" ? <CheckCircle className="h-3 w-3 mr-1" /> :
                   metric.status === "warning" ? <AlertTriangle className="h-3 w-3 mr-1" /> :
                   <XCircle className="h-3 w-3 mr-1" />}
                  {metric.status}
                </Badge>
              </div>
              <div className="text-2xl font-bold">{metric.value}%</div>
              <div className="text-xs text-muted-foreground">Target: {metric.target}%</div>
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div 
                  className={`h-2 rounded-full ${
                    metric.status === "good" ? "bg-green-500" :
                    metric.status === "warning" ? "bg-yellow-500" : "bg-red-500"
                  }`}
                  style={{ width: `${metric.value}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Conformance Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Violations Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Conformance Violations
            </CardTitle>
            <CardDescription>Types and frequency of process violations</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={violationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#ef4444" name="Violations" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Conformance Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Conformance Distribution
            </CardTitle>
            <CardDescription>Overall process compliance breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={conformanceBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {conformanceBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Violations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Violation Details
          </CardTitle>
          <CardDescription>Detailed breakdown of violations by type and severity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Violation Type</th>
                  <th className="text-right p-2">Count</th>
                  <th className="text-right p-2">Severity</th>
                  <th className="text-right p-2">Trend</th>
                  <th className="text-right p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {violationData.map((violation, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="p-2 font-medium">{violation.type}</td>
                    <td className="p-2 text-right">{violation.count}</td>
                    <td className="p-2 text-right">
                      <Badge variant={
                        violation.severity === "Critical" ? "destructive" :
                        violation.severity === "High" ? "destructive" :
                        violation.severity === "Medium" ? "secondary" : "outline"
                      }>
                        {violation.severity}
                      </Badge>
                    </td>
                    <td className="p-2 text-right">
                      <span className={`text-sm ${
                        violation.trend.startsWith('+') ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {violation.trend}
                      </span>
                    </td>
                    <td className="p-2 text-right">
                      <Button variant="outline" size="sm" className="mr-2">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Process Step Conformance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Step-by-Step Conformance
          </CardTitle>
          <CardDescription>Conformance rates for each process step</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {processSteps.map((step, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {step.compliant ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  <div>
                    <div className="font-medium">{step.step}</div>
                    <div className="text-sm text-muted-foreground">
                      {step.violations} violations detected
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-medium">{step.conformance}%</div>
                    <div className="text-xs text-muted-foreground">conformance</div>
                  </div>
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        step.conformance >= 90 ? "bg-green-500" :
                        step.conformance >= 75 ? "bg-yellow-500" : "bg-red-500"
                      }`}
                      style={{ width: `${step.conformance}%` }}
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
