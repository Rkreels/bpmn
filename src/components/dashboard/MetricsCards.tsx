
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Metric {
  label: string;
  value: string;
  change: string;
  trend: string;
  icon: React.ComponentType<any>;
  link: string;
  color: string;
}

interface MetricsCardsProps {
  metrics: Metric[];
  onMetricClick: (link: string, label: string) => void;
}

export const MetricsCards: React.FC<MetricsCardsProps> = ({
  metrics,
  onMetricClick
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => {
        const IconComponent = metric.icon;
        return (
          <Card key={index} className="hover:shadow-md transition-all duration-200 cursor-pointer">
            <Link to={metric.link} onClick={() => onMetricClick(metric.link, metric.label)}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <IconComponent className={`h-5 w-5 ${metric.color}`} />
                      <p className="text-xs md:text-sm text-muted-foreground">{metric.label}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-xl md:text-2xl font-bold">{metric.value}</p>
                      <Badge variant="outline" className="text-xs">
                        {metric.change}
                      </Badge>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Link>
          </Card>
        );
      })}
    </div>
  );
};
