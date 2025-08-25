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
    <nav className="fixed bottom-0 left-0 right-0 pb-6 pt-4 bg-transparent z-50">
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-1 bg-black/90 backdrop-blur-xl rounded-full p-2 shadow-2xl border border-white/10">
          {navItems.map(({ path, icon: Icon }) => {
            const isActive = location.pathname === path;
            const isEmergency = path === "/emergency";

            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={cn(
                  "w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 border",
                  isActive
                    ? "bg-primary text-white border-primary"
                    : "bg-black/60 text-white border-white/10 hover:bg-black/70",
                  isEmergency && !isActive && "text-destructive"
                )}
                aria-label={path}
              >
                <Icon size={18} />
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;