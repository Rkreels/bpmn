import React, { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Search, 
  Filter, 
  X, 
  Calendar as CalendarIcon,
  Download,
  Save,
  History
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SearchFilter {
  field: string;
  operator: string;
  value: string | string[] | Date;
  type: 'text' | 'select' | 'multiselect' | 'date' | 'number';
}

interface SavedSearch {
  id: string;
  name: string;
  query: string;
  filters: SearchFilter[];
  savedAt: Date;
}

interface SearchResult {
  id: string;
  title: string;
  type: string;
  description: string;
  lastModified: Date;
  tags: string[];
  score: number;
}

export const AdvancedSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilter[]>([]);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();

  // Mock search results for demonstration
  const mockResults: SearchResult[] = [
    {
      id: '1',
      title: 'Customer Onboarding Process',
      type: 'BPMN Process',
      description: 'End-to-end customer onboarding workflow with KYC verification',
      lastModified: new Date(),
      tags: ['customer', 'onboarding', 'kyc', 'verification'],
      score: 95.2
    },
    {
      id: '2',
      title: 'Order Processing Workflow',
      type: 'BPMN Process',
      description: 'Automated order processing from receipt to fulfillment',
      lastModified: new Date(Date.now() - 86400000),
      tags: ['order', 'processing', 'automation', 'fulfillment'],
      score: 88.7
    },
    {
      id: '3',
      title: 'Employee Journey Map',
      type: 'Journey Map',
      description: 'Complete employee experience from hiring to offboarding',
      lastModified: new Date(Date.now() - 172800000),
      tags: ['employee', 'hr', 'journey', 'experience'],
      score: 82.1
    }
  ];

  const filterOptions = {
    type: ['BPMN Process', 'Journey Map', 'Decision Model', 'Report', 'Document'],
    status: ['Draft', 'Active', 'Archived', 'Under Review'],
    department: ['Finance', 'HR', 'Operations', 'IT', 'Marketing'],
    complexity: ['Low', 'Medium', 'High', 'Very High']
  };

  const performSearch = useCallback(async () => {
    if (!query.trim() && filters.length === 0) return;

    setLoading(true);
    try {
      // Simulate API search
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Filter mock results based on query and filters
      let filteredResults = mockResults;
      
      if (query.trim()) {
        filteredResults = filteredResults.filter(result =>
          result.title.toLowerCase().includes(query.toLowerCase()) ||
          result.description.toLowerCase().includes(query.toLowerCase()) ||
          result.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );
      }

      // Apply filters
      filters.forEach(filter => {
        if (filter.field === 'type' && filter.value) {
          filteredResults = filteredResults.filter(result => 
            result.type === filter.value
          );
        }
        // Add more filter logic as needed
      });

      setResults(filteredResults);
    } catch (error) {
      toast({
        title: "Search Error",
        description: "Failed to perform search",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [query, filters, toast]);

  const addFilter = () => {
    const newFilter: SearchFilter = {
      field: 'type',
      operator: 'equals',
      value: '',
      type: 'select'
    };
    setFilters([...filters, newFilter]);
  };

  const removeFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const updateFilter = (index: number, updates: Partial<SearchFilter>) => {
    const updatedFilters = [...filters];
    updatedFilters[index] = { ...updatedFilters[index], ...updates };
    setFilters(updatedFilters);
  };

  const saveSearch = () => {
    if (!query.trim()) {
      toast({
        title: "Cannot Save",
        description: "Please enter a search query",
        variant: "destructive"
      });
      return;
    }

    const savedSearch: SavedSearch = {
      id: `search_${Date.now()}`,
      name: query,
      query,
      filters,
      savedAt: new Date()
    };

    setSavedSearches([...savedSearches, savedSearch]);
    toast({
      title: "Search Saved",
      description: `"${query}" has been saved to your searches`
    });
  };

  const loadSavedSearch = (search: SavedSearch) => {
    setQuery(search.query);
    setFilters(search.filters);
    performSearch();
  };

  const exportResults = () => {
    const exportData = {
      query,
      filters,
      results,
      exportedAt: new Date().toISOString(),
      totalResults: results.length
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `search-results-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Results Exported",
      description: "Search results have been downloaded"
    });
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Search</CardTitle>
          <CardDescription>
            Find processes, documents, and resources with powerful search and filtering
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Main Search Bar */}
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search processes, documents, resources..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && performSearch()}
                className="pl-10"
              />
            </div>
            <Button onClick={performSearch} disabled={loading}>
              <Search className="h-4 w-4 mr-2" />
              {loading ? 'Searching...' : 'Search'}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="border rounded-lg p-4 space-y-4 bg-muted/20">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Search Filters</h4>
                <Button variant="outline" size="sm" onClick={addFilter}>
                  Add Filter
                </Button>
              </div>
              
              {filters.map((filter, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Select
                    value={filter.field}
                    onValueChange={(value) => updateFilter(index, { field: value })}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="type">Type</SelectItem>
                      <SelectItem value="status">Status</SelectItem>
                      <SelectItem value="department">Department</SelectItem>
                      <SelectItem value="tags">Tags</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={filter.operator}
                    onValueChange={(value) => updateFilter(index, { operator: value })}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="equals">Equals</SelectItem>
                      <SelectItem value="contains">Contains</SelectItem>
                      <SelectItem value="not_equals">Not Equals</SelectItem>
                    </SelectContent>
                  </Select>

                  {filter.field === 'type' && (
                    <Select
                      value={filter.value as string}
                      onValueChange={(value) => updateFilter(index, { value })}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {filterOptions.type.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  {filter.field !== 'type' && (
                    <Input
                      placeholder="Enter value"
                      value={filter.value as string}
                      onChange={(e) => updateFilter(index, { value: e.target.value })}
                      className="w-40"
                    />
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFilter(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={saveSearch}>
                <Save className="h-4 w-4 mr-2" />
                Save Search
              </Button>
              {results.length > 0 && (
                <Button variant="outline" size="sm" onClick={exportResults}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Results
                </Button>
              )}
            </div>
            {results.length > 0 && (
              <div className="text-sm text-muted-foreground">
                {results.length} result{results.length !== 1 ? 's' : ''} found
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Saved Searches */}
      {savedSearches.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <History className="h-5 w-5 mr-2" />
              Saved Searches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {savedSearches.map((search) => (
                <Button
                  key={search.id}
                  variant="outline"
                  size="sm"
                  onClick={() => loadSavedSearch(search)}
                  className="h-auto p-2 flex-col items-start"
                >
                  <div className="font-medium">{search.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {search.savedAt.toLocaleDateString()}
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Search Results</h3>
          {results.map((result) => (
            <Card key={result.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-lg">{result.title}</h4>
                      <Badge variant="outline">{result.type}</Badge>
                      <Badge variant="secondary" className="ml-auto">
                        {result.score.toFixed(1)}% match
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{result.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Modified: {result.lastModified.toLocaleDateString()}</span>
                      <div className="flex flex-wrap gap-1">
                        {result.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && results.length === 0 && query && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No results found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};