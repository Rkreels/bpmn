
import React from "react";
import { Button } from "@/components/ui/button";
import { Bell, Search, User, Menu } from "lucide-react";
import { useVoice } from "@/contexts/VoiceContext";
import { useToast } from "@/hooks/use-toast";

interface HeaderProps {
  pageTitle: string;
  showPageTitle?: boolean;
}

export function Header({ pageTitle, showPageTitle = true }: HeaderProps) {
  const { speakText, isVoiceEnabled } = useVoice();
  const { toast } = useToast();

  const handleNotifications = () => {
    toast({
      title: "Notifications",
      description: "Opening notification center..."
    });
    if (isVoiceEnabled) {
      speakText("Opening notifications panel. You have 3 new updates.");
    }
  };

  const handleSearch = () => {
    toast({
      title: "Search",
      description: "Opening global search..."
    });
    if (isVoiceEnabled) {
      speakText("Opening global search. You can search across all processes, documents, and data.");
    }
  };

  const handleProfile = () => {
    toast({
      title: "Profile",
      description: "Opening user profile..."
    });
    if (isVoiceEnabled) {
      speakText("Opening user profile and account settings.");
    }
  };

  return (
    <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left side - Page title */}
        <div className="flex items-center gap-4">
          {showPageTitle && (
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                {pageTitle}
              </h1>
            </div>
          )}
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSearch}
            className="hover:bg-muted"
          >
            <Search className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNotifications}
            className="hover:bg-muted relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
              3
            </span>
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleProfile}
            className="hover:bg-muted"
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
