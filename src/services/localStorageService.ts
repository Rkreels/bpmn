// In-memory data store - no localStorage usage
const memoryStore: Record<string, any[]> = {};

export interface StorageEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export class LocalStorageService {
  static getAll<T extends StorageEntity>(collection: string): T[] {
    return (memoryStore[collection] || []) as T[];
  }

  static getById<T extends StorageEntity>(collection: string, id: string): T | null {
    const items = this.getAll<T>(collection);
    return items.find(item => item.id === id) || null;
  }

  static create<T extends StorageEntity>(collection: string, data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): T {
    if (!memoryStore[collection]) memoryStore[collection] = [];
    const newItem = {
      ...data,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as T;
    memoryStore[collection].push(newItem);
    return newItem;
  }

  static update<T extends StorageEntity>(collection: string, id: string, updates: Partial<T>): T | null {
    const items = this.getAll<T>(collection);
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return null;
    const updatedItem = { ...items[index], ...updates, updatedAt: new Date().toISOString() };
    items[index] = updatedItem;
    memoryStore[collection] = items;
    return updatedItem;
  }

  static delete(collection: string, id: string): boolean {
    const items = this.getAll(collection);
    const filtered = items.filter(item => item.id !== id);
    if (filtered.length === items.length) return false;
    memoryStore[collection] = filtered;
    return true;
  }

  static deleteAll(collection: string): void {
    delete memoryStore[collection];
  }

  static search<T extends StorageEntity>(collection: string, query: string, fields: (keyof T)[]): T[] {
    const items = this.getAll<T>(collection);
    const lq = query.toLowerCase();
    return items.filter(item => fields.some(field => { const v = item[field]; return typeof v === 'string' && v.toLowerCase().includes(lq); }));
  }

  static filter<T extends StorageEntity>(collection: string, predicate: (item: T) => boolean): T[] {
    return this.getAll<T>(collection).filter(predicate);
  }

  static saveAll<T extends StorageEntity>(collection: string, items: T[]): void {
    memoryStore[collection] = items;
  }

  private static generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

// Data models
export interface ProcessModel extends StorageEntity {
  name: string;
  description: string;
  category: string;
  status: 'draft' | 'review' | 'approved' | 'published' | 'archived';
  version: string;
  owner: string;
  collaborators: string[];
  elements: any[];
  connections: any[];
  properties: { estimatedDuration: string; complexity: string; automation: string; [key: string]: any; };
  tags: string[];
}

export interface User extends StorageEntity {
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'analyst' | 'viewer';
  department: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin?: string;
  permissions: { canCreate: boolean; canEdit: boolean; canDelete: boolean; canApprove: boolean; canManageUsers: boolean; };
}

export interface Repository extends StorageEntity {
  name: string;
  type: 'process' | 'template' | 'document' | 'model';
  description: string;
  category: string;
  tags: string[];
  owner: string;
  visibility: 'public' | 'private' | 'team';
  metadata: Record<string, any>;
  content: any;
  version: string;
  downloadCount: number;
  rating: number;
  reviews: Array<{ userId: string; rating: number; comment: string; date: string; }>;
}

export interface Journey extends StorageEntity {
  name: string;
  description: string;
  persona: string;
  stages: Array<{ id: string; name: string; description: string; touchpoints: Array<{ id: string; name: string; channel: string; emotions: number[]; actions: string[]; }>; emotions: number[]; painPoints: string[]; opportunities: string[]; }>;
  metrics: { satisfaction: number; effort: number; nps: number; };
}

export interface ProcessMiningProject extends StorageEntity {
  name: string;
  description: string;
  eventLogFile: string;
  status: 'uploaded' | 'processing' | 'completed' | 'error';
  algorithm: 'alpha' | 'inductive' | 'heuristic' | 'genetic' | 'fuzzy';
  results: { variants: any[]; conformance: any; performance: any; bottlenecks: string[]; };
  settings: { noiseThreshold: number; activityThreshold: number; caseSensitive: boolean; };
}

export interface Collaboration extends StorageEntity {
  processId: string;
  type: 'comment' | 'suggestion' | 'approval' | 'change_request';
  author: string;
  content: string;
  elementId?: string;
  status: 'open' | 'resolved' | 'pending' | 'rejected';
  assignees: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
  dueDate?: string;
  attachments: Array<{ id: string; name: string; url: string; type: string; }>;
  replies: Array<{ id: string; author: string; content: string; timestamp: string; }>;
}

export interface Report extends StorageEntity {
  name: string;
  description: string;
  type: 'process_performance' | 'user_activity' | 'compliance' | 'custom';
  filters: Record<string, any>;
  data: any;
  schedule?: { frequency: 'daily' | 'weekly' | 'monthly'; recipients: string[]; lastRun?: string; nextRun?: string; };
  visualizations: Array<{ type: 'chart' | 'table' | 'metric'; config: any; }>;
}
