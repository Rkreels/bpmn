import React from 'react';
import { useIndustry, industries } from '@/contexts/IndustryContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const IndustrySelector: React.FC = () => {
  const { currentIndustry, setCurrentIndustry } = useIndustry();

  return (
    <Select value={currentIndustry} onValueChange={(v: any) => setCurrentIndustry(v)}>
      <SelectTrigger className="w-full h-9 text-xs border-border bg-background">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {industries.map((ind) => (
          <SelectItem key={ind.id} value={ind.id} className="text-xs">
            <span className="flex items-center gap-2">
              <span>{ind.icon}</span>
              <span>{ind.name}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
