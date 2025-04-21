
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';

// Performance charts
const performanceData = [
  { month: 'Jan', time: 4.8, rate: 89, satisfaction: 4.1 },
  { month: 'Feb', time: 4.5, rate: 90, satisfaction: 4.2 },
  { month: 'Mar', time: 4.2, rate: 91, satisfaction: 4.3 },
  { month: 'Apr', time: 3.9, rate: 92, satisfaction: 4.4 },
  { month: 'May', time: 3.5, rate: 93, satisfaction: 4.5 },
  { month: 'Jun', time: 3.2, rate: 94, satisfaction: 4.5 },
];

// Compliance charts
const complianceData = [
  { category: 'Regulatory', rate: 96, risk: 25 },
  { category: 'Quality', rate: 92, risk: 45 },
  { category: 'Security', rate: 97, risk: 15 },
  { category: 'Process', rate: 89, risk: 55 },
  { category: 'Data', rate: 94, risk: 35 },
];

// Bottleneck charts
const bottleneckData = [
  { step: 'Approval', delay: 18.2, impact: 85 },
  { step: 'Review', delay: 12.5, impact: 65 },
  { step: 'Verification', delay: 9.5, impact: 55 },
  { step: 'Input', delay: 4.3, impact: 25 },
  { step: 'Processing', delay: 6.8, impact: 45 },
];

// Chart components
export function PerformanceChart() {
  return (
    <div className="bg-muted rounded-lg p-4">
      <h3 className="text-sm font-medium mb-4">Process Performance Trend</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="time" stroke="#8884d8" name="Avg. Time (days)" />
            <Line type="monotone" dataKey="rate" stroke="#82ca9d" name="Success Rate (%)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function ComplianceChart() {
  return (
    <div className="bg-muted rounded-lg p-4">
      <h3 className="text-sm font-medium mb-4">Compliance Overview</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={complianceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="rate" fill="#8884d8" name="Compliance Rate (%)" />
            <Bar dataKey="risk" fill="#82ca9d" name="Risk Score" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export function BottleneckChart() {
  return (
    <div className="bg-muted rounded-lg p-4">
      <h3 className="text-sm font-medium mb-4">Process Bottlenecks</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={bottleneckData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="step" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="delay" fill="#8884d8" name="Avg. Delay (hours)" />
            <Bar dataKey="impact" fill="#82ca9d" name="Impact Score" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function PerformanceMetrics() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <MetricCard title="Avg. Completion Time" value="3.2 days" trend="+5%" />
      <MetricCard title="Success Rate" value="94%" trend="+2%" />
      <MetricCard title="User Satisfaction" value="4.5/5" trend="+0.3" />
    </div>
  );
}

export function ComplianceMetrics() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <MetricCard title="Compliance Rate" value="96%" trend="+1%" />
      <MetricCard title="Risk Score" value="Low" trend="Stable" />
      <MetricCard title="Audit Status" value="Passed" trend="↑" />
    </div>
  );
}

export function BottleneckMetrics() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <MetricCard title="Critical Points" value="3" trend="-2" />
      <MetricCard title="Avg. Delay" value="4.5h" trend="-1h" />
      <MetricCard title="Impact Score" value="Medium" trend="↓" />
    </div>
  );
}

function MetricCard({ title, value, trend }: { title: string; value: string; trend: string }) {
  return (
    <div className="bg-muted/50 rounded-lg p-4">
      <h4 className="text-sm text-muted-foreground">{title}</h4>
      <div className="mt-2 flex items-end justify-between">
        <span className="text-2xl font-semibold">{value}</span>
        <span className="text-sm text-muted-foreground">{trend}</span>
      </div>
    </div>
  );
}
