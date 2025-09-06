import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Monitor, 
  MonitorOff,
  Phone,
  Settings,
  Users,
  MessageSquare,
  Volume2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface VideoCallProps {
  isOpen: boolean;
  onClose: () => void;
  meetingUrl: string;
  participants?: string[];
  skillName?: string;
}

export default function VideoCall({ isOpen, onClose, meetingUrl, participants = [], skillName }: VideoCallProps) {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setCallDuration(0);
    onClose();
  };

  const handleJoinExternalMeeting = () => {
    window.open(meetingUrl, '_blank');
    handleEndCall();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] h-[600px] p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  {skillName ? `Learning Session: ${skillName}` : 'Video Call'}
                </DialogTitle>
                <p className="text-sm text-muted-foreground">
                  Duration: {formatDuration(callDuration)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleJoinExternalMeeting}>
                  Join in Jitsi Meet
                </Button>
              </div>
            </div>
          </DialogHeader>

          {/* Main Video Area */}
          <div className="flex-1 flex">
            {/* Video Grid */}
            <div className="flex-1 bg-gray-900 relative">
              {/* Main Video */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="bg-gray-800 rounded-lg w-full h-full max-w-2xl max-h-96 flex items-center justify-center">
                  {isVideoOn ? (
                    <div className="text-white text-center">
                      <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium">{user?.name || 'You'}</p>
                      <p className="text-sm opacity-75">Video is on</p>
                    </div>
                  ) : (
                    <div className="text-white text-center">
                      <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold">
                          {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                        </span>
                      </div>
                      <p className="text-lg font-medium">{user?.name || 'You'}</p>
                      <p className="text-sm opacity-75">Video is off</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Participant Thumbnails */}
              {participants.length > 0 && (
                <div className="absolute top-4 right-4 space-y-2">
                  {participants.map((participant, index) => (
                    <div key={index} className="w-32 h-24 bg-gray-800 rounded-lg flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-1">
                          <span className="text-sm font-bold">
                            {participant.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <p className="text-xs">{participant}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Call Controls */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-black/50 backdrop-blur-sm rounded-full p-2 flex items-center gap-2">
                  <Button
                    size="sm"
                    variant={isAudioOn ? "secondary" : "destructive"}
                    className="rounded-full w-12 h-12"
                    onClick={() => setIsAudioOn(!isAudioOn)}
                  >
                    {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                  </Button>
                  
                  <Button
                    size="sm"
                    variant={isVideoOn ? "secondary" : "destructive"}
                    className="rounded-full w-12 h-12"
                    onClick={() => setIsVideoOn(!isVideoOn)}
                  >
                    {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                  </Button>
                  
                  <Button
                    size="sm"
                    variant={isScreenSharing ? "default" : "secondary"}
                    className="rounded-full w-12 h-12"
                    onClick={() => setIsScreenSharing(!isScreenSharing)}
                  >
                    {isScreenSharing ? <MonitorOff className="h-5 w-5" /> : <Monitor className="h-5 w-5" />}
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="secondary"
                    className="rounded-full w-12 h-12"
                    onClick={() => setShowChat(!showChat)}
                  >
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="secondary"
                    className="rounded-full w-12 h-12"
                  >
                    <Settings className="h-5 w-5" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="destructive"
                    className="rounded-full w-12 h-12"
                    onClick={handleEndCall}
                  >
                    <Phone className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Screen Sharing Indicator */}
              {isScreenSharing && (
                <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  <Monitor className="h-4 w-4" />
                  Screen Sharing
                </div>
              )}
            </div>

            {/* Chat Sidebar */}
            {showChat && (
              <div className="w-80 border-l bg-background">
                <Card className="h-full rounded-none border-0">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Chat
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="flex-1 space-y-3 mb-4">
                      <div className="text-sm">
                        <div className="bg-muted p-2 rounded-lg">
                          <p className="font-medium">System</p>
                          <p className="text-muted-foreground">Session started</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <input 
                        className="flex-1 px-3 py-2 border rounded-lg text-sm" 
                        placeholder="Type a message..."
                      />
                      <Button size="sm">Send</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Meeting Info */}
          <div className="p-4 border-t bg-muted/50">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{participants.length + 1} participants</span>
                </div>
                {skillName && (
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">Learning:</span>
                    <span className="font-medium">{skillName}</span>
                  </div>
                )}
              </div>
              <div className="text-muted-foreground">
                Meeting ID: {meetingUrl.split('/').pop()}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}