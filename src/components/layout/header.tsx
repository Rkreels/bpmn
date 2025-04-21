
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
  pageTitle: string;
}

export function Header({ className, pageTitle }: HeaderProps) {
  return (
    <header className={cn(
      "h-14 border-b flex items-center justify-between px-4 bg-background",
      className
    )}>
      <h1 className="text-xl font-semibold truncate">{pageTitle}</h1>
      
      <div className="flex items-center gap-4">
        <div className="relative max-w-md w-72 hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search processes, models..."
            className="pl-8 bg-background"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1.5 w-2 h-2 bg-status-danger rounded-full" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              <NotificationItem
                title="Process approval requested"
                description="Procurement process v2.0 needs your approval"
                time="10m ago"
                unread
              />
              <NotificationItem
                title="Comment on 'Customer Onboarding'"
                description="Lisa added a comment: 'We need to clarify the approval step'"
                time="1h ago"
                unread
              />
              <NotificationItem
                title="Process modeling completed"
                description="HR Hiring Process modeling has been completed"
                time="3h ago"
              />
              <NotificationItem
                title="New team member added"
                description="Robert has been added to your workspace"
                time="1d ago"
              />
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer justify-center text-center font-medium text-primary">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

interface NotificationItemProps {
  title: string;
  description: string;
  time: string;
  unread?: boolean;
}

function NotificationItem({ title, description, time, unread }: NotificationItemProps) {
  return (
    <DropdownMenuItem className="flex flex-col items-start p-3 focus:bg-accent gap-1 cursor-pointer">
      <div className="flex items-center gap-2 w-full">
        <span className={cn(
          "font-medium flex-1", 
          unread ? "text-foreground" : "text-muted-foreground"
        )}>
          {title}
        </span>
        <span className="text-xs text-muted-foreground flex-shrink-0">
          {time}
        </span>
      </div>
      <span className="text-sm text-muted-foreground">
        {description}
      </span>
      {unread && (
        <span className="w-2 h-2 bg-primary rounded-full absolute right-3 top-4" />
      )}
    </DropdownMenuItem>
  );
}
