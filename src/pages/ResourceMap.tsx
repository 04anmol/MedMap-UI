import { useState } from "react";
import { MapPin, Filter, Navigation, Bed, Wind, Droplets, Ambulance } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const ResourceMap = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [isLocating, setIsLocating] = useState(false);

  const filters = [
    { id: "all", label: "All", icon: MapPin },
    { id: "icu", label: "ICU", icon: Bed },
    { id: "oxygen", label: "Oxygen", icon: Wind },
    { id: "blood", label: "Blood", icon: Droplets },
    { id: "ambulance", label: "Ambulance", icon: Ambulance },
  ];

  const resources = [
    {
      id: 1,
      name: "City General Hospital",
      type: "hospital",
      distance: "0.8 km",
      availability: { icu: 5, oxygen: 12, blood: 8 },
      position: { top: "35%", left: "45%" },
      status: "available"
    },
    {
      id: 2,
      name: "Emergency Ambulance #A247",
      type: "ambulance",
      distance: "1.2 km",
      eta: "7 min",
      position: { top: "55%", left: "35%" },
      status: "busy"
    },
    {
      id: 3,
      name: "Metro Medical Center",
      type: "hospital",
      distance: "2.1 km",
      availability: { icu: 2, oxygen: 18, blood: 15 },
      position: { top: "25%", left: "65%" },
      status: "available"
    },
    {
      id: 4,
      name: "Rapid Response #A156",
      type: "ambulance",
      distance: "0.5 km",
      eta: "3 min",
      position: { top: "65%", left: "55%" },
      status: "available"
    }
  ];

  const handleLocateMe = () => {
    setIsLocating(true);
    setTimeout(() => setIsLocating(false), 2000);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-4">
        <h1 className="text-xl font-bold medmap-gradient-text mb-4">Resource Map</h1>
        
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                "flex items-center gap-2 whitespace-nowrap rounded-full",
                activeFilter === filter.id && "medmap-button-primary"
              )}
            >
              <filter.icon size={16} />
              {filter.label}
            </Button>
          ))}
        </div>
      </header>

      {/* Map Container */}
      <div className="flex-1 relative bg-muted overflow-hidden">
        {/* Simulated Map Background */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 400 600">
            {/* Street lines */}
            <line x1="0" y1="200" x2="400" y2="200" stroke="currentColor" strokeWidth="2" />
            <line x1="0" y1="350" x2="400" y2="350" stroke="currentColor" strokeWidth="2" />
            <line x1="150" y1="0" x2="150" y2="600" stroke="currentColor" strokeWidth="2" />
            <line x1="250" y1="0" x2="250" y2="600" stroke="currentColor" strokeWidth="2" />
            <line x1="350" y1="0" x2="350" y2="600" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        {/* User Location */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className={cn(
            "w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg",
            isLocating && "animate-pulse"
          )}>
            <div className="absolute inset-0 bg-primary/30 rounded-full animate-ping" />
          </div>
        </div>

        {/* Resource Pins */}
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{ top: resource.position.top, left: resource.position.left }}
          >
            <div className={cn(
              "w-8 h-8 rounded-full border-3 border-white shadow-lg flex items-center justify-center transition-all duration-200 group-hover:scale-110",
              resource.type === "hospital" ? "bg-primary" : "bg-accent",
              resource.status === "busy" && "bg-warning"
            )}>
              {resource.type === "hospital" ? (
                <MapPin className="h-4 w-4 text-white" />
              ) : (
                <Ambulance className="h-4 w-4 text-white" />
              )}
            </div>
            
            {/* Info Card */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
              <div className="bg-card rounded-xl shadow-card border border-border p-3 min-w-48">
                <h3 className="font-semibold text-sm mb-1">{resource.name}</h3>
                <p className="text-muted-foreground text-xs mb-2">{resource.distance}</p>
                
                {resource.availability && (
                  <div className="flex gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      ICU: {resource.availability.icu}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      O2: {resource.availability.oxygen}
                    </Badge>
                  </div>
                )}
                
                {resource.eta && (
                  <Badge 
                    variant={resource.status === "available" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    ETA: {resource.eta}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="bg-card border-t border-border p-4">
        <div className="flex gap-3">
          <Button
            onClick={handleLocateMe}
            variant="outline"
            className="flex items-center gap-2"
            disabled={isLocating}
          >
            <Navigation size={16} className={cn(isLocating && "animate-spin")} />
            {isLocating ? "Locating..." : "My Location"}
          </Button>
          
          <Button className="flex-1 medmap-button-primary">
            <MapPin className="mr-2 h-4 w-4" />
            Get Directions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResourceMap;