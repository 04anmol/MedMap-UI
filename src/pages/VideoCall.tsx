import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  RotateCcw,
  MessageCircle,
  Settings,
  User,
  Clock,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const VideoCall = () => {
  const navigate = useNavigate();
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [isConnecting, setIsConnecting] = useState(true);
  const [showControls, setShowControls] = useState(true);

  // Doctor information
  const doctor = {
    name: "Dr. Sarah Johnson",
    specialty: "Emergency Medicine",
    rating: 4.8,
    experience: "15 years",
    hospital: "City General Hospital",
    image: "/doctor-1.jpg"
  };

  useEffect(() => {
    // Simulate connection process
    const connectTimer = setTimeout(() => {
      setIsConnecting(false);
    }, 3000);

    // Call duration timer
    const durationTimer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    // Auto-hide controls
    const controlsTimer = setTimeout(() => {
      setShowControls(false);
    }, 5000);

    return () => {
      clearTimeout(connectTimer);
      clearInterval(durationTimer);
      clearTimeout(controlsTimer);
    };
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    navigate("/");
  };

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  return (
    <div className="relative h-screen bg-black overflow-hidden" onClick={toggleControls}>
      {/* Doctor's Video (Main) */}
      <div className="absolute inset-0">
        {isConnecting ? (
          <div className="flex flex-col items-center justify-center h-full bg-gradient-primary">
            <Avatar className="h-32 w-32 mb-6 border-4 border-white/20">
              <AvatarImage src={doctor.image} />
              <AvatarFallback className="bg-white/10 text-white text-4xl font-bold">
                <User size={48} />
              </AvatarFallback>
            </Avatar>
            <div className="text-white text-center mb-4">
              <h2 className="text-2xl font-bold mb-2">{doctor.name}</h2>
              <p className="text-white/80">{doctor.specialty}</p>
            </div>
            <div className="flex items-center gap-2 text-white/80 mb-6">
              <Clock size={16} />
              <span>Connecting...</span>
            </div>
            <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        ) : (
          <div className="relative h-full bg-gradient-to-br from-primary/20 to-secondary/20">
            {/* Simulated video feed background */}
            <div className="absolute inset-0 bg-black/20" />
            
            {/* Doctor info overlay */}
            <div className={cn(
              "absolute top-6 left-6 right-6 transition-opacity duration-300",
              showControls ? "opacity-100" : "opacity-0"
            )}>
              <div className="bg-black/50 backdrop-blur-lg rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-white/20">
                    <AvatarImage src={doctor.image} />
                    <AvatarFallback className="bg-primary text-white font-semibold">
                      <User size={24} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-white">
                    <h3 className="font-semibold text-lg">{doctor.name}</h3>
                    <p className="text-white/80 text-sm">{doctor.specialty}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-yellow-400 mb-1">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-semibold">{doctor.rating}</span>
                    </div>
                    <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                      {formatDuration(callDuration)}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Connection status */}
            <div className="absolute top-6 right-6">
              <div className="flex items-center gap-2 bg-success/20 backdrop-blur-lg px-3 py-2 rounded-full">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-success text-sm font-medium">Connected</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* User's Video (Picture-in-Picture) */}
      <div className="absolute top-20 right-4 w-24 h-32 bg-gradient-secondary rounded-2xl border-2 border-white/20 overflow-hidden">
        {isVideoOn ? (
          <div className="relative h-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
            <div className="text-white text-xs font-medium">You</div>
            {!isMicOn && (
              <div className="absolute top-2 left-2 w-5 h-5 bg-destructive rounded-full flex items-center justify-center">
                <MicOff size={10} className="text-white" />
              </div>
            )}
          </div>
        ) : (
          <div className="h-full bg-black flex items-center justify-center">
            <VideoOff size={16} className="text-white/60" />
          </div>
        )}
      </div>

      {/* Controls */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 p-6 transition-all duration-300",
        showControls ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      )}>
        <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-4">
          <div className="flex items-center justify-center gap-6">
            {/* Mic Toggle */}
            <Button
              variant="ghost"
              size="lg"
              onClick={(e) => {
                e.stopPropagation();
                setIsMicOn(!isMicOn);
              }}
              className={cn(
                "w-14 h-14 rounded-full border-2",
                isMicOn 
                  ? "bg-white/10 border-white/20 text-white hover:bg-white/20" 
                  : "bg-destructive border-destructive text-white hover:bg-destructive/80"
              )}
            >
              {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
            </Button>

            {/* Video Toggle */}
            <Button
              variant="ghost"
              size="lg"
              onClick={(e) => {
                e.stopPropagation();
                setIsVideoOn(!isVideoOn);
              }}
              className={cn(
                "w-14 h-14 rounded-full border-2",
                isVideoOn 
                  ? "bg-white/10 border-white/20 text-white hover:bg-white/20" 
                  : "bg-destructive border-destructive text-white hover:bg-destructive/80"
              )}
            >
              {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
            </Button>

            {/* End Call */}
            <Button
              size="lg"
              onClick={(e) => {
                e.stopPropagation();
                handleEndCall();
              }}
              className="w-16 h-16 rounded-full bg-destructive hover:bg-destructive/80 text-white border-2 border-destructive"
            >
              <Phone size={24} className="rotate-[135deg]" />
            </Button>

            {/* Switch Camera */}
            <Button
              variant="ghost"
              size="lg"
              onClick={(e) => e.stopPropagation()}
              className="w-14 h-14 rounded-full border-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <RotateCcw size={20} />
            </Button>

            {/* Chat */}
            <Button
              variant="ghost"
              size="lg"
              onClick={(e) => e.stopPropagation()}
              className="w-14 h-14 rounded-full border-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <MessageCircle size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Additional Actions (when controls are hidden) */}
      {!showControls && (
        <div className="absolute bottom-6 right-6">
          <Button
            size="sm"
            variant="ghost"
            className="bg-black/50 backdrop-blur-lg text-white hover:bg-black/70 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              setShowControls(true);
            }}
          >
            <Settings size={16} />
          </Button>
        </div>
      )}

      {/* Call Quality Indicator */}
      <div className="absolute top-6 left-6">
        <div className="flex items-center gap-2 bg-black/50 backdrop-blur-lg px-3 py-2 rounded-full">
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((bar) => (
              <div
                key={bar}
                className={cn(
                  "w-1 rounded-full transition-colors duration-200",
                  bar <= 3 ? "bg-success h-3" : "bg-white/30 h-2"
                )}
              />
            ))}
          </div>
          <span className="text-white text-xs font-medium">HD</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;