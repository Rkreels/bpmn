// Central data management system using localStorage
export interface StorageEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export class LocalStorageService {
  private static getKey(collection: string): string {
    return `processflow_${collection}`;
  }

  static getAll<T extends StorageEntity>(collection: string): T[] {
    try {
      const data = localStorage.getItem(this.getKey(collection));
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Error reading ${collection}:`, error);
      return [];
    }
  }

  static getById<T extends StorageEntity>(collection: string, id: string): T | null {
    const items = this.getAll<T>(collection);
    return items.find(item => item.id === id) || null;
  }

  static create<T extends StorageEntity>(collection: string, data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): T {
    const items = this.getAll<T>(collection);
    const newItem = {
      ...data,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as T;
    
    items.push(newItem);
    this.saveAll(collection, items);
    return newItem;
  }

  static update<T extends StorageEntity>(collection: string, id: string, updates: Partial<T>): T | null {
    const items = this.getAll<T>(collection);
    const index = items.findIndex(item => item.id === id);
    
    if (index === -1) return null;
    
    const updatedItem = {
      ...items[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    items[index] = updatedItem;
    this.saveAll(collection, items);
    return updatedItem;
  }

  static delete(collection: string, id: string): boolean {
    const items = this.getAll(collection);
    const filteredItems = items.filter(item => item.id !== id);
    
    if (filteredItems.length === items.length) return false;
    
    this.saveAll(collection, filteredItems);
    return true;
  }

  static deleteAll(collection: string): void {
    localStorage.removeItem(this.getKey(collection));
  }

  static search<T extends StorageEntity>(collection: string, query: string, fields: (keyof T)[]): T[] {
    const items = this.getAll<T>(collection);
    const lowercaseQuery = query.toLowerCase();
    
    return items.filter(item =>
      fields.some(field => {
        const value = item[field];
        return typeof value === 'string' && value.toLowerCase().includes(lowercaseQuery);
      })
    );
  }

  static filter<T extends StorageEntity>(collection: string, predicate: (item: T) => boolean): T[] {
    const items = this.getAll<T>(collection);
    return items.filter(predicate);
  }

  static saveAll<T extends StorageEntity>(collection: string, items: T[]): void {
    try {
      localStorage.setItem(this.getKey(collection), JSON.stringify(items));
    } catch (error) {
      console.error(`Error saving ${collection}:`, error);
    }
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
  properties: {
    estimatedDuration: string;
    complexity: string;
    automation: string;
    [key: string]: any; // Allow additional properties
  };
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
  permissions: {
    canCreate: boolean;
    canEdit: boolean;
    canDelete: boolean;
    canApprove: boolean;
    canManageUsers: boolean;
  };
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
  reviews: Array<{
    userId: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}

export interface Journey extends StorageEntity {
  name: string;
  description: string;
  persona: string;
  stages: Array<{
    id: string;
    name: string;
    description: string;
    touchpoints: Array<{
      id: string;
      name: string;
      channel: string;
      emotions: number[];
      actions: string[];
    }>;
    emotions: number[];
    painPoints: string[];
    opportunities: string[];
  }>;
  metrics: {
    satisfaction: number;
    effort: number;
    nps: number;
  };
}

export interface ProcessMiningProject extends StorageEntity {
  name: string;
  description: string;
  eventLogFile: string;
  status: 'uploaded' | 'processing' | 'completed' | 'error';
  algorithm: 'alpha' | 'inductive' | 'heuristic' | 'genetic' | 'fuzzy';
  results: {
    variants: any[];
    conformance: any;
    performance: any;
    bottlenecks: string[];
  };
  settings: {
    noiseThreshold: number;
    activityThreshold: number;
    caseSensitive: boolean;
  };
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
  attachments: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
  }>;
  replies: Array<{
    id: string;
    author: string;
    content: string;
    timestamp: string;
  }>;
}

export interface Report extends StorageEntity {
  name: string;
  description: string;
  type: 'process_performance' | 'user_activity' | 'compliance' | 'custom';
  filters: Record<string, any>;
  data: any;
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    recipients: string[];
    lastRun?: string;
    nextRun?: string;
  };
  visualizations: Array<{
    type: 'chart' | 'table' | 'metric';
    config: any;
  }>;
}

// Data initialization with sample data
export class DataInitializationService {
  static initializeDefaultData() {
    // Initialize users if none exist
    if (LocalStorageService.getAll('users').length === 0) {
      this.createDefaultUsers();
    }

    // Initialize processes if none exist
    if (LocalStorageService.getAll('processes').length === 0) {
      this.createDefaultProcesses();
    }

    // Initialize repository items if none exist
    if (LocalStorageService.getAll('repository').length === 0) {
      this.createDefaultRepositoryItems();
    }

    // Initialize journeys if none exist
    if (LocalStorageService.getAll('journeys').length === 0) {
      this.createDefaultJourneys();
    }
  }

  private static createDefaultUsers() {
    const defaultUsers: Omit<User, 'id' | 'createdAt' | 'updatedAt'>[] = [
      {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@company.com',
        role: 'admin',
        department: 'IT',
        status: 'active',
        lastLogin: new Date().toISOString(),
        permissions: {
          canCreate: true,
          canEdit: true,
          canDelete: true,
          canApprove: true,
          canManageUsers: true
        }
      },
      {
        name: 'Mike Chen',
        email: 'mike.chen@company.com',
        role: 'manager',
        department: 'Operations',
        status: 'active',
        lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        permissions: {
          canCreate: true,
          canEdit: true,
          canDelete: false,
          canApprove: true,
          canManageUsers: false
        }
      },
      {
        name: 'Lisa Wang',
        email: 'lisa.wang@company.com',
        role: 'analyst',
        department: 'Finance',
        status: 'active',
        lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        permissions: {
          canCreate: true,
          canEdit: true,
          canDelete: false,
          canApprove: false,
          canManageUsers: false
        }
      }
    ];

    defaultUsers.forEach(user => {
      LocalStorageService.create<User>('users', user);
    });
  }

  private static createDefaultProcesses() {
    const defaultProcesses: Omit<ProcessModel, 'id' | 'createdAt' | 'updatedAt'>[] = [
      {
        name: 'Customer Onboarding Process',
        description: 'Complete customer onboarding workflow from initial contact to activation',
        category: 'Customer Management',
        status: 'published',
        version: '2.1',
        owner: 'sarah.johnson@company.com',
        collaborators: ['mike.chen@company.com', 'lisa.wang@company.com'],
        elements: [],
        connections: [],
        properties: {
          estimatedDuration: '3-5 days',
          complexity: 'medium',
          automation: 'partial'
        },
        tags: ['customer', 'onboarding', 'sales']
      },
      {
        name: 'Invoice Processing Workflow',
        description: 'Automated invoice processing with approval workflows',
        category: 'Finance',
        status: 'approved',
        version: '1.8',
        owner: 'lisa.wang@company.com',
        collaborators: ['mike.chen@company.com'],
        elements: [],
        connections: [],
        properties: {
          estimatedDuration: '2-4 hours',
          complexity: 'low',
          automation: 'high'
        },
        tags: ['finance', 'automation', 'approval']
      }
    ];

    defaultProcesses.forEach(process => {
      LocalStorageService.create<ProcessModel>('processes', process);
    });
  }

  private static createDefaultRepositoryItems() {
    const defaultItems: Omit<Repository, 'id' | 'createdAt' | 'updatedAt'>[] = [
      {
        name: 'BPMN Best Practices Guide',
        type: 'document',
        description: 'Comprehensive guide for BPMN modeling best practices',
        category: 'Documentation',
        tags: ['bpmn', 'guide', 'best-practices'],
        owner: 'sarah.johnson@company.com',
        visibility: 'public',
        metadata: {
          fileType: 'PDF',
          size: '2.5MB',
          language: 'English'
        },
        content: {},
        version: '1.0',
        downloadCount: 245,
        rating: 4.7,
        reviews: [
          {
            userId: 'mike.chen@company.com',
            rating: 5,
            comment: 'Excellent resource for beginners',
            date: new Date().toISOString()
          }
        ]
      },
      {
        name: 'Customer Service Process Template',
        type: 'template',
        description: 'Standard template for customer service processes',
        category: 'Templates',
        tags: ['template', 'customer-service', 'standard'],
        owner: 'mike.chen@company.com',
        visibility: 'team',
        metadata: {
          complexity: 'medium',
          industry: 'general'
        },
        content: {},
        version: '2.0',
        downloadCount: 156,
        rating: 4.3,
        reviews: []
      }
    ];

    defaultItems.forEach(item => {
      LocalStorageService.create<Repository>('repository', item);
    });
  }

  private static createDefaultJourneys() {
    const defaultJourneys: Omit<Journey, 'id' | 'createdAt' | 'updatedAt'>[] = [
      {
        name: 'New Customer Journey',
        description: 'Journey of a new customer from awareness to advocacy',
        persona: 'Tech-Savvy Professional',
        stages: [
          {
            id: 'awareness',
            name: 'Awareness',
            description: 'Customer becomes aware of the product',
            touchpoints: [
              {
                id: 'web-search',
                name: 'Web Search',
                channel: 'Digital',
                emotions: [0.1, 0.2],
                actions: ['Search', 'Research', 'Compare']
              }
            ],
            emotions: [0.1],
            painPoints: ['Information overload'],
            opportunities: ['Clear value proposition']
          },
          {
            id: 'consideration',
            name: 'Consideration',
            description: 'Customer evaluates the product',
            touchpoints: [
              {
                id: 'website',
                name: 'Company Website',
                channel: 'Digital',
                emotions: [0.0, 0.3],
                actions: ['Browse', 'Download', 'Contact']
              }
            ],
            emotions: [0.2],
            painPoints: ['Complex pricing'],
            opportunities: ['Product demo']
          }
        ],
        metrics: {
          satisfaction: 7.8,
          effort: 3.2,
          nps: 42
        }
      }
    ];

    defaultJourneys.forEach(journey => {
      LocalStorageService.create<Journey>('journeys', journey);
    });
  }
}

// Initialize data on app load
if (typeof window !== 'undefined') {
  DataInitializationService.initializeDefaultData();
}