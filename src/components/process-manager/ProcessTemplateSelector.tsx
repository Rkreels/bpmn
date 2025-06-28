
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { complexProcessTemplates, templateCategories, industryFilters, complexityLevels } from "@/data/processTemplates";
import { FileText, Download, Eye, Search, Tag, Clock, User, Building } from "lucide-react";

interface ProcessTemplateSelectorProps {
  onLoadTemplate: (templateId: string) => void;
  onPreviewTemplate?: (templateId: string) => void;
}

export const ProcessTemplateSelector: React.FC<ProcessTemplateSelectorProps> = ({
  onLoadTemplate,
  onPreviewTemplate
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [industryFilter, setIndustryFilter] = useState("All Industries");
  const [complexityFilter, setComplexityFilter] = useState("All Levels");

  // Filter templates based on search and filters
  const filteredTemplates = complexProcessTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.properties.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === "All Categories" || template.category === categoryFilter;
    const matchesIndustry = industryFilter === "All Industries" || template.properties.industry === industryFilter;
    const matchesComplexity = complexityFilter === "All Levels" || template.properties.complexity === complexityFilter;
    
    return matchesSearch && matchesCategory && matchesIndustry && matchesComplexity;
  });

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'complex': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Enterprise Process Templates</h3>
          <p className="text-muted-foreground">
            Choose from {complexProcessTemplates.length} professional process templates
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          {filteredTemplates.length} available
        </Badge>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates by name, description, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {templateCategories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={industryFilter} onValueChange={setIndustryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              {industryFilters.map(industry => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={complexityFilter} onValueChange={setComplexityFilter}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Complexity" />
            </SelectTrigger>
            <SelectContent>
              {complexityLevels.map(level => (
                <SelectItem key={level} value={level}>
                  {level === "All Levels" ? level : level.charAt(0).toUpperCase() + level.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg mb-2 line-clamp-2">{template.name}</CardTitle>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {template.category}
                    </Badge>
                    <Badge 
                      className={`text-xs ${getComplexityColor(template.properties.complexity)}`}
                    >
                      {template.properties.complexity}
                    </Badge>
                  </div>
                </div>
                <FileText className="h-6 w-6 text-blue-500 flex-shrink-0 ml-3" />
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                {template.description}
              </p>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-4">
                {/* Template Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Industry:</span>
                  </div>
                  <span className="font-medium text-right">{template.properties.industry}</span>
                  
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Elements:</span>
                  </div>
                  <span className="font-medium text-right">{template.elements.length}</span>
                  
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Author:</span>
                  </div>
                  <span className="font-medium text-right text-xs">{template.properties.author}</span>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Modified:</span>
                  </div>
                  <span className="font-medium text-right text-xs">
                    {formatDate(template.properties.modified)}
                  </span>
                </div>

                {/* Tags */}
                {template.properties.tags.length > 0 && (
                  <div className="border-t pt-3">
                    <div className="flex flex-wrap gap-1">
                      {template.properties.tags.slice(0, 4).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                      {template.properties.tags.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{template.properties.tags.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    onClick={() => onLoadTemplate(template.id)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Load Template
                  </Button>
                  {onPreviewTemplate && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onPreviewTemplate(template.id)}
                      className="border-blue-200 hover:bg-blue-50"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="font-semibold text-lg mb-2">No templates found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or filters to find more templates.
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm("");
              setCategoryFilter("All Categories");
              setIndustryFilter("All Industries");
              setComplexityFilter("All Levels");
            }}
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
};
