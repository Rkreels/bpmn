
import React from "react";
import { GitMerge } from "lucide-react";

export const ModelViewer: React.FC = () => {
  return (
    <div className="border-t border-b h-[300px] flex items-center justify-center bg-muted/50">
      <div className="text-muted-foreground flex flex-col items-center">
        <GitMerge className="h-10 w-10 mb-2 opacity-70" />
        <p>[Process Model Viewer]</p>
      </div>
    </div>
  );
};
