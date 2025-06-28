
export interface RepositoryItemType {
  id: string;
  name: string;
  description: string;
  type: 'process' | 'template' | 'framework';
  category: string;
  version: string;
  status: 'active' | 'draft' | 'archived';
  owner: string;
  size: string;
  lastModified: string;
  tags: string[];
}
