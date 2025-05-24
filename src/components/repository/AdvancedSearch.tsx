
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Calendar,
  User,
  Tag,
  Building,
  ChevronDown,
  X,
  Save,
  History
} from "lucide-react";

interface SearchFilter {
  id: string;
  type: "text" | "date" | "select" | "multiselect";
  label: string;
  value: any;
  options?: string[];
}

export const AdvancedSearch: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [savedSearches, setSavedSearches] = useState([
    { name: "My Recent Models", query: "owner:me modified:last-week" },
    { name: "Approval Processes", query: "type:process category:approval" },
    { name: "High Priority Updates", query: "priority:high status:draft" }
  ]);

  const [filters, setFilters] = useState<SearchFilter[]>([
    {
      id: "category",
      type: "select",
      label: "Category",
      value: "",
      options: ["Core Process", "Support Process", "Management Process", "Compliance Process"]
    },
    {
      id: "owner",
      type: "select",
      label: "Owner",
      value: "",
      options: ["Sarah Chen", "Mike Rodriguez", "Lisa Wang", "David Park", "All Users"]
    },
    {
      id: "status",
      type: "multiselect",
      label: "Status",
      value: [],
      options: ["Draft", "In Review", "Approved", "Published", "Archived"]
    },
    {
      id: "tags",
      type: "multiselect",
      label: "Tags",
      value: [],
      options: ["automation", "compliance", "customer-facing", "critical", "optimization"]
    },
    {
      id: "department",
      type: "select",
      label: "Department",
      value: "",
      options: ["Sales", "Finance", "Operations", "HR", "IT", "Legal"]
    },
    {
      id: "modified",
      type: "date",
      label: "Modified After",
      value: ""
    },
    {
      id: "created",
      type: "date",
      label: "Created After",
      value: ""
    }
  ]);

  const updateFilter = (id: string, value: any) => {
    setFilters(filters.map(filter => 
      filter.id === id ? { ...filter, value } : filter
    ));
  };

  const clearFilter = (id: string) => {
    updateFilter(id, filters.find(f => f.id === id)?.type === "multiselect" ? [] : "");
  };

  const clearAllFilters = () => {
    setFilters(filters.map(filter => ({
      ...filter,
      value: filter.type === "multiselect" ? [] : ""
    })));
    setSearchQuery("");
  };

  const getActiveFiltersCount = () => {
    return filters.filter(filter => {
      if (filter.type === "multiselect") {
        return filter.value.length > 0;
      }
      return filter.value !== "";
    }).length;
  };

  const saveCurrentSearch = () => {
    const searchName = prompt("Enter a name for this search:");
    if (searchName) {
      const newSearch = {
        name: searchName,
        query: buildQueryString()
      };
      setSavedSearches([...savedSearches, newSearch]);
    }
  };

  const buildQueryString = () => {
    let query = searchQuery;
    filters.forEach(filter => {
      if (filter.value && (filter.type !== "multiselect" || filter.value.length > 0)) {
        if (filter.type === "multiselect") {
          query += ` ${filter.id}:${filter.value.join(",")}`;
        } else {
          query += ` ${filter.id}:${filter.value}`;
        }
      }
    });
    return query.trim();
  };

  const renderFilterInput = (filter: SearchFilter) => {
    switch (filter.type) {
      case "text":
        return (
          <Input
            value={filter.value}
            onChange={(e) => updateFilter(filter.id, e.target.value)}
            placeholder={`Enter ${filter.label.toLowerCase()}...`}
          />
        );
      
      case "date":
        return (
          <Input
            type="date"
            value={filter.value}
            onChange={(e) => updateFilter(filter.id, e.target.value)}
          />
        );
      
      case "select":
        return (
          <select
            value={filter.value}
            onChange={(e) => updateFilter(filter.id, e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">All {filter.label}</option>
            {filter.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      
      case "multiselect":
        return (
          <div className="space-y-2">
            <select
              onChange={(e) => {
                const value = e.target.value;
                if (value && !filter.value.includes(value)) {
                  updateFilter(filter.id, [...filter.value, value]);
                }
                e.target.value = "";
              }}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Add {filter.label}...</option>
              {filter.options?.filter(option => !filter.value.includes(option)).map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {filter.value.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {filter.value.map((value: string) => (
                  <Badge key={value} variant="outline" className="text-xs">
                    {value}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-3 w-3 ml-1"
                      onClick={() => updateFilter(filter.id, filter.value.filter((v: string) => v !== value))}
                    >
                      <X className="h-2 w-2" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Repository
          </CardTitle>
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Advanced Search
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary" className="text-xs">
                {getActiveFiltersCount()}
              </Badge>
            )}
            <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Basic Search */}
        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search processes, models, and documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Saved Searches */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Quick searches:</span>
          {savedSearches.map((search, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs h-7"
              onClick={() => {
                setSearchQuery(search.query);
                // Parse and apply filters from query
              }}
            >
              <History className="h-3 w-3 mr-1" />
              {search.name}
            </Button>
          ))}
        </div>

        {/* Advanced Filters */}
        {isExpanded && (
          <div className="space-y-4 pt-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filters.map((filter) => (
                <div key={filter.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">{filter.label}</label>
                    {((filter.type === "multiselect" && filter.value.length > 0) || 
                      (filter.type !== "multiselect" && filter.value !== "")) && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4"
                        onClick={() => clearFilter(filter.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  {renderFilterInput(filter)}
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-2">
                <Button onClick={saveCurrentSearch} variant="outline" size="sm">
                  <Save className="h-3 w-3 mr-2" />
                  Save Search
                </Button>
                <Button onClick={clearAllFilters} variant="outline" size="sm">
                  <X className="h-3 w-3 mr-2" />
                  Clear All
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground">
                {getActiveFiltersCount()} filter{getActiveFiltersCount() !== 1 ? "s" : ""} applied
              </div>
            </div>
          </div>
        )}

        {/* Search Results Summary */}
        <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t">
          <span>Search results will appear below</span>
          <span>Use * for wildcards, quotes for exact phrases</span>
        </div>
      </CardContent>
    </Card>
  );
};
