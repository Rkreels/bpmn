
import { useRef } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RepositoryHeader } from "@/components/repository/RepositoryHeader";
import { RepositoryToolbar } from "@/components/repository/RepositoryToolbar";
import { RepositoryContent } from "@/components/repository/RepositoryContent";
import { RepositoryDialog } from "@/components/repository/RepositoryDialog";
import { RepositoryItemDetails } from "@/components/repository/RepositoryItemDetails";
import { useRepository } from "@/hooks/useRepository";

export default function Repository() {
  const {
    viewMode,
    setViewMode,
    searchTerm,
    filteredItems,
    selectedItem,
    setSelectedItem,
    dialogState,
    fileInputRef,
    handleSearch,
    handleUpload,
    handleFileChange,
    handleNewItem,
    handleCreateItem,
    handleSort,
    handleSettingsClick,
    handleViewItem,
    handleEditItem,
    handleRenameItem,
    handleShareItem,
    handleDownloadItem,
    handleRenameAction,
    handleSettingsAction,
    closeDialog
  } = useRepository();

  return (
    <MainLayout pageTitle="Repository">
      <Card>
        <CardHeader className="pb-3">
          <RepositoryHeader
            onNewItem={handleNewItem}
            onUpload={handleUpload}
            onSettings={handleSettingsClick}
          />
        </CardHeader>
        
        <CardContent>
          <RepositoryToolbar
            searchTerm={searchTerm}
            onSearch={handleSearch}
            onSort={handleSort}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
          
          <RepositoryContent
            items={filteredItems}
            viewMode={viewMode}
            onViewItem={handleViewItem}
            onEditItem={handleEditItem}
            onRenameItem={handleRenameItem}
            onShareItem={handleShareItem}
            onDownloadItem={handleDownloadItem}
          />
          
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </CardContent>
      </Card>
      
      {/* Dialogs */}
      <RepositoryDialog
        open={dialogState.open && dialogState.type === "new-bpmn"}
        title="Create New BPMN Process"
        description="Create a new business process model and notation diagram."
        actionLabel="Create"
        showInput={true}
        inputLabel="Process Name"
        inputPlaceholder="Enter process name..."
        onClose={closeDialog}
        onAction={handleCreateItem}
      />
      
      <RepositoryDialog
        open={dialogState.open && dialogState.type === "new-journey"}
        title="Create New Journey Map"
        description="Create a new customer journey map."
        actionLabel="Create"
        showInput={true}
        inputLabel="Journey Name"
        inputPlaceholder="Enter journey name..."
        onClose={closeDialog}
        onAction={handleCreateItem}
      />
      
      <RepositoryDialog
        open={dialogState.open && dialogState.type === "new-dmn"}
        title="Create New Decision Model"
        description="Create a new decision model and notation diagram."
        actionLabel="Create"
        showInput={true}
        inputLabel="Decision Model Name"
        inputPlaceholder="Enter decision model name..."
        onClose={closeDialog}
        onAction={handleCreateItem}
      />
      
      <RepositoryDialog
        open={dialogState.open && dialogState.type === "new-folder"}
        title="Create New Folder"
        description="Create a new folder to organize your process artifacts."
        actionLabel="Create"
        showInput={true}
        inputLabel="Folder Name"
        inputPlaceholder="Enter folder name..."
        onClose={closeDialog}
        onAction={handleCreateItem}
      />
      
      <RepositoryDialog
        open={dialogState.open && dialogState.type === "rename"}
        title="Rename Item"
        description={`Rename ${selectedItem?.name || "item"}.`}
        actionLabel="Rename"
        showInput={true}
        inputLabel="New Name"
        inputPlaceholder="Enter new name..."
        onClose={closeDialog}
        onAction={handleRenameAction}
      />
      
      <RepositoryDialog
        open={dialogState.open && dialogState.type === "settings"}
        title="Repository Settings"
        description="Configure repository settings and permissions."
        actionLabel="Save"
        onClose={closeDialog}
        onAction={handleSettingsAction}
      />
      
      {selectedItem && (
        <RepositoryItemDetails
          open={!!selectedItem}
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onEdit={() => handleEditItem(selectedItem)}
          onShare={() => handleShareItem(selectedItem)}
          onDownload={() => handleDownloadItem(selectedItem)}
        />
      )}
    </MainLayout>
  );
}
