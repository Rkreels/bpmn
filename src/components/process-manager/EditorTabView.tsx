
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export const EditorTabView: React.FC = () => {
  return (
    <TabsList>
      <TabsTrigger value="editor">Editor</TabsTrigger>
      <TabsTrigger value="properties">Properties</TabsTrigger>
      <TabsTrigger value="repository">Repository</TabsTrigger>
    </TabsList>
  );
};
