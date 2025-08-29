import { BaseEntity } from '@/hooks/useDataManager';

export interface ProcessMetrics {
  id: string;
  processId: string;
  executionTime: number;
  completionRate: number;
  errorRate: number;
  resourceUtilization: number;
  timestamp: Date;
  slaCompliance: number;
  costPerExecution: number;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resourceType: string;
  resourceId: string;
  timestamp: Date;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
}

export interface ComplianceRule {
  id: string;
  name: string;
  description: string;
  regulation: string; // SOX, GDPR, ISO27001, etc.
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'data-privacy' | 'financial' | 'operational' | 'security';
  isActive: boolean;
  lastChecked: Date;
  complianceScore: number;
}

export interface KPI {
  id: string;
  name: string;
  description: string;
  value: number;
  target: number;
  unit: string;
  category: 'efficiency' | 'quality' | 'cost' | 'time';
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
  lastUpdated: Date;
}

export interface ProcessGovernance {
  id: string;
  processId: string;
  owner: string;
  approvers: string[];
  reviewCycle: number; // days
  lastReview: Date;
  nextReview: Date;
  governanceRating: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  controls: string[];
}

class EnterpriseDataService {
  private readonly API_BASE = '/api/v1';

  // Real-time process monitoring
  async getProcessMetrics(processId?: string, timeRange?: string): Promise<ProcessMetrics[]> {
    // Simulate real API call with realistic data
    await this.delay(500);
    
    const mockMetrics: ProcessMetrics[] = [
      {
        id: '1',
        processId: processId || 'proc_001',
        executionTime: 45.2,
        completionRate: 94.5,
        errorRate: 2.1,
        resourceUtilization: 78.3,
        timestamp: new Date(),
        slaCompliance: 96.2,
        costPerExecution: 12.45
      },
      {
        id: '2',
        processId: processId || 'proc_002',
        executionTime: 32.8,
        completionRate: 98.1,
        errorRate: 0.8,
        resourceUtilization: 65.4,
        timestamp: new Date(Date.now() - 3600000),
        slaCompliance: 99.1,
        costPerExecution: 8.32
      }
    ];

    return mockMetrics;
  }

  // Audit and compliance tracking
  async getAuditLogs(userId?: string, limit: number = 50): Promise<AuditLog[]> {
    await this.delay(300);
    
    const actions = ['CREATE', 'UPDATE', 'DELETE', 'VIEW', 'EXPORT', 'APPROVE'];
    const resources = ['PROCESS', 'USER', 'REPORT', 'CONFIGURATION'];
    
    return Array.from({ length: limit }, (_, i) => ({
      id: `audit_${i}`,
      userId: userId || `user_${Math.floor(Math.random() * 10)}`,
      action: actions[Math.floor(Math.random() * actions.length)],
      resourceType: resources[Math.floor(Math.random() * resources.length)],
      resourceId: `resource_${Math.floor(Math.random() * 100)}`,
      timestamp: new Date(Date.now() - i * 3600000),
      details: { description: `Performed ${actions[Math.floor(Math.random() * actions.length)]} operation` },
      ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
      userAgent: 'Mozilla/5.0 (Enterprise App)'
    }));
  }

  // Compliance management
  async getComplianceRules(): Promise<ComplianceRule[]> {
    await this.delay(400);
    
    return [
      {
        id: 'comp_001',
        name: 'Data Retention Policy',
        description: 'Ensures data is retained according to regulatory requirements',
        regulation: 'GDPR',
        severity: 'high',
        category: 'data-privacy',
        isActive: true,
        lastChecked: new Date(),
        complianceScore: 92.5
      },
      {
        id: 'comp_002',
        name: 'Financial Controls',
        description: 'Validates financial process controls and segregation of duties',
        regulation: 'SOX',
        severity: 'critical',
        category: 'financial',
        isActive: true,
        lastChecked: new Date(),
        complianceScore: 88.2
      },
      {
        id: 'comp_003',
        name: 'Access Control Matrix',
        description: 'Ensures proper access controls are in place',
        regulation: 'ISO27001',
        severity: 'high',
        category: 'security',
        isActive: true,
        lastChecked: new Date(),
        complianceScore: 95.1
      }
    ];
  }

  // KPI and performance tracking
  async getKPIs(): Promise<KPI[]> {
    await this.delay(300);
    
    return [
      {
        id: 'kpi_001',
        name: 'Process Automation Rate',
        description: 'Percentage of processes that are automated',
        value: 73.2,
        target: 80.0,
        unit: '%',
        category: 'efficiency',
        trend: 'up',
        changePercent: 5.2,
        lastUpdated: new Date()
      },
      {
        id: 'kpi_002',
        name: 'Average Process Cycle Time',
        description: 'Average time to complete a process instance',
        value: 4.2,
        target: 3.5,
        unit: 'hours',
        category: 'time',
        trend: 'down',
        changePercent: -8.1,
        lastUpdated: new Date()
      },
      {
        id: 'kpi_003',
        name: 'Process Quality Score',
        description: 'Overall quality rating of process outputs',
        value: 91.5,
        target: 95.0,
        unit: '%',
        category: 'quality',
        trend: 'stable',
        changePercent: 0.8,
        lastUpdated: new Date()
      },
      {
        id: 'kpi_004',
        name: 'Cost per Process Instance',
        description: 'Average cost to execute one process instance',
        value: 15.75,
        target: 12.00,
        unit: 'USD',
        category: 'cost',
        trend: 'down',
        changePercent: -12.3,
        lastUpdated: new Date()
      }
    ];
  }

  // Process governance
  async getProcessGovernance(processId: string): Promise<ProcessGovernance | null> {
    await this.delay(200);
    
    return {
      id: 'gov_001',
      processId,
      owner: 'john.doe@company.com',
      approvers: ['jane.smith@company.com', 'bob.wilson@company.com'],
      reviewCycle: 90,
      lastReview: new Date(Date.now() - 30 * 24 * 3600000),
      nextReview: new Date(Date.now() + 60 * 24 * 3600000),
      governanceRating: 8.5,
      riskLevel: 'medium',
      controls: ['Segregation of Duties', 'Approval Matrix', 'Audit Trail', 'Exception Handling']
    };
  }

  // Real-time notifications
  async getNotifications(userId: string): Promise<any[]> {
    await this.delay(200);
    
    return [
      {
        id: 'notif_001',
        type: 'alert',
        title: 'Process SLA Breach',
        message: 'Order Processing exceeded SLA by 15 minutes',
        severity: 'high',
        timestamp: new Date(),
        read: false,
        actionRequired: true
      },
      {
        id: 'notif_002',
        type: 'info',
        title: 'Compliance Check Complete',
        message: 'GDPR compliance check completed with 92% score',
        severity: 'medium',
        timestamp: new Date(Date.now() - 1800000),
        read: false,
        actionRequired: false
      },
      {
        id: 'notif_003',
        type: 'success',
        title: 'Process Optimization Deployed',
        message: 'New optimization reduced cycle time by 18%',
        severity: 'low',
        timestamp: new Date(Date.now() - 3600000),
        read: true,
        actionRequired: false
      }
    ];
  }

  // Advanced analytics
  async getProcessAnalytics(processId: string, timeRange: string = '30d') {
    await this.delay(600);
    
    return {
      processId,
      timeRange,
      totalExecutions: 1524,
      successRate: 94.2,
      avgExecutionTime: 42.5,
      bottlenecks: [
        { step: 'Approval', avgTime: 18.2, utilization: 85.3 },
        { step: 'Validation', avgTime: 12.1, utilization: 92.1 }
      ],
      predictions: {
        nextWeekVolume: 385,
        expectedBottlenecks: ['Approval'],
        recommendedActions: ['Increase approval capacity', 'Implement automation']
      },
      costAnalysis: {
        totalCost: 23450.75,
        costPerInstance: 15.42,
        costBreakdown: {
          labor: 65.2,
          technology: 22.8,
          overhead: 12.0
        }
      }
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const enterpriseDataService = new EnterpriseDataService();