
import React from "react";
import { Badge } from "@/components/ui/badge";

interface ItemStatusProps {
  status?: string;
}

export function ItemStatus({ status }: ItemStatusProps) {
  if (!status) return null;
  
  const statusColors = {
    "Draft": "bg-muted text-muted-foreground",
    "In Review": "bg-enterprise-blue-100 text-enterprise-blue-800",
    "Approved": "bg-status-success/10 text-status-success",
    "Published": "bg-status-success/10 text-status-success",
  };
  
  return (
    <Badge className={statusColors[status as keyof typeof statusColors]}>
      {status}
    </Badge>
  );
}
