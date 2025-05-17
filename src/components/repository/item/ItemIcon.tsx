
import React from "react";
import { Folder, GitMerge, Users, FileText } from "lucide-react";

interface ItemIconProps {
  type: string;
  className?: string;
}

export function ItemIcon({ type, className = "h-5 w-5" }: ItemIconProps) {
  switch (type) {
    case "folder":
      return <Folder className={`${className} text-enterprise-blue-600`} />;
    case "bpmn":
      return <GitMerge className={`${className} text-enterprise-blue-600`} />;
    case "journey":
      return <Users className={`${className} text-enterprise-blue-600`} />;
    case "dmn":
      return <FileText className={`${className} text-status-warning`} />;
    case "document":
      return <FileText className={`${className} text-enterprise-gray-600`} />;
    default:
      return <FileText className={className} />;
  }
}
