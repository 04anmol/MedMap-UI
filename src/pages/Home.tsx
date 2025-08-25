import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Ambulance, 
  Bed, 
  Wind, 
  Droplets, 
  Heart,
  Stethoscope,
  MapPin,
  Phone,
  Clock,
  Star,
  AlertTriangle,
  Calendar,
  TrendingUp,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
 

const Home = () => {
  const navigate = useNavigate();
  const [userName] = useState("Sarah");

  const quickAccessCards = [
    {
      id: "ambulance",
      title: "Ambulance",
      icon: Ambulance,
      description: "Emergency transport",
      path: "/resources?type=ambulance",
      gradient: "bg-gradient-emergency",
      border: "border-destructive/60",
      color: "text-red-600"
    },
    {
      id: "icu",
      title: "ICU Beds",
      icon: Bed,
      description: "Available beds",
      path: "/resources?type=icu",
      gradient: "bg-gradient-primary",
      border: "border-primary/60",
      color: "text-blue-600"
    },
    {
      id: "oxygen",
      title: "Oxygen",
      icon: Wind,
      description: "Oxygen supply",
      path: "/resources?type=oxygen",
      gradient: "bg-gradient-wellness",
      border: "border-accent/60",
      color: "text-teal-600"
    },
    {
      id: "blood",
      title: "Blood Units",
      icon: Droplets,
      description: "Blood bank",
      path: "/resources?type=blood",
      gradient: "bg-gradient-pink",
      border: "border-[#A1406E]",
      color: "text-pink-600"
    }
  ];

  const categories = [
    { 
      icon: Heart, 
      label: "Cardiology", 
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      borderColor: "border-destructive/40"
    },
    { 
      icon: Stethoscope, 
      label: "General", 
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/40"
    },
    { 
      icon: MapPin, 
      label: "Nearby", 
      color: "text-[#7D3C98]",
      bgColor: "bg-[#7D3C98]/10",
      borderColor: "border-[#7D3C98]/60"
    },
    { 
      icon: Phone, 
      label: "Telehealth", 
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/40"
    },
  ];

  return (
    <div className="px-4 pt-8 pb-4 min-h-screen bg-background">
      {/* Welcome Header */}
      <header className="relative mb-8">
        <div className="medmap-card bg-primary overflow-hidden relative text-primary-foreground">
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-3 border-white/30">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="bg-white/20 text-white font-bold text-xl">
                  {userName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="text-white">
                <h1 className="text-2xl font-bold mb-1">
                  Hello, {userName}! 👋
                </h1>
                <p className="text-white/80 text-sm">Your health companion is ready</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-full">
              <div className="w-2.5 h-2.5 bg-success rounded-full animate-pulse ring-2 ring-white/60 shadow-[0_0_14px_3px_rgba(26,188,156,0.6)]" />
              <span className="text-white text-sm font-medium">Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Emergency SOS Button */}
      <div className="mb-8 relative">
        <div className="medmap-card bg-destructive p-6 overflow-hidden relative text-white">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-white font-bold text-xl mb-1">Emergency SOS</h2>
                <p className="text-white/80 text-sm">Get immediate help in crisis</p>
              </div>
              <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center animate-pulse ring-4 ring-white/40 shadow-[0_0_30px_6px_rgba(231,76,60,0.6)]">
                <AlertTriangle className="h-6 w-6 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
              </div>
            </div>
            <Button
              onClick={() => navigate("/emergency")}
              className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-4 rounded-2xl backdrop-blur-sm border border-white/30 transition-all duration-200 hover:scale-105"
            >
              <Phone className="mr-3 h-5 w-5" />
              Request Emergency Help
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Access Cards */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Quick Access</h2>
          <Badge variant="secondary" className="bg-primary/10 text-primary px-3 py-1">
            <TrendingUp size={12} className="mr-1" />
            Live Data
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {quickAccessCards.map((card) => (
            <div
              key={card.id}
              onClick={() => navigate(card.path)}
              className={`medmap-card hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer group overflow-hidden relative border-[3px] ${card.border}`}
            >
              <div className="relative z-10">
                <div className={`w-14 h-14 ${card.gradient.replace('bg-gradient-primary','bg-primary').replace('bg-gradient-emergency','bg-destructive').replace('bg-gradient-success','bg-success').replace('bg-gradient-wellness','bg-accent').replace('bg-gradient-pink','bg-secondary')} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200 shadow-lg`}>
                  <card.icon className={`h-7 w-7 ${card.id === 'blood' ? 'text-destructive' : 'text-white'}`} />
                </div>
                <h3 className="font-bold text-base mb-2">{card.title}</h3>
                <p className="text-muted-foreground text-sm">{card.description}</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span className="text-success text-xs font-medium">Available</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Medical Categories with Friendly Design */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-6">Medical Services</h2>
        <div className="grid grid-cols-4 gap-3">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`flex flex-col items-center gap-3 p-4 rounded-2xl ${category.bgColor} border-2 ${category.borderColor} hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105`}
            >
              <div className={`w-12 h-12 rounded-2xl bg-transparent flex items-center justify-center`}>
                <category.icon className={`h-6 w-6 ${category.color}`} />
              </div>
              <span className="text-xs font-semibold text-center text-foreground">{category.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Health Insights */}
      <section className="mb-8">
        <div className="medmap-card bg-accent overflow-hidden relative text-white">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="text-white">
                <h3 className="font-bold text-lg mb-1">Health Insights</h3>
                <p className="text-white/80 text-sm">Your wellness summary</p>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">98%</div>
                <div className="text-white/80 text-xs">Health Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">3</div>
                <div className="text-white/80 text-xs">Consultations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">12</div>
                <div className="text-white/80 text-xs">Prescriptions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity with Enhanced Design */}
      <section>
        <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
        <div className="space-y-4">
          <div
            className="medmap-card hover:shadow-lg transition-all duration-200"
            style={{ background: 'linear-gradient(135deg, hsl(var(--success) / 0.10), hsl(var(--success) / 0.22))' }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg border-2 border-success">
                <Phone className="h-6 w-6 text-success" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-base">Video Consultation</h4>
                <p className="text-muted-foreground text-sm">Dr. Smith - Completed</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-warning mb-1">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-bold text-sm">4.8</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span className="text-xs">2 hours ago</span>
                </div>
              </div>
            </div>
          </div>
          
          <div
            className="medmap-card hover:shadow-lg transition-all duration-200"
            style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.10), hsl(var(--primary) / 0.22))' }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg border-2 border-primary">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-base">Ambulance Booking</h4>
                <p className="text-muted-foreground text-sm">City Hospital - Delivered</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-success mb-1">
                  <Clock className="h-3 w-3" />
                  <span className="font-bold text-sm">15 min</span>
                </div>
                <p className="text-muted-foreground text-xs">Yesterday</p>
              </div>
            </div>
          </div>
          
          <div
            className="medmap-card hover:shadow-lg transition-all duration-200"
            style={{ background: 'linear-gradient(135deg, hsl(var(--accent) / 0.10), hsl(var(--accent) / 0.22))' }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg border-2 border-accent">
                <Calendar className="h-6 w-6 text-accent" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-base">Health Checkup</h4>
                <p className="text-muted-foreground text-sm">Scheduled for next week</p>
              </div>
              <div className="text-right">
                <Badge variant="secondary" className="bg-accent/10 text-accent mb-1">
                  Upcoming
                </Badge>
                <p className="text-muted-foreground text-xs">Mar 15</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;