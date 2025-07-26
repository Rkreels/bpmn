import { useDataManager } from './useDataManager';
import { Report } from '@/types/modules';

const initialReportsData: Report[] = [
  {
    id: 'report_1',
    name: 'Monthly Process Performance Report',
    description: 'Comprehensive monthly report on process performance metrics',
    type: 'performance',
    format: 'pdf',
    dataSource: 'Process Analytics Database',
    parameters: {
      timeRange: 'monthly',
      includeMetrics: ['efficiency', 'cycle_time', 'cost'],
      departments: ['all']
    },
    schedule: {
      frequency: 'monthly',
      recipients: ['management@company.com', 'process-team@company.com']
    },
    lastGenerated: '2024-01-01T08:00:00Z',
    createdAt: '2024-01-01T09:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    createdBy: 'Analytics Team',
    status: 'active'
  },
  {
    id: 'report_2',
    name: 'Compliance Audit Report',
    description: 'Quarterly compliance audit findings and recommendations',
    type: 'compliance',
    format: 'excel',
    dataSource: 'Compliance Monitoring System',
    parameters: {
      timeRange: 'quarterly',
      auditAreas: ['financial', 'operational', 'regulatory'],
      riskLevels: ['high', 'medium']
    },
    createdAt: '2024-01-05T10:00:00Z',
    updatedAt: '2024-01-10T15:30:00Z',
    createdBy: 'Compliance Team',
    status: 'active'
  }
];

const validateReport = (item: Partial<Report>): string | null => {
  if (!item.name?.trim()) return 'Report name is required';
  if (!item.type) return 'Report type is required';
  if (!item.format) return 'Report format is required';
  return null;
};

export const useReportsData = () => {
  return useDataManager<Report>({
    storageKey: 'reports',
    initialData: initialReportsData,
    validator: validateReport
  });
};