
export type RepositoryItemType = {
  name: string;
  type: "folder" | "bpmn" | "journey" | "dmn" | "document";
  owner: string;
  lastModified: string;
  version?: string;
  status?: "Draft" | "In Review" | "Approved" | "Published";
};
