
export interface RepositoryItemType {
  id: string;
  name: string;
  type: "process" | "model" | "template" | "framework" | "document";
  description: string;
  owner: string;
  lastModified: string;
  category: string;
  tags: string[];
  version: string;
  status: "active" | "draft" | "archived";
  size: string;
}
