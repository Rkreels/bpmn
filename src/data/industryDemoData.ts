import { Industry } from '@/contexts/IndustryContext';

export interface DemoProcess {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'draft' | 'review' | 'approved' | 'published' | 'archived';
  version: string;
  owner: string;
  collaborators: string[];
  properties: { estimatedDuration: string; complexity: string; automation: string; riskLevel?: string; complianceReq?: string; department?: string; };
  tags: string[];
}

export interface DemoRepository {
  id: string;
  name: string;
  type: 'process' | 'template' | 'document' | 'model';
  description: string;
  category: string;
  tags: string[];
  owner: string;
  visibility: 'public' | 'private' | 'team';
  version: string;
  downloadCount: number;
  rating: number;
}

export interface DemoJourney {
  id: string;
  name: string;
  persona: string;
  stages: number;
  touchpoints: number;
  satisfaction: number;
  status: 'draft' | 'active' | 'archived';
  lastModified: string;
}

export interface DemoReport {
  id: string;
  name: string;
  type: 'dashboard' | 'export' | 'scheduled';
  category: string;
  description: string;
  lastRun: string;
  frequency: string;
  status: 'active' | 'draft' | 'archived';
  views: number;
  creator: string;
}

export interface DemoDashboard {
  id: string;
  name: string;
  description: string;
  widgets: number;
  lastUpdated: string;
  views: number;
  isPublic: boolean;
}

export interface DemoInitiative {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  progress: number;
  startDate: string;
  endDate: string;
  owner: string;
  budget: number;
  roi: number;
}

export interface DemoCollaborationComment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  status: 'open' | 'resolved';
  likes: number;
}

export interface DemoApproval {
  id: string;
  processName: string;
  requester: string;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
  description: string;
}

export interface DemoTeamMember {
  id: string;
  name: string;
  role: string;
  status: 'online' | 'offline' | 'busy';
  lastActive: string;
}

export interface DemoMetric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

export interface IndustryDemoData {
  processes: DemoProcess[];
  repository: DemoRepository[];
  journeys: DemoJourney[];
  reports: DemoReport[];
  dashboards: DemoDashboard[];
  initiatives: DemoInitiative[];
  comments: DemoCollaborationComment[];
  approvals: DemoApproval[];
  teamMembers: DemoTeamMember[];
  metrics: DemoMetric[];
  projects: { id: string; name: string; status: string; progress: number; team: string[]; lastUpdated: string }[];
}

const manufacturingData: IndustryDemoData = {
  processes: [
    { id: 'mfg-p1', name: 'Production Line Quality Control', description: 'End-to-end QC process from raw material inspection to finished goods validation with SPC integration', category: 'Quality', status: 'published', version: '3.2', owner: 'Hans Mueller', collaborators: ['Yuki Tanaka', 'Raj Patel'], properties: { estimatedDuration: '4-6 hours', complexity: 'high', automation: 'partial', riskLevel: 'medium', complianceReq: 'ISO 9001', department: 'Quality Assurance' }, tags: ['quality', 'SPC', 'inspection', 'ISO-9001'] },
    { id: 'mfg-p2', name: 'Supply Chain Procurement Workflow', description: 'Vendor evaluation, PO creation, goods receipt and 3-way matching for manufacturing materials', category: 'Procurement', status: 'published', version: '2.8', owner: 'Raj Patel', collaborators: ['Hans Mueller', 'Emily Watson'], properties: { estimatedDuration: '2-5 days', complexity: 'high', automation: 'high', riskLevel: 'high', complianceReq: 'SOX', department: 'Procurement' }, tags: ['procurement', 'vendor', 'PO', 'supply-chain'] },
    { id: 'mfg-p3', name: 'Equipment Maintenance Schedule', description: 'Preventive and predictive maintenance workflow with IoT sensor integration and work order management', category: 'Maintenance', status: 'approved', version: '2.1', owner: 'Yuki Tanaka', collaborators: ['Carlos Rivera'], properties: { estimatedDuration: '1-3 days', complexity: 'medium', automation: 'partial', riskLevel: 'low', complianceReq: 'OSHA', department: 'Plant Maintenance' }, tags: ['maintenance', 'IoT', 'preventive', 'TPM'] },
    { id: 'mfg-p4', name: 'New Product Introduction (NPI)', description: 'Stage-gate process from concept to launch including design review, prototype, testing and production ramp-up', category: 'Engineering', status: 'review', version: '1.5', owner: 'Emily Watson', collaborators: ['Hans Mueller', 'Yuki Tanaka', 'Raj Patel'], properties: { estimatedDuration: '3-6 months', complexity: 'high', automation: 'none', riskLevel: 'high', complianceReq: 'ISO 14001', department: 'Engineering' }, tags: ['NPI', 'design', 'prototype', 'launch'] },
    { id: 'mfg-p5', name: 'Inventory Cycle Count Process', description: 'Automated cycle counting with barcode scanning, variance analysis and adjustment approvals', category: 'Warehouse', status: 'published', version: '4.0', owner: 'Carlos Rivera', collaborators: ['Raj Patel'], properties: { estimatedDuration: '2-4 hours', complexity: 'low', automation: 'high', riskLevel: 'low', complianceReq: 'GAAP', department: 'Warehouse' }, tags: ['inventory', 'cycle-count', 'barcode', 'warehouse'] },
    { id: 'mfg-p6', name: 'Shop Floor Data Collection', description: 'Real-time MES integration for OEE tracking, downtime recording and shift handover reports', category: 'Production', status: 'published', version: '2.3', owner: 'Hans Mueller', collaborators: ['Yuki Tanaka', 'Carlos Rivera'], properties: { estimatedDuration: 'Continuous', complexity: 'medium', automation: 'high', riskLevel: 'medium', complianceReq: 'GMP', department: 'Production' }, tags: ['MES', 'OEE', 'shop-floor', 'real-time'] },
    { id: 'mfg-p7', name: 'Supplier Non-Conformance Report', description: 'NCR workflow from defect identification through root cause analysis to CAPA closure', category: 'Quality', status: 'approved', version: '1.8', owner: 'Yuki Tanaka', collaborators: ['Hans Mueller'], properties: { estimatedDuration: '5-10 days', complexity: 'medium', automation: 'partial', riskLevel: 'high', complianceReq: 'ISO 9001', department: 'Quality Assurance' }, tags: ['NCR', 'CAPA', 'supplier', 'corrective-action'] },
    { id: 'mfg-p8', name: 'Production Planning & Scheduling', description: 'MRP-driven production scheduling with capacity planning, material availability and line balancing', category: 'Planning', status: 'draft', version: '1.0', owner: 'Emily Watson', collaborators: ['Carlos Rivera', 'Raj Patel'], properties: { estimatedDuration: '1-2 days', complexity: 'high', automation: 'partial', riskLevel: 'medium', complianceReq: 'Internal', department: 'Planning' }, tags: ['MRP', 'scheduling', 'capacity', 'planning'] },
    { id: 'mfg-p9', name: 'Environmental Compliance Tracking', description: 'Emissions monitoring, waste disposal tracking and regulatory reporting for EPA/OSHA compliance', category: 'Compliance', status: 'published', version: '2.5', owner: 'Carlos Rivera', collaborators: ['Emily Watson'], properties: { estimatedDuration: 'Monthly', complexity: 'medium', automation: 'partial', riskLevel: 'high', complianceReq: 'EPA/OSHA', department: 'EHS' }, tags: ['environmental', 'compliance', 'emissions', 'waste'] },
    { id: 'mfg-p10', name: 'Customer Order-to-Cash', description: 'Full O2C cycle from order entry through production, shipping, invoicing and payment collection', category: 'Sales', status: 'published', version: '3.5', owner: 'Raj Patel', collaborators: ['Hans Mueller', 'Emily Watson'], properties: { estimatedDuration: '5-15 days', complexity: 'high', automation: 'high', riskLevel: 'medium', complianceReq: 'SOX', department: 'Sales Operations' }, tags: ['O2C', 'order', 'invoice', 'shipping'] },
  ],
  repository: [
    { id: 'mfg-r1', name: 'ISO 9001:2015 Process Map Template', type: 'template', description: 'Certified quality management system process map template', category: 'Quality', tags: ['ISO-9001', 'QMS', 'template'], owner: 'Hans Mueller', visibility: 'public', version: '3.0', downloadCount: 892, rating: 4.8 },
    { id: 'mfg-r2', name: 'FMEA Analysis Workbook', type: 'document', description: 'Failure Mode and Effects Analysis template with severity/occurrence/detection scoring', category: 'Engineering', tags: ['FMEA', 'risk', 'analysis'], owner: 'Yuki Tanaka', visibility: 'team', version: '2.1', downloadCount: 567, rating: 4.6 },
    { id: 'mfg-r3', name: 'Value Stream Map - Assembly Line', type: 'model', description: 'Current and future state VSM for main assembly line operations', category: 'Lean', tags: ['VSM', 'lean', 'assembly'], owner: 'Carlos Rivera', visibility: 'public', version: '1.5', downloadCount: 423, rating: 4.4 },
    { id: 'mfg-r4', name: 'OEE Dashboard Template', type: 'template', description: 'Overall Equipment Effectiveness monitoring dashboard with shift-level breakdowns', category: 'Production', tags: ['OEE', 'dashboard', 'KPI'], owner: 'Emily Watson', visibility: 'public', version: '2.0', downloadCount: 756, rating: 4.7 },
    { id: 'mfg-r5', name: 'Supplier Qualification SOP', type: 'document', description: 'Standard operating procedure for new supplier qualification and audit', category: 'Procurement', tags: ['supplier', 'audit', 'SOP'], owner: 'Raj Patel', visibility: 'team', version: '4.2', downloadCount: 334, rating: 4.5 },
  ],
  journeys: [
    { id: 'mfg-j1', name: 'Customer Order Experience', persona: 'B2B Buyer', stages: 6, touchpoints: 18, satisfaction: 4.1, status: 'active', lastModified: '2026-02-10' },
    { id: 'mfg-j2', name: 'New Supplier Onboarding', persona: 'Material Supplier', stages: 5, touchpoints: 14, satisfaction: 3.8, status: 'active', lastModified: '2026-02-08' },
    { id: 'mfg-j3', name: 'Product Recall Response', persona: 'End Consumer', stages: 4, touchpoints: 10, satisfaction: 3.2, status: 'draft', lastModified: '2026-01-25' },
  ],
  reports: [
    { id: 'mfg-rp1', name: 'Production OEE Weekly Report', type: 'scheduled', category: 'Production', description: 'Automated weekly OEE analysis across all production lines', lastRun: '2026-02-14T06:00:00Z', frequency: 'Weekly', status: 'active', views: 1247, creator: 'Hans Mueller' },
    { id: 'mfg-rp2', name: 'Quality Non-Conformance Summary', type: 'dashboard', category: 'Quality', description: 'Real-time NCR tracking with Pareto analysis', lastRun: '2026-02-15T09:00:00Z', frequency: 'Daily', status: 'active', views: 856, creator: 'Yuki Tanaka' },
    { id: 'mfg-rp3', name: 'Supply Chain Risk Assessment', type: 'export', category: 'Procurement', description: 'Monthly supplier risk scoring and mitigation report', lastRun: '2026-02-01T08:00:00Z', frequency: 'Monthly', status: 'active', views: 423, creator: 'Raj Patel' },
  ],
  dashboards: [
    { id: 'mfg-d1', name: 'Plant Operations Control Center', description: 'Real-time production KPIs, downtime and throughput', widgets: 14, lastUpdated: '2026-02-15T10:30:00Z', views: 3456, isPublic: true },
    { id: 'mfg-d2', name: 'Quality Management Dashboard', description: 'Defect trends, SPC charts and audit status', widgets: 10, lastUpdated: '2026-02-15T09:45:00Z', views: 2134, isPublic: false },
    { id: 'mfg-d3', name: 'Supply Chain Visibility', description: 'Supplier performance, lead times and inventory levels', widgets: 8, lastUpdated: '2026-02-14T16:20:00Z', views: 1567, isPublic: true },
  ],
  initiatives: [
    { id: 'mfg-i1', name: 'Smart Factory IoT Integration', description: 'Deploy IoT sensors across 5 production lines for real-time monitoring and predictive maintenance', status: 'active', progress: 72, startDate: '2025-06-01', endDate: '2026-06-30', owner: 'Hans Mueller', budget: 850000, roi: 245 },
    { id: 'mfg-i2', name: 'Lean Six Sigma Black Belt Program', description: 'Train 20 engineers in LSS methodology to drive continuous improvement projects', status: 'active', progress: 45, startDate: '2025-09-01', endDate: '2026-08-31', owner: 'Yuki Tanaka', budget: 180000, roi: 320 },
    { id: 'mfg-i3', name: 'Digital Twin Implementation', description: 'Create digital twin models for critical production equipment and assembly cells', status: 'planning', progress: 15, startDate: '2026-01-15', endDate: '2026-12-31', owner: 'Emily Watson', budget: 1200000, roi: 180 },
    { id: 'mfg-i4', name: 'Supplier Portal Automation', description: 'Self-service supplier portal for PO management, invoicing and quality documentation', status: 'completed', progress: 100, startDate: '2025-01-01', endDate: '2025-12-31', owner: 'Raj Patel', budget: 320000, roi: 290 },
  ],
  comments: [
    { id: 'mfg-c1', author: 'Hans Mueller', content: 'The QC checkpoint at Station 7 is causing a 12-minute bottleneck. We need to review the inspection criteria.', timestamp: new Date(Date.now() - 1800000).toISOString(), status: 'open', likes: 5 },
    { id: 'mfg-c2', author: 'Yuki Tanaka', content: 'SPC charts showing Cpk below 1.33 on the CNC machining line. Root cause investigation initiated.', timestamp: new Date(Date.now() - 3600000).toISOString(), status: 'open', likes: 3 },
    { id: 'mfg-c3', author: 'Carlos Rivera', content: 'Completed the value stream mapping for Line 3. Identified 23% waste in material handling.', timestamp: new Date(Date.now() - 7200000).toISOString(), status: 'resolved', likes: 8 },
    { id: 'mfg-c4', author: 'Raj Patel', content: 'Vendor ABC Corp failed to meet delivery timeline for the third time. Escalating to procurement committee.', timestamp: new Date(Date.now() - 10800000).toISOString(), status: 'open', likes: 2 },
  ],
  approvals: [
    { id: 'mfg-a1', processName: 'Production Line Quality Control v3.2', requester: 'Hans Mueller', status: 'pending', requestDate: new Date().toISOString(), description: 'Added automated visual inspection step using machine vision cameras' },
    { id: 'mfg-a2', processName: 'Equipment Maintenance Schedule v2.1', requester: 'Yuki Tanaka', status: 'approved', requestDate: new Date(Date.now() - 86400000).toISOString(), description: 'Integrated predictive maintenance alerts from IoT sensors' },
    { id: 'mfg-a3', processName: 'Supplier NCR Process v1.8', requester: 'Carlos Rivera', status: 'pending', requestDate: new Date(Date.now() - 43200000).toISOString(), description: 'Updated CAPA timeline requirements per ISO 9001:2015 clause 10.2' },
  ],
  teamMembers: [
    { id: 'mfg-t1', name: 'Hans Mueller', role: 'Plant Manager', status: 'online', lastActive: 'now' },
    { id: 'mfg-t2', name: 'Yuki Tanaka', role: 'Quality Director', status: 'online', lastActive: '2 min ago' },
    { id: 'mfg-t3', name: 'Raj Patel', role: 'Supply Chain Lead', status: 'busy', lastActive: '5 min ago' },
    { id: 'mfg-t4', name: 'Emily Watson', role: 'Engineering Manager', status: 'online', lastActive: '1 min ago' },
    { id: 'mfg-t5', name: 'Carlos Rivera', role: 'Lean Six Sigma Lead', status: 'offline', lastActive: '1 hour ago' },
    { id: 'mfg-t6', name: 'Aisha Okafor', role: 'EHS Coordinator', status: 'online', lastActive: 'now' },
  ],
  metrics: [
    { label: 'Active Processes', value: '32', change: '+8%', trend: 'up' },
    { label: 'Team Members', value: '24', change: '+3', trend: 'up' },
    { label: 'Repository Items', value: '186', change: '+12', trend: 'up' },
    { label: 'Avg OEE', value: '87.3%', change: '+2.1%', trend: 'up' },
  ],
  projects: [
    { id: 'mfg-pr1', name: 'Smart Factory IoT Rollout - Phase 2', status: 'In Progress', progress: 72, team: ['Hans', 'Yuki', 'Emily'], lastUpdated: '2 hours ago' },
    { id: 'mfg-pr2', name: 'Quality Gate Automation', status: 'Review', progress: 90, team: ['Yuki', 'Carlos'], lastUpdated: '5 hours ago' },
    { id: 'mfg-pr3', name: 'Supplier Portal Go-Live', status: 'Completed', progress: 100, team: ['Raj', 'Aisha'], lastUpdated: '1 day ago' },
  ],
};

const healthcareData: IndustryDemoData = {
  processes: [
    { id: 'hc-p1', name: 'Patient Admission & Triage', description: 'Emergency and scheduled admission workflow with acuity scoring, bed management and initial assessment', category: 'Clinical', status: 'published', version: '4.1', owner: 'Dr. Sarah Chen', collaborators: ['Nurse Maria Lopez', 'James Wilson'], properties: { estimatedDuration: '30-90 min', complexity: 'high', automation: 'partial', riskLevel: 'high', complianceReq: 'HIPAA/Joint Commission', department: 'Emergency' }, tags: ['admission', 'triage', 'ED', 'acuity'] },
    { id: 'hc-p2', name: 'Medication Administration Record', description: 'Closed-loop medication process from physician order to bedside administration with barcode verification', category: 'Pharmacy', status: 'published', version: '3.6', owner: 'Dr. Robert Kim', collaborators: ['Dr. Sarah Chen', 'Nurse Maria Lopez'], properties: { estimatedDuration: '15-30 min', complexity: 'medium', automation: 'high', riskLevel: 'high', complianceReq: 'FDA/HIPAA', department: 'Pharmacy' }, tags: ['medication', 'BCMA', 'eMAR', 'safety'] },
    { id: 'hc-p3', name: 'Surgical Scheduling & Prep', description: 'OR scheduling, pre-op assessment, consent management and surgical safety checklist workflow', category: 'Surgical', status: 'approved', version: '2.4', owner: 'Dr. Lisa Park', collaborators: ['James Wilson', 'Dr. Robert Kim'], properties: { estimatedDuration: '2-4 weeks prep', complexity: 'high', automation: 'partial', riskLevel: 'high', complianceReq: 'Joint Commission', department: 'Surgery' }, tags: ['surgery', 'OR', 'scheduling', 'consent'] },
    { id: 'hc-p4', name: 'Patient Discharge Planning', description: 'Multidisciplinary discharge process including follow-up scheduling, medication reconciliation and patient education', category: 'Clinical', status: 'published', version: '2.8', owner: 'Nurse Maria Lopez', collaborators: ['Dr. Sarah Chen', 'Dr. Lisa Park'], properties: { estimatedDuration: '4-8 hours', complexity: 'medium', automation: 'partial', riskLevel: 'medium', complianceReq: 'CMS', department: 'Nursing' }, tags: ['discharge', 'transition', 'follow-up', 'education'] },
    { id: 'hc-p5', name: 'Clinical Lab Order-to-Result', description: 'Lab order entry, specimen collection, processing, analysis and result reporting with critical value alerts', category: 'Laboratory', status: 'published', version: '3.2', owner: 'James Wilson', collaborators: ['Dr. Robert Kim'], properties: { estimatedDuration: '1-24 hours', complexity: 'medium', automation: 'high', riskLevel: 'medium', complianceReq: 'CLIA/CAP', department: 'Laboratory' }, tags: ['lab', 'specimen', 'results', 'critical-values'] },
    { id: 'hc-p6', name: 'Insurance Pre-Authorization', description: 'Prior authorization workflow for procedures, medications and specialty referrals with payer integration', category: 'Revenue Cycle', status: 'review', version: '1.9', owner: 'Angela Torres', collaborators: ['Dr. Lisa Park'], properties: { estimatedDuration: '3-10 days', complexity: 'high', automation: 'partial', riskLevel: 'medium', complianceReq: 'CMS/Payer', department: 'Revenue Cycle' }, tags: ['authorization', 'insurance', 'payer', 'revenue'] },
    { id: 'hc-p7', name: 'Infection Control Surveillance', description: 'HAI surveillance, outbreak detection, contact tracing and antimicrobial stewardship reporting', category: 'Quality', status: 'published', version: '2.7', owner: 'Dr. Sarah Chen', collaborators: ['Nurse Maria Lopez', 'James Wilson'], properties: { estimatedDuration: 'Continuous', complexity: 'high', automation: 'high', riskLevel: 'high', complianceReq: 'CDC/CMS', department: 'Infection Prevention' }, tags: ['infection', 'HAI', 'surveillance', 'antimicrobial'] },
    { id: 'hc-p8', name: 'Medical Device Tracking', description: 'UDI-based medical device tracking from procurement through implant, maintenance and recall management', category: 'Supply Chain', status: 'approved', version: '1.6', owner: 'James Wilson', collaborators: ['Angela Torres'], properties: { estimatedDuration: 'Lifecycle', complexity: 'medium', automation: 'high', riskLevel: 'high', complianceReq: 'FDA/UDI', department: 'Materials Management' }, tags: ['device', 'UDI', 'tracking', 'recall'] },
    { id: 'hc-p9', name: 'Clinical Trial Protocol Management', description: 'IRB submission, patient enrollment, adverse event reporting and data collection for clinical research', category: 'Research', status: 'draft', version: '1.2', owner: 'Dr. Robert Kim', collaborators: ['Dr. Sarah Chen', 'Dr. Lisa Park'], properties: { estimatedDuration: '6-24 months', complexity: 'high', automation: 'partial', riskLevel: 'high', complianceReq: 'FDA/IRB', department: 'Clinical Research' }, tags: ['clinical-trial', 'IRB', 'enrollment', 'research'] },
    { id: 'hc-p10', name: 'Revenue Cycle Claims Processing', description: 'End-to-end claims lifecycle from charge capture through coding, submission, denial management and payment posting', category: 'Revenue Cycle', status: 'published', version: '5.0', owner: 'Angela Torres', collaborators: ['James Wilson'], properties: { estimatedDuration: '30-90 days', complexity: 'high', automation: 'high', riskLevel: 'medium', complianceReq: 'CMS/HIPAA', department: 'Revenue Cycle' }, tags: ['claims', 'billing', 'coding', 'denial-management'] },
  ],
  repository: [
    { id: 'hc-r1', name: 'HIPAA Compliance Framework', type: 'template', description: 'Complete HIPAA privacy and security compliance process template set', category: 'Compliance', tags: ['HIPAA', 'privacy', 'security'], owner: 'Dr. Sarah Chen', visibility: 'public', version: '4.0', downloadCount: 1456, rating: 4.9 },
    { id: 'hc-r2', name: 'Clinical Pathway - Sepsis Bundle', type: 'model', description: 'Evidence-based sepsis screening and management pathway with CMS SEP-1 compliance', category: 'Clinical', tags: ['sepsis', 'clinical-pathway', 'CMS'], owner: 'Dr. Robert Kim', visibility: 'team', version: '3.1', downloadCount: 876, rating: 4.7 },
    { id: 'hc-r3', name: 'Nursing Assessment Documentation Guide', type: 'document', description: 'Standardized nursing assessment documentation for all inpatient units', category: 'Nursing', tags: ['nursing', 'assessment', 'documentation'], owner: 'Nurse Maria Lopez', visibility: 'public', version: '2.5', downloadCount: 1234, rating: 4.6 },
    { id: 'hc-r4', name: 'OR Turnover Time Optimization Model', type: 'process', description: 'Lean process model for reducing surgical suite turnover time', category: 'Surgical', tags: ['OR', 'lean', 'optimization'], owner: 'Dr. Lisa Park', visibility: 'team', version: '1.8', downloadCount: 567, rating: 4.5 },
    { id: 'hc-r5', name: 'Patient Safety Event Reporting SOP', type: 'document', description: 'Standard procedure for reporting and investigating patient safety events and near-misses', category: 'Quality', tags: ['safety', 'reporting', 'investigation'], owner: 'James Wilson', visibility: 'public', version: '3.3', downloadCount: 923, rating: 4.8 },
  ],
  journeys: [
    { id: 'hc-j1', name: 'Patient Surgical Experience', persona: 'Elective Surgery Patient', stages: 7, touchpoints: 22, satisfaction: 4.0, status: 'active', lastModified: '2026-02-12' },
    { id: 'hc-j2', name: 'Emergency Department Visit', persona: 'Acute Care Patient', stages: 5, touchpoints: 15, satisfaction: 3.6, status: 'active', lastModified: '2026-02-10' },
    { id: 'hc-j3', name: 'Chronic Care Management', persona: 'Diabetic Patient', stages: 6, touchpoints: 20, satisfaction: 4.2, status: 'draft', lastModified: '2026-01-28' },
  ],
  reports: [
    { id: 'hc-rp1', name: 'Patient Safety Dashboard', type: 'dashboard', category: 'Quality', description: 'Real-time patient safety event tracking and CLABSI/CAUTI rates', lastRun: '2026-02-15T06:00:00Z', frequency: 'Daily', status: 'active', views: 2345, creator: 'Dr. Sarah Chen' },
    { id: 'hc-rp2', name: 'Revenue Cycle Performance', type: 'scheduled', category: 'Finance', description: 'Weekly A/R aging, clean claim rate and denial trends', lastRun: '2026-02-14T09:00:00Z', frequency: 'Weekly', status: 'active', views: 1567, creator: 'Angela Torres' },
    { id: 'hc-rp3', name: 'Clinical Quality Measures', type: 'export', category: 'Clinical', description: 'CMS quality measure reporting for MIPS/VBP programs', lastRun: '2026-02-01T08:00:00Z', frequency: 'Quarterly', status: 'active', views: 789, creator: 'Dr. Robert Kim' },
  ],
  dashboards: [
    { id: 'hc-d1', name: 'Hospital Command Center', description: 'Real-time bed census, ED wait times and surgical schedule', widgets: 16, lastUpdated: '2026-02-15T10:30:00Z', views: 5678, isPublic: true },
    { id: 'hc-d2', name: 'Clinical Quality Scorecard', description: 'Core measures, readmission rates and patient satisfaction', widgets: 12, lastUpdated: '2026-02-15T09:45:00Z', views: 3456, isPublic: false },
    { id: 'hc-d3', name: 'Financial Performance', description: 'Revenue, margin, payer mix and cost per case', widgets: 10, lastUpdated: '2026-02-14T16:20:00Z', views: 2345, isPublic: false },
  ],
  initiatives: [
    { id: 'hc-i1', name: 'EHR System Modernization', description: 'Migrate to cloud-based EHR with AI-powered clinical decision support', status: 'active', progress: 55, startDate: '2025-06-01', endDate: '2027-01-31', owner: 'Dr. Sarah Chen', budget: 2500000, roi: 185 },
    { id: 'hc-i2', name: 'Telehealth Expansion Program', description: 'Extend virtual care capabilities to 15 specialties with remote monitoring integration', status: 'active', progress: 80, startDate: '2025-01-01', endDate: '2026-06-30', owner: 'Dr. Lisa Park', budget: 450000, roi: 310 },
    { id: 'hc-i3', name: 'Patient Experience Excellence', description: 'HCAHPS improvement initiative targeting top decile performance', status: 'active', progress: 40, startDate: '2025-09-01', endDate: '2026-12-31', owner: 'Nurse Maria Lopez', budget: 200000, roi: 220 },
    { id: 'hc-i4', name: 'Revenue Cycle Automation', description: 'RPA for claims processing, prior authorization and denial management', status: 'completed', progress: 100, startDate: '2025-01-01', endDate: '2025-12-31', owner: 'Angela Torres', budget: 380000, roi: 340 },
  ],
  comments: [
    { id: 'hc-c1', author: 'Dr. Sarah Chen', content: 'ED throughput times have increased 15% this month. Need to review triage-to-bed assignment process.', timestamp: new Date(Date.now() - 1800000).toISOString(), status: 'open', likes: 7 },
    { id: 'hc-c2', author: 'Nurse Maria Lopez', content: 'Medication reconciliation compliance dropped to 89%. Implementing new checklist at discharge.', timestamp: new Date(Date.now() - 3600000).toISOString(), status: 'open', likes: 4 },
    { id: 'hc-c3', author: 'Angela Torres', content: 'Clean claim rate improved to 96.2% after implementing automated coding validation.', timestamp: new Date(Date.now() - 7200000).toISOString(), status: 'resolved', likes: 12 },
    { id: 'hc-c4', author: 'Dr. Robert Kim', content: 'Clinical trial enrollment for cardiac study ahead of schedule. 85% of target reached.', timestamp: new Date(Date.now() - 10800000).toISOString(), status: 'open', likes: 6 },
  ],
  approvals: [
    { id: 'hc-a1', processName: 'Patient Admission & Triage v4.1', requester: 'Dr. Sarah Chen', status: 'pending', requestDate: new Date().toISOString(), description: 'Updated ESI triage criteria and added sepsis screening at registration' },
    { id: 'hc-a2', processName: 'Clinical Lab Order-to-Result v3.2', requester: 'James Wilson', status: 'approved', requestDate: new Date(Date.now() - 86400000).toISOString(), description: 'Added automated critical value notification to attending physician' },
    { id: 'hc-a3', processName: 'Insurance Pre-Authorization v1.9', requester: 'Angela Torres', status: 'pending', requestDate: new Date(Date.now() - 43200000).toISOString(), description: 'Integrated electronic prior auth with top 5 payers via Availity' },
  ],
  teamMembers: [
    { id: 'hc-t1', name: 'Dr. Sarah Chen', role: 'Chief Medical Officer', status: 'online', lastActive: 'now' },
    { id: 'hc-t2', name: 'Nurse Maria Lopez', role: 'Chief Nursing Officer', status: 'online', lastActive: '3 min ago' },
    { id: 'hc-t3', name: 'Dr. Robert Kim', role: 'Pharmacy Director', status: 'busy', lastActive: '10 min ago' },
    { id: 'hc-t4', name: 'Dr. Lisa Park', role: 'Chief of Surgery', status: 'online', lastActive: '1 min ago' },
    { id: 'hc-t5', name: 'James Wilson', role: 'Lab Director', status: 'offline', lastActive: '2 hours ago' },
    { id: 'hc-t6', name: 'Angela Torres', role: 'Revenue Cycle Director', status: 'online', lastActive: 'now' },
  ],
  metrics: [
    { label: 'Active Processes', value: '28', change: '+5%', trend: 'up' },
    { label: 'Team Members', value: '32', change: '+4', trend: 'up' },
    { label: 'Repository Items', value: '214', change: '+18', trend: 'up' },
    { label: 'Patient Satisfaction', value: '92.1%', change: '+1.8%', trend: 'up' },
  ],
  projects: [
    { id: 'hc-pr1', name: 'EHR Cloud Migration - Phase 2', status: 'In Progress', progress: 55, team: ['Dr. Chen', 'James', 'Angela'], lastUpdated: '3 hours ago' },
    { id: 'hc-pr2', name: 'Telehealth Platform Launch', status: 'Review', progress: 95, team: ['Dr. Park', 'Maria'], lastUpdated: '1 hour ago' },
    { id: 'hc-pr3', name: 'Patient Safety Reporting System', status: 'Completed', progress: 100, team: ['Dr. Kim', 'James'], lastUpdated: '2 days ago' },
  ],
};

const constructionData: IndustryDemoData = {
  processes: [
    { id: 'con-p1', name: 'Project Bid & Tender Management', description: 'Complete bid lifecycle from RFP response through cost estimation, proposal submission and contract award', category: 'Pre-Construction', status: 'published', version: '3.0', owner: 'Mike Sullivan', collaborators: ['Patricia Hernandez', 'Tom Anderson'], properties: { estimatedDuration: '2-6 weeks', complexity: 'high', automation: 'partial', riskLevel: 'high', complianceReq: 'Contract Law', department: 'Business Development' }, tags: ['bid', 'tender', 'RFP', 'estimation'] },
    { id: 'con-p2', name: 'Building Permit Application', description: 'Municipal permit application workflow with document preparation, submission tracking and inspection scheduling', category: 'Regulatory', status: 'published', version: '2.5', owner: 'Patricia Hernandez', collaborators: ['Mike Sullivan', 'Dave Richardson'], properties: { estimatedDuration: '4-12 weeks', complexity: 'medium', automation: 'partial', riskLevel: 'medium', complianceReq: 'Local Building Code', department: 'Project Management' }, tags: ['permit', 'regulatory', 'building-code', 'inspection'] },
    { id: 'con-p3', name: 'Subcontractor Qualification & Safety', description: 'Subcontractor prequalification including insurance verification, safety record review and EMR scoring', category: 'Safety', status: 'published', version: '2.8', owner: 'Tom Anderson', collaborators: ['Patricia Hernandez'], properties: { estimatedDuration: '1-2 weeks', complexity: 'medium', automation: 'partial', riskLevel: 'high', complianceReq: 'OSHA', department: 'Safety' }, tags: ['subcontractor', 'safety', 'OSHA', 'qualification'] },
    { id: 'con-p4', name: 'Change Order Management', description: 'Field-initiated change order process with scope evaluation, cost impact analysis and client approval workflow', category: 'Project Management', status: 'approved', version: '2.2', owner: 'Dave Richardson', collaborators: ['Mike Sullivan', 'Sarah Kim'], properties: { estimatedDuration: '3-10 days', complexity: 'high', automation: 'partial', riskLevel: 'high', complianceReq: 'AIA Contract', department: 'Project Controls' }, tags: ['change-order', 'scope', 'cost', 'approval'] },
    { id: 'con-p5', name: 'Daily Field Reporting', description: 'Digital daily log including weather, manpower, equipment, work completed, safety observations and photo documentation', category: 'Field Operations', status: 'published', version: '4.0', owner: 'Sarah Kim', collaborators: ['Tom Anderson', 'Dave Richardson'], properties: { estimatedDuration: '30-60 min daily', complexity: 'low', automation: 'high', riskLevel: 'low', complianceReq: 'Internal', department: 'Field Operations' }, tags: ['daily-report', 'field-log', 'documentation', 'mobile'] },
    { id: 'con-p6', name: 'RFI Management Process', description: 'Request for Information lifecycle from creation through architect/engineer response and field implementation', category: 'Design', status: 'published', version: '2.6', owner: 'Patricia Hernandez', collaborators: ['Mike Sullivan'], properties: { estimatedDuration: '5-14 days', complexity: 'medium', automation: 'partial', riskLevel: 'medium', complianceReq: 'Contract', department: 'Design Coordination' }, tags: ['RFI', 'design', 'coordination', 'response'] },
    { id: 'con-p7', name: 'Safety Incident Investigation', description: 'OSHA-compliant incident investigation with root cause analysis, corrective actions and regulatory reporting', category: 'Safety', status: 'published', version: '3.1', owner: 'Tom Anderson', collaborators: ['Sarah Kim', 'Dave Richardson'], properties: { estimatedDuration: '1-5 days', complexity: 'high', automation: 'partial', riskLevel: 'high', complianceReq: 'OSHA 300', department: 'Safety' }, tags: ['incident', 'investigation', 'OSHA', 'root-cause'] },
    { id: 'con-p8', name: 'Material Procurement & Delivery', description: 'Long-lead material identification, procurement, expediting, receiving and laydown area management', category: 'Procurement', status: 'approved', version: '2.0', owner: 'Mike Sullivan', collaborators: ['Dave Richardson'], properties: { estimatedDuration: '2-16 weeks', complexity: 'high', automation: 'partial', riskLevel: 'high', complianceReq: 'Buy American', department: 'Procurement' }, tags: ['material', 'procurement', 'delivery', 'long-lead'] },
    { id: 'con-p9', name: 'Quality Control & Inspection', description: 'QC inspection workflow including ITP, hold points, special inspections and non-conformance reporting', category: 'Quality', status: 'review', version: '1.8', owner: 'Sarah Kim', collaborators: ['Tom Anderson'], properties: { estimatedDuration: 'Ongoing', complexity: 'medium', automation: 'partial', riskLevel: 'medium', complianceReq: 'Spec/Code', department: 'Quality' }, tags: ['QC', 'inspection', 'ITP', 'non-conformance'] },
    { id: 'con-p10', name: 'Project Closeout & Handover', description: 'Substantial completion, punch list, O&M manuals, warranty management and owner training/handover process', category: 'Project Management', status: 'draft', version: '1.5', owner: 'Dave Richardson', collaborators: ['Patricia Hernandez', 'Mike Sullivan', 'Sarah Kim'], properties: { estimatedDuration: '4-8 weeks', complexity: 'high', automation: 'partial', riskLevel: 'medium', complianceReq: 'AIA/Contract', department: 'Project Management' }, tags: ['closeout', 'punch-list', 'handover', 'warranty'] },
  ],
  repository: [
    { id: 'con-r1', name: 'OSHA Safety Plan Template', type: 'template', description: 'Site-specific safety plan template meeting OSHA 1926 requirements', category: 'Safety', tags: ['OSHA', 'safety-plan', 'template'], owner: 'Tom Anderson', visibility: 'public', version: '5.0', downloadCount: 1876, rating: 4.9 },
    { id: 'con-r2', name: 'AIA Contract Document Set', type: 'document', description: 'Standard AIA contract documents with company amendments and rider templates', category: 'Legal', tags: ['AIA', 'contract', 'legal'], owner: 'Mike Sullivan', visibility: 'team', version: '3.2', downloadCount: 934, rating: 4.7 },
    { id: 'con-r3', name: 'BIM Coordination Model - Hospital Wing', type: 'model', description: 'Federated BIM model for MEP coordination on healthcare facility construction', category: 'BIM', tags: ['BIM', 'MEP', 'coordination'], owner: 'Patricia Hernandez', visibility: 'team', version: '2.0', downloadCount: 567, rating: 4.5 },
    { id: 'con-r4', name: 'CPM Schedule Template', type: 'template', description: 'Critical path method schedule template with standard WBS for commercial construction', category: 'Scheduling', tags: ['CPM', 'schedule', 'WBS'], owner: 'Dave Richardson', visibility: 'public', version: '2.8', downloadCount: 1234, rating: 4.6 },
    { id: 'con-r5', name: 'Submittals Log & Tracking Sheet', type: 'document', description: 'Submittal management spreadsheet with status tracking and review cycle monitoring', category: 'Design', tags: ['submittals', 'tracking', 'review'], owner: 'Sarah Kim', visibility: 'public', version: '1.5', downloadCount: 789, rating: 4.4 },
  ],
  journeys: [
    { id: 'con-j1', name: 'Owner Project Delivery Experience', persona: 'Building Owner', stages: 8, touchpoints: 24, satisfaction: 4.3, status: 'active', lastModified: '2026-02-14' },
    { id: 'con-j2', name: 'Subcontractor Engagement', persona: 'Trade Subcontractor', stages: 5, touchpoints: 12, satisfaction: 3.9, status: 'active', lastModified: '2026-02-09' },
    { id: 'con-j3', name: 'New Worker Onboarding', persona: 'Field Worker', stages: 4, touchpoints: 8, satisfaction: 4.0, status: 'draft', lastModified: '2026-01-20' },
  ],
  reports: [
    { id: 'con-rp1', name: 'Project Cost Control Report', type: 'scheduled', category: 'Finance', description: 'Monthly cost-to-complete analysis with EVM metrics', lastRun: '2026-02-01T06:00:00Z', frequency: 'Monthly', status: 'active', views: 1567, creator: 'Mike Sullivan' },
    { id: 'con-rp2', name: 'Safety Performance Dashboard', type: 'dashboard', category: 'Safety', description: 'TRIR, DART, near-miss rates and leading indicator tracking', lastRun: '2026-02-15T06:00:00Z', frequency: 'Daily', status: 'active', views: 2345, creator: 'Tom Anderson' },
    { id: 'con-rp3', name: 'Schedule Variance Analysis', type: 'export', category: 'Scheduling', description: 'CPM schedule performance with critical path and float analysis', lastRun: '2026-02-14T08:00:00Z', frequency: 'Weekly', status: 'active', views: 987, creator: 'Dave Richardson' },
  ],
  dashboards: [
    { id: 'con-d1', name: 'Project Command Center', description: 'Multi-project portfolio with schedule, cost and safety KPIs', widgets: 18, lastUpdated: '2026-02-15T10:30:00Z', views: 4567, isPublic: true },
    { id: 'con-d2', name: 'Safety Scorecard', description: 'Leading and lagging safety indicators across all projects', widgets: 10, lastUpdated: '2026-02-15T09:45:00Z', views: 3456, isPublic: true },
    { id: 'con-d3', name: 'Financial Overview', description: 'Revenue recognition, margin analysis and cash flow projections', widgets: 8, lastUpdated: '2026-02-14T16:20:00Z', views: 1890, isPublic: false },
  ],
  initiatives: [
    { id: 'con-i1', name: 'Digital Twin Jobsite', description: 'Implement reality capture and digital twin technology for real-time project monitoring', status: 'active', progress: 35, startDate: '2025-09-01', endDate: '2026-09-30', owner: 'Patricia Hernandez', budget: 650000, roi: 195 },
    { id: 'con-i2', name: 'Modular Construction Program', description: 'Develop offsite prefabrication capabilities for MEP and structural components', status: 'active', progress: 60, startDate: '2025-03-01', endDate: '2026-06-30', owner: 'Mike Sullivan', budget: 1200000, roi: 270 },
    { id: 'con-i3', name: 'Safety Culture Excellence', description: 'Zero-incident culture program with behavioral safety observations and gamification', status: 'active', progress: 75, startDate: '2025-01-01', endDate: '2026-12-31', owner: 'Tom Anderson', budget: 150000, roi: 400 },
    { id: 'con-i4', name: 'Drone & AI Inspection', description: 'Deploy drones with AI-powered visual inspection for progress monitoring and quality', status: 'planning', progress: 10, startDate: '2026-03-01', endDate: '2027-02-28', owner: 'Sarah Kim', budget: 350000, roi: 230 },
  ],
  comments: [
    { id: 'con-c1', author: 'Mike Sullivan', content: 'Steel delivery for Tower B delayed 3 weeks due to mill capacity. Evaluating alternative suppliers.', timestamp: new Date(Date.now() - 1800000).toISOString(), status: 'open', likes: 4 },
    { id: 'con-c2', author: 'Tom Anderson', content: '45 consecutive days without a recordable incident on the Downtown project. Great work, team!', timestamp: new Date(Date.now() - 3600000).toISOString(), status: 'resolved', likes: 15 },
    { id: 'con-c3', author: 'Patricia Hernandez', content: 'BIM clash detection revealed 23 conflicts in the mechanical room. RFI submitted to architect.', timestamp: new Date(Date.now() - 7200000).toISOString(), status: 'open', likes: 6 },
    { id: 'con-c4', author: 'Dave Richardson', content: 'Change order #47 approved by owner. $125K added to contract for foundation redesign.', timestamp: new Date(Date.now() - 10800000).toISOString(), status: 'resolved', likes: 3 },
  ],
  approvals: [
    { id: 'con-a1', processName: 'Change Order Management v2.2', requester: 'Dave Richardson', status: 'pending', requestDate: new Date().toISOString(), description: 'Added digital signature workflow and automated cost impact calculation' },
    { id: 'con-a2', processName: 'Daily Field Reporting v4.0', requester: 'Sarah Kim', status: 'approved', requestDate: new Date(Date.now() - 86400000).toISOString(), description: 'Integrated drone photo capture and GPS-tagged progress documentation' },
    { id: 'con-a3', processName: 'QC Inspection Process v1.8', requester: 'Tom Anderson', status: 'pending', requestDate: new Date(Date.now() - 43200000).toISOString(), description: 'Added augmented reality overlay for spec compliance verification' },
  ],
  teamMembers: [
    { id: 'con-t1', name: 'Mike Sullivan', role: 'VP of Operations', status: 'online', lastActive: 'now' },
    { id: 'con-t2', name: 'Patricia Hernandez', role: 'BIM Manager', status: 'online', lastActive: '5 min ago' },
    { id: 'con-t3', name: 'Tom Anderson', role: 'Safety Director', status: 'busy', lastActive: '15 min ago' },
    { id: 'con-t4', name: 'Dave Richardson', role: 'Project Controls Mgr', status: 'online', lastActive: '2 min ago' },
    { id: 'con-t5', name: 'Sarah Kim', role: 'Quality Manager', status: 'offline', lastActive: '30 min ago' },
    { id: 'con-t6', name: 'Roberto Vega', role: 'Field Superintendent', status: 'online', lastActive: 'now' },
  ],
  metrics: [
    { label: 'Active Projects', value: '12', change: '+2', trend: 'up' },
    { label: 'Team Members', value: '186', change: '+14', trend: 'up' },
    { label: 'Safety TRIR', value: '0.82', change: '-12%', trend: 'up' },
    { label: 'On-Time Delivery', value: '91%', change: '+3%', trend: 'up' },
  ],
  projects: [
    { id: 'con-pr1', name: 'Downtown Medical Center - Phase 3', status: 'In Progress', progress: 68, team: ['Mike', 'Patricia', 'Tom'], lastUpdated: '1 hour ago' },
    { id: 'con-pr2', name: 'Industrial Park Expansion', status: 'In Progress', progress: 42, team: ['Dave', 'Sarah', 'Roberto'], lastUpdated: '3 hours ago' },
    { id: 'con-pr3', name: 'Highway Bridge Rehabilitation', status: 'Completed', progress: 100, team: ['Mike', 'Tom'], lastUpdated: '1 week ago' },
  ],
};

const financialData: IndustryDemoData = {
  processes: [
    { id: 'fin-p1', name: 'KYC/AML Customer Onboarding', description: 'Know Your Customer and Anti-Money Laundering verification workflow for new account opening', category: 'Compliance', status: 'published', version: '5.2', owner: 'Jennifer Blake', collaborators: ['Marcus Chen', 'Priya Sharma'], properties: { estimatedDuration: '1-5 days', complexity: 'high', automation: 'high', riskLevel: 'high', complianceReq: 'BSA/AML/OFAC', department: 'Compliance' }, tags: ['KYC', 'AML', 'onboarding', 'BSA'] },
    { id: 'fin-p2', name: 'Loan Origination & Underwriting', description: 'End-to-end loan processing from application through credit analysis, underwriting decision and closing', category: 'Lending', status: 'published', version: '4.0', owner: 'Marcus Chen', collaborators: ['Jennifer Blake', 'David Park'], properties: { estimatedDuration: '5-15 days', complexity: 'high', automation: 'partial', riskLevel: 'high', complianceReq: 'TILA/RESPA', department: 'Lending' }, tags: ['loan', 'underwriting', 'credit', 'origination'] },
    { id: 'fin-p3', name: 'Fraud Detection & Investigation', description: 'Real-time transaction monitoring, alert triage, case investigation and SAR filing workflow', category: 'Risk', status: 'published', version: '3.5', owner: 'Priya Sharma', collaborators: ['Jennifer Blake'], properties: { estimatedDuration: '1-30 days', complexity: 'high', automation: 'high', riskLevel: 'high', complianceReq: 'BSA/FinCEN', department: 'Fraud Prevention' }, tags: ['fraud', 'investigation', 'SAR', 'monitoring'] },
    { id: 'fin-p4', name: 'Trade Settlement & Clearing', description: 'Securities trade matching, confirmation, clearing and settlement process with T+1 compliance', category: 'Capital Markets', status: 'published', version: '6.1', owner: 'David Park', collaborators: ['Marcus Chen'], properties: { estimatedDuration: 'T+1', complexity: 'high', automation: 'high', riskLevel: 'medium', complianceReq: 'SEC/FINRA', department: 'Operations' }, tags: ['trade', 'settlement', 'clearing', 'T+1'] },
    { id: 'fin-p5', name: 'Regulatory Reporting (Call Report)', description: 'Quarterly regulatory reporting including FFIEC Call Report, FR Y-9C and stress testing submissions', category: 'Compliance', status: 'approved', version: '2.8', owner: 'Jennifer Blake', collaborators: ['Priya Sharma', 'David Park'], properties: { estimatedDuration: '3-4 weeks quarterly', complexity: 'high', automation: 'partial', riskLevel: 'high', complianceReq: 'FFIEC/Fed', department: 'Regulatory' }, tags: ['regulatory', 'call-report', 'FFIEC', 'reporting'] },
    { id: 'fin-p6', name: 'Credit Card Dispute Resolution', description: 'Cardholder dispute intake, investigation, provisional credit and resolution per Reg E/Z requirements', category: 'Operations', status: 'published', version: '3.3', owner: 'Alicia Moreno', collaborators: ['Marcus Chen'], properties: { estimatedDuration: '10-45 days', complexity: 'medium', automation: 'partial', riskLevel: 'medium', complianceReq: 'Reg E/Z', department: 'Card Services' }, tags: ['dispute', 'chargeback', 'Reg-E', 'credit-card'] },
    { id: 'fin-p7', name: 'Wealth Management Portfolio Review', description: 'Quarterly client portfolio review including performance analysis, rebalancing and compliance suitability check', category: 'Wealth', status: 'published', version: '2.5', owner: 'David Park', collaborators: ['Priya Sharma'], properties: { estimatedDuration: '1-2 weeks', complexity: 'high', automation: 'partial', riskLevel: 'medium', complianceReq: 'SEC/DOL', department: 'Wealth Management' }, tags: ['portfolio', 'review', 'rebalancing', 'suitability'] },
    { id: 'fin-p8', name: 'Insurance Claims Processing', description: 'Claims intake, adjudication, reserve setting, investigation and payment processing for P&C insurance', category: 'Insurance', status: 'review', version: '2.0', owner: 'Alicia Moreno', collaborators: ['Jennifer Blake'], properties: { estimatedDuration: '5-30 days', complexity: 'high', automation: 'partial', riskLevel: 'high', complianceReq: 'State DOI', department: 'Claims' }, tags: ['claims', 'adjudication', 'insurance', 'payment'] },
    { id: 'fin-p9', name: 'Vendor Risk Management', description: 'Third-party risk assessment including due diligence, contract review, ongoing monitoring and exit planning', category: 'Risk', status: 'approved', version: '1.8', owner: 'Priya Sharma', collaborators: ['Jennifer Blake', 'Marcus Chen'], properties: { estimatedDuration: '2-6 weeks', complexity: 'high', automation: 'partial', riskLevel: 'high', complianceReq: 'OCC/FDIC', department: 'Third Party Risk' }, tags: ['vendor', 'third-party', 'risk', 'due-diligence'] },
    { id: 'fin-p10', name: 'Digital Banking Account Opening', description: 'Online/mobile account opening with identity verification, funding and product enrollment', category: 'Digital', status: 'published', version: '4.5', owner: 'Marcus Chen', collaborators: ['Alicia Moreno', 'David Park'], properties: { estimatedDuration: '5-15 min', complexity: 'medium', automation: 'high', riskLevel: 'medium', complianceReq: 'CIP/BSA', department: 'Digital Banking' }, tags: ['digital', 'account-opening', 'mobile', 'identity'] },
  ],
  repository: [
    { id: 'fin-r1', name: 'BSA/AML Compliance Program Template', type: 'template', description: 'Bank Secrecy Act compliance program documentation with risk assessment framework', category: 'Compliance', tags: ['BSA', 'AML', 'compliance'], owner: 'Jennifer Blake', visibility: 'team', version: '6.0', downloadCount: 2345, rating: 4.9 },
    { id: 'fin-r2', name: 'Credit Risk Scoring Model', type: 'model', description: 'Machine learning credit risk model with FICO integration and alternative data sources', category: 'Risk', tags: ['credit-risk', 'scoring', 'ML'], owner: 'Marcus Chen', visibility: 'team', version: '3.0', downloadCount: 1567, rating: 4.7 },
    { id: 'fin-r3', name: 'SOX Control Matrix', type: 'document', description: 'Sarbanes-Oxley internal control documentation with testing procedures and evidence', category: 'Audit', tags: ['SOX', 'controls', 'audit'], owner: 'Priya Sharma', visibility: 'team', version: '4.2', downloadCount: 1890, rating: 4.8 },
    { id: 'fin-r4', name: 'Trading Desk Process Map', type: 'process', description: 'Front-to-back office trade lifecycle process map for fixed income securities', category: 'Capital Markets', tags: ['trading', 'fixed-income', 'lifecycle'], owner: 'David Park', visibility: 'team', version: '2.5', downloadCount: 678, rating: 4.5 },
    { id: 'fin-r5', name: 'Customer Complaint Resolution SOP', type: 'document', description: 'Reg DD and UDAAP compliant complaint handling and resolution procedures', category: 'Operations', tags: ['complaint', 'resolution', 'UDAAP'], owner: 'Alicia Moreno', visibility: 'public', version: '3.1', downloadCount: 1234, rating: 4.6 },
  ],
  journeys: [
    { id: 'fin-j1', name: 'Digital Account Opening', persona: 'Millennial Professional', stages: 5, touchpoints: 12, satisfaction: 4.4, status: 'active', lastModified: '2026-02-13' },
    { id: 'fin-j2', name: 'Mortgage Application Experience', persona: 'First-Time Homebuyer', stages: 8, touchpoints: 25, satisfaction: 3.7, status: 'active', lastModified: '2026-02-11' },
    { id: 'fin-j3', name: 'Wealth Client Onboarding', persona: 'High Net Worth Client', stages: 6, touchpoints: 18, satisfaction: 4.5, status: 'draft', lastModified: '2026-02-05' },
  ],
  reports: [
    { id: 'fin-rp1', name: 'Regulatory Capital Adequacy', type: 'scheduled', category: 'Regulatory', description: 'Daily capital ratio monitoring and Basel III compliance reporting', lastRun: '2026-02-15T06:00:00Z', frequency: 'Daily', status: 'active', views: 3456, creator: 'Jennifer Blake' },
    { id: 'fin-rp2', name: 'Fraud Loss Analysis', type: 'dashboard', category: 'Risk', description: 'Real-time fraud loss tracking by channel, product and geography', lastRun: '2026-02-15T09:00:00Z', frequency: 'Daily', status: 'active', views: 2567, creator: 'Priya Sharma' },
    { id: 'fin-rp3', name: 'Loan Portfolio Performance', type: 'export', category: 'Lending', description: 'Monthly loan portfolio quality metrics including delinquency, charge-offs and loss reserves', lastRun: '2026-02-01T08:00:00Z', frequency: 'Monthly', status: 'active', views: 1890, creator: 'Marcus Chen' },
  ],
  dashboards: [
    { id: 'fin-d1', name: 'Executive Risk Dashboard', description: 'Enterprise risk appetite metrics, capital ratios and regulatory compliance', widgets: 16, lastUpdated: '2026-02-15T10:30:00Z', views: 5678, isPublic: false },
    { id: 'fin-d2', name: 'Trading Floor Monitor', description: 'Real-time P&L, position limits and market risk indicators', widgets: 20, lastUpdated: '2026-02-15T09:45:00Z', views: 4567, isPublic: false },
    { id: 'fin-d3', name: 'Digital Banking Analytics', description: 'Channel adoption, conversion rates and customer satisfaction scores', widgets: 12, lastUpdated: '2026-02-14T16:20:00Z', views: 3456, isPublic: true },
  ],
  initiatives: [
    { id: 'fin-i1', name: 'Open Banking API Platform', description: 'Build PSD2/FDX compliant open banking APIs for third-party developer ecosystem', status: 'active', progress: 50, startDate: '2025-06-01', endDate: '2026-12-31', owner: 'Marcus Chen', budget: 3500000, roi: 195 },
    { id: 'fin-i2', name: 'AI-Powered Fraud Prevention', description: 'Deploy real-time ML models for transaction fraud detection across all channels', status: 'active', progress: 85, startDate: '2025-01-01', endDate: '2026-06-30', owner: 'Priya Sharma', budget: 1800000, roi: 450 },
    { id: 'fin-i3', name: 'Core Banking Modernization', description: 'Replace legacy core banking system with cloud-native microservices architecture', status: 'active', progress: 30, startDate: '2025-09-01', endDate: '2028-06-30', owner: 'David Park', budget: 12000000, roi: 165 },
    { id: 'fin-i4', name: 'Regulatory Technology (RegTech)', description: 'Automated regulatory reporting and compliance monitoring using NLP and AI', status: 'completed', progress: 100, startDate: '2024-06-01', endDate: '2025-12-31', owner: 'Jennifer Blake', budget: 750000, roi: 380 },
  ],
  comments: [
    { id: 'fin-c1', author: 'Jennifer Blake', content: 'BSA exam completed with no findings. AML transaction monitoring rules performing above benchmark.', timestamp: new Date(Date.now() - 1800000).toISOString(), status: 'resolved', likes: 12 },
    { id: 'fin-c2', author: 'Priya Sharma', content: 'Fraud model detected a new synthetic identity pattern. Updating rules engine with additional features.', timestamp: new Date(Date.now() - 3600000).toISOString(), status: 'open', likes: 8 },
    { id: 'fin-c3', author: 'Marcus Chen', content: 'Digital account opening conversion rate increased to 78% after UX redesign of identity verification step.', timestamp: new Date(Date.now() - 7200000).toISOString(), status: 'open', likes: 15 },
    { id: 'fin-c4', author: 'David Park', content: 'T+1 settlement go-live successful. All trades settled within the new regulatory timeline.', timestamp: new Date(Date.now() - 10800000).toISOString(), status: 'resolved', likes: 20 },
  ],
  approvals: [
    { id: 'fin-a1', processName: 'KYC/AML Onboarding v5.2', requester: 'Jennifer Blake', status: 'pending', requestDate: new Date().toISOString(), description: 'Added automated beneficial ownership verification via API integration' },
    { id: 'fin-a2', processName: 'Fraud Detection v3.5', requester: 'Priya Sharma', status: 'approved', requestDate: new Date(Date.now() - 86400000).toISOString(), description: 'Deployed new ML model with 99.2% detection rate and 0.1% false positive rate' },
    { id: 'fin-a3', processName: 'Insurance Claims v2.0', requester: 'Alicia Moreno', status: 'pending', requestDate: new Date(Date.now() - 43200000).toISOString(), description: 'Added AI-powered claims triage and automated liability determination' },
  ],
  teamMembers: [
    { id: 'fin-t1', name: 'Jennifer Blake', role: 'Chief Compliance Officer', status: 'online', lastActive: 'now' },
    { id: 'fin-t2', name: 'Marcus Chen', role: 'Head of Digital Banking', status: 'online', lastActive: '1 min ago' },
    { id: 'fin-t3', name: 'Priya Sharma', role: 'Chief Risk Officer', status: 'busy', lastActive: '10 min ago' },
    { id: 'fin-t4', name: 'David Park', role: 'Capital Markets Director', status: 'online', lastActive: '3 min ago' },
    { id: 'fin-t5', name: 'Alicia Moreno', role: 'Operations Director', status: 'offline', lastActive: '1 hour ago' },
    { id: 'fin-t6', name: 'Kevin Zhang', role: 'Technology Director', status: 'online', lastActive: 'now' },
  ],
  metrics: [
    { label: 'Active Processes', value: '45', change: '+10%', trend: 'up' },
    { label: 'Team Members', value: '42', change: '+5', trend: 'up' },
    { label: 'Compliance Score', value: '98.5%', change: '+0.5%', trend: 'up' },
    { label: 'Fraud Detection', value: '99.2%', change: '+1.2%', trend: 'up' },
  ],
  projects: [
    { id: 'fin-pr1', name: 'Open Banking API - Phase 2', status: 'In Progress', progress: 50, team: ['Marcus', 'Kevin', 'Alicia'], lastUpdated: '2 hours ago' },
    { id: 'fin-pr2', name: 'ML Fraud Model Deployment', status: 'Review', progress: 92, team: ['Priya', 'Kevin'], lastUpdated: '4 hours ago' },
    { id: 'fin-pr3', name: 'RegTech Automation', status: 'Completed', progress: 100, team: ['Jennifer', 'David'], lastUpdated: '1 week ago' },
  ],
};

const retailData: IndustryDemoData = {
  processes: [
    { id: 'ret-p1', name: 'Omni-Channel Order Fulfillment', description: 'Unified order processing across web, mobile, in-store and marketplace channels with real-time inventory allocation', category: 'Operations', status: 'published', version: '4.2', owner: 'Rachel Green', collaborators: ['Tony Martinez', 'Amy Chen'], properties: { estimatedDuration: '1-5 days', complexity: 'high', automation: 'high', riskLevel: 'medium', complianceReq: 'PCI DSS', department: 'Fulfillment' }, tags: ['omni-channel', 'fulfillment', 'order', 'inventory'] },
    { id: 'ret-p2', name: 'Product Information Management', description: 'PIM workflow from vendor data ingestion through enrichment, DAM integration and multi-channel publication', category: 'Merchandising', status: 'published', version: '3.0', owner: 'Amy Chen', collaborators: ['Rachel Green'], properties: { estimatedDuration: '2-7 days', complexity: 'medium', automation: 'high', riskLevel: 'low', complianceReq: 'Internal', department: 'Merchandising' }, tags: ['PIM', 'product', 'content', 'DAM'] },
    { id: 'ret-p3', name: 'Customer Returns & Exchanges', description: 'Cross-channel returns processing with quality inspection, restocking, refund and exchange workflow', category: 'Customer Service', status: 'published', version: '2.8', owner: 'Tony Martinez', collaborators: ['Rachel Green', 'Kim Park'], properties: { estimatedDuration: '1-7 days', complexity: 'medium', automation: 'partial', riskLevel: 'medium', complianceReq: 'Consumer Protection', department: 'Customer Service' }, tags: ['returns', 'exchange', 'refund', 'quality'] },
    { id: 'ret-p4', name: 'Demand Forecasting & Replenishment', description: 'ML-driven demand planning with automatic replenishment, safety stock calculation and allocation optimization', category: 'Supply Chain', status: 'published', version: '3.5', owner: 'Kim Park', collaborators: ['Amy Chen', 'Jason Lee'], properties: { estimatedDuration: 'Continuous', complexity: 'high', automation: 'high', riskLevel: 'medium', complianceReq: 'Internal', department: 'Planning' }, tags: ['forecasting', 'replenishment', 'demand', 'ML'] },
    { id: 'ret-p5', name: 'Seasonal Markdown Optimization', description: 'Price optimization workflow with competitive analysis, markdown cadence and margin protection rules', category: 'Pricing', status: 'approved', version: '2.2', owner: 'Rachel Green', collaborators: ['Amy Chen'], properties: { estimatedDuration: '1-2 weeks', complexity: 'high', automation: 'high', riskLevel: 'medium', complianceReq: 'FTC', department: 'Pricing' }, tags: ['markdown', 'pricing', 'optimization', 'margin'] },
    { id: 'ret-p6', name: 'Loyalty Program Management', description: 'Points accrual, tier management, reward redemption and personalized offer engine workflow', category: 'Marketing', status: 'published', version: '2.6', owner: 'Tony Martinez', collaborators: ['Kim Park'], properties: { estimatedDuration: 'Continuous', complexity: 'medium', automation: 'high', riskLevel: 'low', complianceReq: 'CCPA/GDPR', department: 'Marketing' }, tags: ['loyalty', 'rewards', 'points', 'personalization'] },
    { id: 'ret-p7', name: 'Store Operations Daily Playbook', description: 'Daily store opening/closing procedures, task management, staffing and customer experience standards', category: 'Store Ops', status: 'published', version: '5.0', owner: 'Jason Lee', collaborators: ['Tony Martinez'], properties: { estimatedDuration: 'Daily', complexity: 'low', automation: 'partial', riskLevel: 'low', complianceReq: 'Internal', department: 'Store Operations' }, tags: ['store', 'operations', 'daily', 'playbook'] },
    { id: 'ret-p8', name: 'Vendor Collaboration Portal', description: 'Vendor onboarding, PO management, ASN, EDI integration and scorecard-based performance evaluation', category: 'Procurement', status: 'review', version: '1.8', owner: 'Kim Park', collaborators: ['Rachel Green', 'Amy Chen'], properties: { estimatedDuration: 'Ongoing', complexity: 'high', automation: 'high', riskLevel: 'medium', complianceReq: 'Contract', department: 'Procurement' }, tags: ['vendor', 'EDI', 'collaboration', 'scorecard'] },
    { id: 'ret-p9', name: 'Customer Journey Personalization', description: 'Real-time personalization engine for product recommendations, email triggers and dynamic content across touchpoints', category: 'Marketing', status: 'published', version: '2.4', owner: 'Amy Chen', collaborators: ['Tony Martinez', 'Jason Lee'], properties: { estimatedDuration: 'Real-time', complexity: 'high', automation: 'high', riskLevel: 'low', complianceReq: 'CCPA/GDPR', department: 'Digital Marketing' }, tags: ['personalization', 'recommendations', 'AI', 'engagement'] },
    { id: 'ret-p10', name: 'Last-Mile Delivery Optimization', description: 'Route optimization, carrier selection, real-time tracking and delivery experience management', category: 'Logistics', status: 'approved', version: '2.0', owner: 'Jason Lee', collaborators: ['Kim Park'], properties: { estimatedDuration: 'Same-day to 5 days', complexity: 'high', automation: 'high', riskLevel: 'medium', complianceReq: 'FTC/DOT', department: 'Logistics' }, tags: ['delivery', 'last-mile', 'routing', 'tracking'] },
  ],
  repository: [
    { id: 'ret-r1', name: 'Omni-Channel Playbook', type: 'document', description: 'Strategic playbook for unified commerce execution across all channels', category: 'Strategy', tags: ['omni-channel', 'strategy', 'commerce'], owner: 'Rachel Green', visibility: 'public', version: '3.0', downloadCount: 1567, rating: 4.8 },
    { id: 'ret-r2', name: 'POS Integration Template', type: 'template', description: 'Point-of-sale system integration template for new store openings', category: 'Technology', tags: ['POS', 'integration', 'store'], owner: 'Jason Lee', visibility: 'team', version: '2.5', downloadCount: 890, rating: 4.6 },
    { id: 'ret-r3', name: 'Customer Segmentation Model', type: 'model', description: 'RFM-based customer segmentation with CLV prediction and churn propensity', category: 'Analytics', tags: ['segmentation', 'CLV', 'RFM'], owner: 'Amy Chen', visibility: 'team', version: '2.0', downloadCount: 1234, rating: 4.7 },
    { id: 'ret-r4', name: 'Seasonal Planning Calendar', type: 'template', description: 'Annual merchandising and marketing calendar with promotional cadence', category: 'Merchandising', tags: ['seasonal', 'calendar', 'promotional'], owner: 'Tony Martinez', visibility: 'public', version: '1.5', downloadCount: 678, rating: 4.4 },
    { id: 'ret-r5', name: 'Supply Chain Sustainability Report', type: 'document', description: 'ESG compliance documentation for sustainable sourcing and ethical supply chain', category: 'Sustainability', tags: ['ESG', 'sustainability', 'sourcing'], owner: 'Kim Park', visibility: 'public', version: '1.8', downloadCount: 456, rating: 4.5 },
  ],
  journeys: [
    { id: 'ret-j1', name: 'Online Purchase Journey', persona: 'Digital-First Shopper', stages: 6, touchpoints: 16, satisfaction: 4.3, status: 'active', lastModified: '2026-02-15' },
    { id: 'ret-j2', name: 'In-Store Experience', persona: 'Traditional Shopper', stages: 5, touchpoints: 12, satisfaction: 4.1, status: 'active', lastModified: '2026-02-10' },
    { id: 'ret-j3', name: 'BOPIS/Curbside Pickup', persona: 'Convenience Seeker', stages: 4, touchpoints: 8, satisfaction: 4.5, status: 'draft', lastModified: '2026-02-01' },
  ],
  reports: [
    { id: 'ret-rp1', name: 'Sales Performance by Channel', type: 'dashboard', category: 'Sales', description: 'Real-time sales tracking across web, mobile, stores and marketplace', lastRun: '2026-02-15T06:00:00Z', frequency: 'Daily', status: 'active', views: 4567, creator: 'Rachel Green' },
    { id: 'ret-rp2', name: 'Inventory Turnover Analysis', type: 'scheduled', category: 'Merchandising', description: 'Weekly inventory health metrics with aging, turn and GMROI analysis', lastRun: '2026-02-14T09:00:00Z', frequency: 'Weekly', status: 'active', views: 2345, creator: 'Kim Park' },
    { id: 'ret-rp3', name: 'Customer Lifetime Value Report', type: 'export', category: 'Marketing', description: 'Monthly CLV segmentation with acquisition cost and retention metrics', lastRun: '2026-02-01T08:00:00Z', frequency: 'Monthly', status: 'active', views: 1890, creator: 'Amy Chen' },
  ],
  dashboards: [
    { id: 'ret-d1', name: 'Commerce Command Center', description: 'Real-time sales, conversion, AOV and channel performance', widgets: 14, lastUpdated: '2026-02-15T10:30:00Z', views: 6789, isPublic: true },
    { id: 'ret-d2', name: 'Customer 360 Dashboard', description: 'Customer behavior, lifetime value and engagement metrics', widgets: 10, lastUpdated: '2026-02-15T09:45:00Z', views: 4567, isPublic: false },
    { id: 'ret-d3', name: 'Supply Chain Visibility', description: 'Inventory levels, vendor fill rates and logistics performance', widgets: 12, lastUpdated: '2026-02-14T16:20:00Z', views: 3456, isPublic: true },
  ],
  initiatives: [
    { id: 'ret-i1', name: 'Unified Commerce Platform', description: 'Single commerce platform powering web, mobile, POS and marketplace with shared inventory', status: 'active', progress: 65, startDate: '2025-03-01', endDate: '2026-09-30', owner: 'Rachel Green', budget: 4500000, roi: 250 },
    { id: 'ret-i2', name: 'AI Personalization Engine', description: 'Real-time customer personalization across email, web, app and in-store experiences', status: 'active', progress: 75, startDate: '2025-06-01', endDate: '2026-06-30', owner: 'Amy Chen', budget: 1200000, roi: 380 },
    { id: 'ret-i3', name: 'Sustainable Supply Chain', description: 'Carbon-neutral logistics and sustainable sourcing certification for top 100 vendors', status: 'active', progress: 40, startDate: '2025-09-01', endDate: '2027-03-31', owner: 'Kim Park', budget: 800000, roi: 170 },
    { id: 'ret-i4', name: 'Store of the Future Pilot', description: 'Cashierless checkout, AR fitting rooms and IoT-enabled smart shelves in 5 pilot locations', status: 'planning', progress: 15, startDate: '2026-04-01', endDate: '2027-06-30', owner: 'Jason Lee', budget: 2000000, roi: 210 },
  ],
  comments: [
    { id: 'ret-c1', author: 'Rachel Green', content: 'Holiday season conversion rate hit 5.2%, up 18% YoY. Checkout optimization delivering strong results.', timestamp: new Date(Date.now() - 1800000).toISOString(), status: 'resolved', likes: 18 },
    { id: 'ret-c2', author: 'Amy Chen', content: 'Product recommendation engine A/B test showing 23% uplift in cross-sell revenue. Ready for full rollout.', timestamp: new Date(Date.now() - 3600000).toISOString(), status: 'open', likes: 11 },
    { id: 'ret-c3', author: 'Kim Park', content: 'Supply chain disruption alert: key vendor in Vietnam reporting 2-week delay on spring collection.', timestamp: new Date(Date.now() - 7200000).toISOString(), status: 'open', likes: 4 },
    { id: 'ret-c4', author: 'Jason Lee', content: 'Pilot store BOPIS adoption reached 42% of online orders. Expanding curbside to 50 more locations.', timestamp: new Date(Date.now() - 10800000).toISOString(), status: 'open', likes: 9 },
  ],
  approvals: [
    { id: 'ret-a1', processName: 'Omni-Channel Fulfillment v4.2', requester: 'Rachel Green', status: 'pending', requestDate: new Date().toISOString(), description: 'Added ship-from-store capability with intelligent order routing' },
    { id: 'ret-a2', processName: 'Demand Forecasting v3.5', requester: 'Kim Park', status: 'approved', requestDate: new Date(Date.now() - 86400000).toISOString(), description: 'Upgraded ML model with weather and social media sentiment factors' },
    { id: 'ret-a3', processName: 'Vendor Collaboration v1.8', requester: 'Amy Chen', status: 'pending', requestDate: new Date(Date.now() - 43200000).toISOString(), description: 'Added real-time inventory visibility sharing with top 20 vendors' },
  ],
  teamMembers: [
    { id: 'ret-t1', name: 'Rachel Green', role: 'VP of E-Commerce', status: 'online', lastActive: 'now' },
    { id: 'ret-t2', name: 'Tony Martinez', role: 'Customer Experience Dir', status: 'online', lastActive: '2 min ago' },
    { id: 'ret-t3', name: 'Amy Chen', role: 'Digital Marketing Lead', status: 'busy', lastActive: '8 min ago' },
    { id: 'ret-t4', name: 'Kim Park', role: 'Supply Chain Director', status: 'online', lastActive: '1 min ago' },
    { id: 'ret-t5', name: 'Jason Lee', role: 'Store Operations VP', status: 'offline', lastActive: '45 min ago' },
    { id: 'ret-t6', name: 'Samantha Wells', role: 'Merchandising Director', status: 'online', lastActive: 'now' },
  ],
  metrics: [
    { label: 'Active Processes', value: '38', change: '+15%', trend: 'up' },
    { label: 'Team Members', value: '28', change: '+6', trend: 'up' },
    { label: 'Conversion Rate', value: '5.2%', change: '+0.8%', trend: 'up' },
    { label: 'Customer NPS', value: '72', change: '+5', trend: 'up' },
  ],
  projects: [
    { id: 'ret-pr1', name: 'Unified Commerce - Phase 2', status: 'In Progress', progress: 65, team: ['Rachel', 'Amy', 'Jason'], lastUpdated: '1 hour ago' },
    { id: 'ret-pr2', name: 'AI Personalization Rollout', status: 'Review', progress: 88, team: ['Amy', 'Tony'], lastUpdated: '3 hours ago' },
    { id: 'ret-pr3', name: 'BOPIS Expansion', status: 'In Progress', progress: 52, team: ['Jason', 'Kim'], lastUpdated: '6 hours ago' },
  ],
};

const allIndustryData: Record<Industry, IndustryDemoData> = {
  manufacturing: manufacturingData,
  healthcare: healthcareData,
  construction: constructionData,
  financial: financialData,
  retail: retailData,
};

export const getIndustryData = (industry: Industry): IndustryDemoData => {
  return allIndustryData[industry];
};
