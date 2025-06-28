
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  MousePointer, 
  Move, 
  GitBranch, 
  Undo, 
  Redo, 
  Edit, 
  Copy, 
  Trash2 
} from 'lucide-react';

interface EditorToolbarProps {
  selectedTool: string;
  onSelectTool: (tool: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onEditElement: () => void;
  onDuplicateElement: () => void;
  onDeleteElement: () => void;
  hasSelectedElement: boolean;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  selectedTool,
  onSelectTool,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onEditElement,
  onDuplicateElement,
  onDeleteElement,
  hasSelectedElement
}) => {
  return (
    <div className="flex items-center gap-2 p-2 border-b bg-background">
      <div className="flex items-center gap-1">
        <Button
          variant={selectedTool === 'select' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSelectTool('select')}
        >
          <MousePointer className="h-4 w-4" />
        </Button>
        <Button
          variant={selectedTool === 'move' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSelectTool('move')}
        >
          <Move className="h-4 w-4" />
        </Button>
        <Button
          variant={selectedTool === 'connector' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSelectTool('connector')}
        >
          <GitBranch className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6" />

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={onUndo}
          disabled={!canUndo}
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onRedo}
          disabled={!canRedo}
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      {hasSelectedElement && (
        <>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={onEditElement}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onDuplicateElement}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onDeleteElement}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
