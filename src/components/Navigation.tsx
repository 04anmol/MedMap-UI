import { useNavigate, useLocation } from "react-router-dom";
import { Home, MapPin, List, PhoneCall, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/map", icon: MapPin, label: "Map" },
    { path: "/resources", icon: List, label: "Resources" },
    { path: "/video-call", icon: PhoneCall, label: "Consult" },
    { path: "/emergency", icon: AlertTriangle, label: "SOS" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border shadow-card z-50">
      <div className="flex justify-around items-center px-4 py-3">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          const isEmergency = path === "/emergency";
          
          return (
            <Button
              key={path}
              variant="ghost"
              size="sm"
              onClick={() => navigate(path)}
              className={cn(
                "flex flex-col items-center gap-1 h-auto py-2 px-3 rounded-xl transition-all duration-200",
                isActive && "bg-primary/10 text-primary",
                isEmergency && "text-destructive hover:bg-destructive/10"
              )}
            >
              <Icon size={20} className={cn(
                "transition-transform duration-200",
                isActive && "scale-110"
              )} />
              <span className="text-xs font-medium">{label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;