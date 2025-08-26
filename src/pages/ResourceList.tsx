import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Phone, 
  Clock,
  Bed,
  Wind,
  Droplets,
  Stethoscope,
  Heart,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const ResourceList = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const resourceType = searchParams.get("type") || "all";

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Emergency Medicine",
      rating: 4.8,
      experience: "15 years",
      availability: "Available now",
      distance: "0.8 km",
      hospital: "City General Hospital",
      consultationFee: 150,
      image: "/doctor-1.jpg",
      status: "online"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Cardiology",
      rating: 4.9,
      experience: "12 years",
      availability: "Next: 2:30 PM",
      distance: "1.2 km",
      hospital: "Metro Medical Center",
      consultationFee: 200,
      image: "/doctor-2.jpg",
      status: "busy"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrics",
      rating: 4.7,
      experience: "8 years",
      availability: "Available now",
      distance: "2.1 km",
      hospital: "Children's Hospital",
      consultationFee: 120,
      image: "/doctor-3.jpg",
      status: "online"
    }
  ];

  const hospitals = [
    {
      id: 1,
      name: "City General Hospital",
      type: "Multi-specialty",
      rating: 4.6,
      distance: "0.8 km",
      availability: {
        icu: 5,
        oxygen: 12,
        blood: 8,
        ventilators: 3
      },
      waitTime: "15 min",
      emergency: true
    },
    {
      id: 2,
      name: "Metro Medical Center",
      type: "Private Hospital",
      rating: 4.8,
      distance: "1.2 km",
      availability: {
        icu: 2,
        oxygen: 18,
        blood: 15,
        ventilators: 7
      },
      waitTime: "25 min",
      emergency: true
    }
  ];

  const ambulances = [
    {
      id: 1,
      name: "Rapid Response #A156",
      type: "Advanced Life Support",
      rating: 4.9,
      distance: "0.5 km",
      eta: "3 min",
      driverName: "James Wilson",
      vehicleNumber: "MH-12-AB-1234",
      status: "available"
    },
    {
      id: 2,
      name: "Emergency Unit #A247",
      type: "Basic Life Support",
      rating: 4.7,
      distance: "1.2 km",
      eta: "7 min",
      driverName: "Maria Santos",
      vehicleNumber: "MH-12-CD-5678",
      status: "busy"
    }
  ];

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "icu": return Bed;
      case "oxygen": return Wind;
      case "blood": return Droplets;
      case "ambulance": return Phone;
      default: return Stethoscope;
    }
  };

  const ResourceIcon = getResourceIcon(resourceType);

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-4">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
          >
            ← Back
          </Button>
          <h1 className="text-xl font-bold medmap-gradient-text flex items-center gap-2">
            <ResourceIcon size={20} />
            {resourceType === "all" ? "All Resources" : 
             resourceType === "ambulance" ? "Ambulances" :
             resourceType === "icu" ? "ICU Beds" :
             resourceType === "oxygen" ? "Oxygen Supply" :
             resourceType === "blood" ? "Blood Units" : "Resources"}
          </h1>
        </div>
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Filter size={16} />
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Doctors Section */}
        {(resourceType === "all" || resourceType === "doctor") && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Stethoscope size={18} />
              Available Doctors
            </h2>
            <div className="space-y-4">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="medmap-resource-card border border-primary/60 sm:border-0 bg-primary/5">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                    <div className="relative shrink-0">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={doctor.image} />
                        <AvatarFallback className="bg-primary text-white font-semibold">
                          <User size={24} />
                        </AvatarFallback>
                      </Avatar>
                      <div className={cn(
                        "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white",
                        doctor.status === "online" ? "bg-success" : "bg-warning"
                      )} />
                    </div>
                    
                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left justify-between gap-2 mb-2">
                        <div className="min-w-0 w-full sm:w-auto">
                          <h3 className="font-semibold text-base truncate w-full">{doctor.name}</h3>
                          <p className="text-muted-foreground text-sm truncate w-full">{doctor.specialty}</p>
                        </div>
                        <div className="text-center sm:text-right shrink-0">
                          <div className="flex items-center gap-1 text-warning justify-center sm:justify-end">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="font-semibold">{doctor.rating}</span>
                          </div>
                          <p className="text-muted-foreground text-xs">{doctor.experience}</p>
                        </div>
                      </div>
                      
                      {/* Mobile 2x2 grid of details */}
                      <div className="grid grid-cols-2 gap-0 mb-3 sm:hidden rounded-2xl overflow-hidden divide-x divide-y divide-primary/40 border border-primary/60 shadow-sm">
                        <div className="text-center p-3 bg-primary/10 text-primary font-semibold">
                          <div className="flex items-center justify-center gap-1 text-muted-foreground">
                            <MapPin size={14} />
                            <span className="text-xs font-medium">{doctor.distance}</span>
                          </div>
                        </div>
                        <div className="text-center p-3 bg-primary/10 text-primary font-semibold">
                          <div className="flex items-center justify-center gap-1 text-muted-foreground">
                            <Clock size={14} />
                            <span className="text-xs font-medium">{doctor.availability}</span>
                          </div>
                        </div>
                        <div className="text-center p-3 bg-primary/10 text-primary font-semibold">
                          <span className="text-xs text-primary">₹{doctor.consultationFee}</span>
                        </div>
                        <div className="text-center p-3 bg-primary/10 text-primary font-semibold">
                          <Badge 
                            variant={doctor.status === "online" ? "default" : "secondary"}
                            className="text-[10px] py-0.5 px-2 font-semibold"
                          >
                            {doctor.status === "online" ? "Available" : "Busy"}
                          </Badge>
                        </div>
                      </div>

                      {/* Tablet meta row (simple), hidden on desktop */}
                      <div className="hidden sm:flex lg:hidden items-center gap-4 mb-3">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin size={14} />
                          <span className="text-sm">{doctor.distance}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock size={14} />
                          <span className="text-sm">{doctor.availability}</span>
                        </div>
                      </div>

                      {/* Desktop compact meta row */}
                      <div className="hidden lg:flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin size={14} />
                          <span className="text-sm">{doctor.distance}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock size={14} />
                          <span className="text-sm">{doctor.availability}</span>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground text-sm mb-3 truncate text-center sm:text-left">{doctor.hospital}</p>
                      
                      <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-between gap-3">
                        <div className="hidden lg:flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            ₹{doctor.consultationFee}
                          </Badge>
                          <Badge 
                            variant={doctor.status === "online" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {doctor.status === "online" ? "Available" : "Busy"}
                          </Badge>
                        </div>
                        <div className="flex gap-2 whitespace-nowrap justify-center sm:ml-auto">
                          <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10">
                            <Phone size={14} className="mr-1" />
                            Call
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                            onClick={() => navigate("/video-call")}
                          >
                            Consult
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Hospitals Section */}
        {(resourceType === "all" || resourceType === "icu" || resourceType === "oxygen" || resourceType === "blood") && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPin size={18} />
              Nearby Hospitals
            </h2>
            <div className="space-y-4">
              {hospitals.map((hospital) => (
                <div key={hospital.id} className="medmap-resource-card border border-success/60 sm:border-0 bg-success/5">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-semibold text-base">{hospital.name}</h3>
                      <p className="text-muted-foreground text-sm">{hospital.type}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="flex items-center gap-1 text-warning">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="font-semibold">{hospital.rating}</span>
                      </div>
                      {hospital.emergency && (
                        <Badge variant="destructive" className="text-xs mt-1">
                          24/7 Emergency
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-3">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin size={14} />
                      <span className="text-sm">{hospital.distance}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock size={14} />
                      <span className="text-sm">Wait: {hospital.waitTime}</span>
                    </div>
                  </div>
                  
                  {/* Mobile heavy 2x2 grid */}
                  <div className="grid grid-cols-2 gap-0 mb-4 sm:hidden rounded-2xl overflow-hidden divide-x divide-y divide-success/40 border border-success/60 shadow-sm">
                    <div className="text-center p-3 bg-success/10 text-foreground font-semibold">
                      <Bed size={16} className="mx-auto mb-1 text-primary" />
                      <p className="text-xs">ICU: {hospital.availability.icu}</p>
                    </div>
                    <div className="text-center p-3 bg-success/10 text-foreground font-semibold">
                      <Wind size={16} className="mx-auto mb-1 text-blue-600" />
                      <p className="text-xs">O2: {hospital.availability.oxygen}</p>
                    </div>
                    <div className="text-center p-3 bg-success/10 text-foreground font-semibold">
                      <Droplets size={16} className="mx-auto mb-1 text-accent" />
                      <p className="text-xs">Blood: {hospital.availability.blood}</p>
                    </div>
                    <div className="text-center p-3 bg-success/10 text-foreground font-semibold">
                      <Heart size={16} className="mx-auto mb-1 text-destructive" />
                      <p className="text-xs">Vent: {hospital.availability.ventilators}</p>
                    </div>
                  </div>

                  {/* Desktop grid only (tablet uses default light layout above) */}
                  <div className="hidden lg:grid grid-cols-4 gap-2 mb-4">
                    <div className="text-center p-2 bg-success/10 rounded-lg">
                      <Bed size={16} className="mx-auto mb-1 text-primary" />
                      <p className="text-xs font-medium">ICU: {hospital.availability.icu}</p>
                    </div>
                    <div className="text-center p-2 bg-success/10 rounded-lg">
                      <Wind size={16} className="mx-auto mb-1 text-blue-600" />
                      <p className="text-xs font-medium">O2: {hospital.availability.oxygen}</p>
                    </div>
                    <div className="text-center p-2 bg-success/10 rounded-lg">
                      <Droplets size={16} className="mx-auto mb-1 text-accent" />
                      <p className="text-xs font-medium">Blood: {hospital.availability.blood}</p>
                    </div>
                    <div className="text-center p-2 bg-success/10 rounded-lg">
                      <Heart size={16} className="mx-auto mb-1 text-destructive" />
                      <p className="text-xs font-medium">Vent: {hospital.availability.ventilators}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" size="sm" className="flex-1 w-full sm:w-auto border-success text-success hover:bg-success/10 h-auto px-4 py-3 sm:h-9 sm:px-3 sm:py-0">
                      <MapPin size={14} className="mr-1" />
                      Directions
                    </Button>
                    <Button size="sm" className="flex-1 w-full sm:w-auto bg-success text-success-foreground hover:bg-success/90 h-auto px-4 py-3 sm:h-9 sm:px-3 sm:py-0">
                      <Phone size={14} className="mr-1" />
                      Contact
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Ambulances Section */}
        {(resourceType === "all" || resourceType === "ambulance") && (
          <section>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Phone size={18} />
              Available Ambulances
            </h2>
            <div className="space-y-4">
              {ambulances.map((ambulance) => (
                <div key={ambulance.id} className="medmap-resource-card border border-destructive/60 sm:border-0 bg-destructive/5">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-semibold text-base">{ambulance.name}</h3>
                      <p className="text-muted-foreground text-sm">{ambulance.type}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="flex items-center gap-1 text-warning">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="font-semibold">{ambulance.rating}</span>
                      </div>
                      <Badge 
                        variant={ambulance.status === "available" ? "default" : "secondary"}
                        className="text-xs mt-1"
                      >
                        {ambulance.status === "available" ? "Available" : "Busy"}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-3">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin size={14} />
                      <span className="text-sm">{ambulance.distance}</span>
                    </div>
                    <div className="flex items-center gap-1 text-success">
                      <Clock size={14} />
                      <span className="text-sm font-medium">ETA: {ambulance.eta}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm"><span className="font-medium">Driver:</span> {ambulance.driverName}</p>
                    <p className="text-sm text-muted-foreground">{ambulance.vehicleNumber}</p>
                  </div>
                  
                  <Button 
                    className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    disabled={ambulance.status === "busy"}
                    onClick={() => navigate("/emergency")}
                  >
                    <Phone size={16} className="mr-2" />
                    {ambulance.status === "available" ? "Book Now" : "Currently Busy"}
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ResourceList;