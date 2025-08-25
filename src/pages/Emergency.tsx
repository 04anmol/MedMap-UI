import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  AlertTriangle, 
  Phone, 
  MapPin, 
  Clock, 
  User, 
  Car,
  Navigation,
  Heart,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type EmergencyStep = "request" | "confirming" | "dispatched" | "enroute" | "arrived";

const Emergency = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<EmergencyStep>("request");
  const [countdown, setCountdown] = useState(10);
  const [eta, setEta] = useState(5);
  const [isConfirming, setIsConfirming] = useState(false);

  // Simulated ambulance data
  const ambulanceData = {
    id: "A156",
    driver: "James Wilson",
    phone: "+91 98765 43210",
    vehicleNumber: "MH-12-AB-1234",
    type: "Advanced Life Support",
    location: "Near Central Mall"
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (step === "confirming" && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setStep("dispatched");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    if (step === "enroute" && eta > 0) {
      interval = setInterval(() => {
        setEta(prev => {
          if (prev <= 1) {
            setStep("arrived");
            return 0;
          }
          return prev - 1;
        });
      }, 30000); // Update every 30 seconds for demo
    }

    return () => clearInterval(interval);
  }, [step, countdown, eta]);

  const handleEmergencyRequest = () => {
    setIsConfirming(true);
    setTimeout(() => {
      setStep("confirming");
      setIsConfirming(false);
    }, 2000);
  };

  const handleCancel = () => {
    setStep("request");
    setCountdown(10);
    setEta(5);
  };

  const renderRequestStep = () => (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <div className="w-32 h-32 bg-gradient-emergency rounded-full flex items-center justify-center mb-8 animate-pulse">
        <AlertTriangle className="h-16 w-16 text-white" />
      </div>
      
      <h1 className="text-3xl font-bold mb-4">Emergency SOS</h1>
      <p className="text-muted-foreground text-lg mb-8 max-w-sm">
        Press and hold the button below to request immediate medical assistance
      </p>
      
      <Button
        size="lg"
        className="w-48 h-48 rounded-full medmap-button-emergency text-xl font-bold"
        onMouseDown={handleEmergencyRequest}
        disabled={isConfirming}
      >
        {isConfirming ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full mb-2" />
            <span>Requesting...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Phone className="h-12 w-12 mb-2" />
            <span>SOS</span>
          </div>
        )}
      </Button>
      
      <p className="text-muted-foreground text-sm mt-6">
        Your location will be shared automatically
      </p>
    </div>
  );

  const renderConfirmingStep = () => (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <div className="w-32 h-32 bg-gradient-primary rounded-full flex items-center justify-center mb-8">
        <Activity className="h-16 w-16 text-white animate-pulse" />
      </div>
      
      <h1 className="text-2xl font-bold mb-4">Confirming Emergency</h1>
      <p className="text-muted-foreground text-lg mb-8">
        Finding the nearest available ambulance...
      </p>
      
      <div className="w-32 h-32 rounded-full border-4 border-primary/20 flex items-center justify-center mb-6 relative">
        <div className="text-3xl font-bold text-primary">{countdown}</div>
        <div className="absolute inset-0 border-4 border-primary rounded-full" 
             style={{
               transform: `rotate(${(10 - countdown) * 36}deg)`,
               borderColor: `transparent transparent transparent hsl(var(--primary))`
             }} />
      </div>
      
      <Button 
        variant="outline" 
        onClick={handleCancel}
        className="mt-4"
      >
        Cancel Request
      </Button>
    </div>
  );

  const renderDispatchedStep = () => (
    <div className="px-6 py-8">
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-gradient-success rounded-full flex items-center justify-center mb-4 mx-auto">
          <Car className="h-12 w-12 text-white" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Ambulance Dispatched!</h1>
        <p className="text-muted-foreground">Help is on the way</p>
      </div>

      <div className="medmap-card mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/driver-avatar.jpg" />
            <AvatarFallback className="bg-gradient-primary text-white font-semibold">
              {ambulanceData.driver.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold">{ambulanceData.driver}</h3>
            <p className="text-muted-foreground text-sm">Driver • Unit #{ambulanceData.id}</p>
          </div>
          <Badge variant="default" className="bg-gradient-success text-white">
            Dispatched
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-muted-foreground text-sm">Vehicle</p>
            <p className="font-medium">{ambulanceData.vehicleNumber}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Type</p>
            <p className="font-medium">{ambulanceData.type}</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="flex-1">
            <Phone size={16} className="mr-2" />
            Call Driver
          </Button>
          <Button 
            size="sm" 
            className="flex-1 medmap-button-primary"
            onClick={() => setStep("enroute")}
          >
            <MapPin size={16} className="mr-2" />
            Track Live
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
          <Navigation className="h-5 w-5 text-primary" />
          <div className="flex-1">
            <p className="font-medium">Current Location</p>
            <p className="text-muted-foreground text-sm">{ambulanceData.location}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
          <Clock className="h-5 w-5 text-success" />
          <div className="flex-1">
            <p className="font-medium">Estimated Arrival</p>
            <p className="text-success font-semibold">5-7 minutes</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEnrouteStep = () => (
    <div className="px-6 py-8">
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-gradient-accent rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
          <Car className="h-12 w-12 text-white" />
        </div>
        <h1 className="text-2xl font-bold mb-2">En Route</h1>
        <p className="text-accent font-semibold text-lg">ETA: {eta} minutes</p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm text-muted-foreground">{Math.round((5 - eta) / 5 * 100)}%</span>
        </div>
        <Progress value={(5 - eta) / 5 * 100} className="h-3" />
      </div>

      <div className="medmap-card mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">{ambulanceData.driver}</h3>
              <p className="text-muted-foreground text-sm">Unit #{ambulanceData.id}</p>
            </div>
          </div>
          <Badge variant="default" className="bg-gradient-accent text-white">
            En Route
          </Badge>
        </div>
        
        <div className="flex gap-3 mb-4">
          <Button variant="outline" size="sm" className="flex-1">
            <Phone size={16} className="mr-2" />
            Call
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <MapPin size={16} className="mr-2" />
            Live Location
          </Button>
        </div>
      </div>

      <div className="bg-warning/10 border border-warning/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Heart className="h-5 w-5 text-warning mt-0.5" />
          <div>
            <h4 className="font-semibold text-warning mb-1">Stay Calm</h4>
            <p className="text-sm text-muted-foreground">
              Help is almost here. Try to remain calm and follow any instructions from our medical team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderArrivedStep = () => (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <div className="w-32 h-32 bg-gradient-success rounded-full flex items-center justify-center mb-8">
        <Heart className="h-16 w-16 text-white" />
      </div>
      
      <h1 className="text-3xl font-bold mb-4 text-success">Ambulance Arrived!</h1>
      <p className="text-muted-foreground text-lg mb-8">
        The medical team is ready to assist you
      </p>
      
      <div className="space-y-4 w-full max-w-sm">
        <Button size="lg" className="w-full medmap-button-primary">
          <Phone className="mr-3 h-5 w-5" />
          Contact Medical Team
        </Button>
        
        <Button 
          variant="outline" 
          size="lg" 
          className="w-full"
          onClick={() => navigate("/")}
        >
          Return Home
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      {step !== "request" && (
        <header className="bg-card/90 backdrop-blur-lg border-b border-border px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={step === "confirming" ? handleCancel : () => navigate(-1)}
            >
              ← {step === "confirming" ? "Cancel" : "Back"}
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
              <span className="text-sm font-medium text-destructive">Emergency Active</span>
            </div>
          </div>
        </header>
      )}

      {/* Content */}
      {step === "request" && renderRequestStep()}
      {step === "confirming" && renderConfirmingStep()}
      {step === "dispatched" && renderDispatchedStep()}
      {step === "enroute" && renderEnrouteStep()}
      {step === "arrived" && renderArrivedStep()}
    </div>
  );
};

export default Emergency;