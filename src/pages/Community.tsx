import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, 
  Calendar, 
  MapPin, 
  Clock, 
  Star,
  Plus,
  Bell,
  Trophy,
  MessageCircle,
  Video,
  Coffee,
  BookOpen,
  Zap
} from 'lucide-react';
import { format, addDays } from 'date-fns';

interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  category: string;
  members: number;
  image: string;
  is_joined: boolean;
  tags: string[];
}

interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  organizer: string;
  organizer_avatar: string;
  date: string;
  duration: string;
  type: 'workshop' | 'meetup' | 'study_group' | 'webinar';
  max_participants: number;
  current_participants: number;
  is_registered: boolean;
  meeting_url?: string;
  tags: string[];
}

const mockGroups: CommunityGroup[] = [
  {
    id: '1',
    name: 'React Developers',
    description: 'A community for React developers to share knowledge, best practices, and collaborate on projects.',
    category: 'Programming',
    members: 1247,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop',
    is_joined: true,
    tags: ['React', 'JavaScript', 'Frontend']
  },
  {
    id: '2',
    name: 'Spanish Language Exchange',
    description: 'Practice Spanish with native speakers and fellow learners. Weekly conversation sessions and cultural exchanges.',
    category: 'Languages',
    members: 892,
    image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=300&h=200&fit=crop',
    is_joined: false,
    tags: ['Spanish', 'Language Exchange', 'Culture']
  },
  {
    id: '3',
    name: 'UI/UX Design Hub',
    description: 'Designers sharing portfolios, getting feedback, and discussing the latest design trends and tools.',
    category: 'Design',
    members: 634,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop',
    is_joined: true,
    tags: ['UI/UX', 'Design', 'Figma']
  },
  {
    id: '4',
    name: 'Data Science Collective',
    description: 'Machine learning enthusiasts, data analysts, and AI researchers collaborating and learning together.',
    category: 'Data Science',
    members: 1156,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
    is_joined: false,
    tags: ['Machine Learning', 'Python', 'AI']
  }
];

const mockEvents: CommunityEvent[] = [
  {
    id: '1',
    title: 'React 18 Features Deep Dive',
    description: 'Explore the latest React 18 features including concurrent rendering, automatic batching, and Suspense improvements.',
    organizer: 'Sarah Chen',
    organizer_avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    date: addDays(new Date(), 2).toISOString(),
    duration: '90 minutes',
    type: 'workshop',
    max_participants: 50,
    current_participants: 23,
    is_registered: false,
    meeting_url: 'https://meet.jit.si/react18-workshop',
    tags: ['React', 'JavaScript', 'Workshop']
  },
  {
    id: '2',
    title: 'Spanish Conversation Circle',
    description: 'Weekly Spanish conversation practice for intermediate learners. Topics include travel, culture, and daily life.',
    organizer: 'Marcus Johnson',
    organizer_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    date: addDays(new Date(), 1).toISOString(),
    duration: '60 minutes',
    type: 'study_group',
    max_participants: 15,
    current_participants: 8,
    is_registered: true,
    meeting_url: 'https://meet.jit.si/spanish-circle-weekly',
    tags: ['Spanish', 'Conversation', 'Intermediate']
  },
  {
    id: '3',
    title: 'Design System Best Practices',
    description: 'Learn how to build and maintain scalable design systems. Case studies from major tech companies.',
    organizer: 'Emma Wilson',
    organizer_avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    date: addDays(new Date(), 5).toISOString(),
    duration: '120 minutes',
    type: 'webinar',
    max_participants: 100,
    current_participants: 67,
    is_registered: false,
    tags: ['Design Systems', 'UI/UX', 'Best Practices']
  }
];

export default function Community() {
  const [groups, setGroups] = useState<CommunityGroup[]>(mockGroups);
  const [events, setEvents] = useState<CommunityEvent[]>(mockEvents);
  const [newEventOpen, setNewEventOpen] = useState(false);
  const { user } = useAuth();

  const handleJoinGroup = (groupId: string) => {
    setGroups(prev => prev.map(group => 
      group.id === groupId 
        ? { ...group, is_joined: !group.is_joined, members: group.is_joined ? group.members - 1 : group.members + 1 }
        : group
    ));
  };

  const handleRegisterEvent = (eventId: string) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { 
            ...event, 
            is_registered: !event.is_registered,
            current_participants: event.is_registered ? event.current_participants - 1 : event.current_participants + 1
          }
        : event
    ));
  };

  const handleJoinEvent = (eventUrl: string) => {
    if (eventUrl) {
      window.open(eventUrl, '_blank');
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'workshop': return <BookOpen className="h-4 w-4" />;
      case 'meetup': return <Coffee className="h-4 w-4" />;
      case 'study_group': return <Users className="h-4 w-4" />;
      case 'webinar': return <Video className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'workshop': return 'bg-blue-500';
      case 'meetup': return 'bg-green-500';
      case 'study_group': return 'bg-purple-500';
      case 'webinar': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Community</h1>
          <p className="text-muted-foreground">Connect with like-minded learners and join exciting events</p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">12.5K</p>
                  <p className="text-sm text-muted-foreground">Active Members</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-sm text-muted-foreground">Events This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">45</p>
                  <p className="text-sm text-muted-foreground">Groups</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                  <Trophy className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">2.1K</p>
                  <p className="text-sm text-muted-foreground">Skills Shared</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="events" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="events">Upcoming Events</TabsTrigger>
            <TabsTrigger value="groups">Community Groups</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Upcoming Events</h2>
              <Dialog open={newEventOpen} onOpenChange={setNewEventOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Create Community Event</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Event Title</Label>
                      <Input placeholder="Enter event title" />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea placeholder="Describe your event" rows={3} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Date & Time</Label>
                        <Input type="datetime-local" />
                      </div>
                      <div className="space-y-2">
                        <Label>Duration</Label>
                        <Input placeholder="e.g. 60 minutes" />
                      </div>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button variant="outline" onClick={() => setNewEventOpen(false)} className="flex-1">
                        Cancel
                      </Button>
                      <Button className="flex-1">Create Event</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((event) => {
                const eventDate = new Date(event.date);
                const isToday = eventDate.toDateString() === new Date().toDateString();
                const canJoin = event.is_registered && Math.abs(eventDate.getTime() - new Date().getTime()) < 30 * 60 * 1000;
                
                return (
                  <Card key={event.id} className="group hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg text-white ${getEventColor(event.type)}`}>
                            {getEventIcon(event.type)}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{event.title}</CardTitle>
                            <p className="text-sm text-muted-foreground capitalize">{event.type.replace('_', ' ')}</p>
                          </div>
                        </div>
                        <Badge variant={event.is_registered ? "default" : "secondary"}>
                          {event.is_registered ? "Registered" : "Available"}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <CardDescription>{event.description}</CardDescription>
                      
                      <div className="flex flex-wrap gap-2">
                        {event.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={event.organizer_avatar} alt={event.organizer} />
                            <AvatarFallback className="text-xs">
                              {event.organizer.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-muted-foreground">Organized by {event.organizer}</span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{format(eventDate, 'MMM d, h:mm a')}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{event.duration}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{event.current_participants}/{event.max_participants} participants</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        {canJoin && (
                          <Button 
                            size="sm" 
                            onClick={() => handleJoinEvent(event.meeting_url!)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Video className="h-4 w-4 mr-2" />
                            Join Now
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant={event.is_registered ? "outline" : "default"}
                          onClick={() => handleRegisterEvent(event.id)}
                          disabled={!event.is_registered && event.current_participants >= event.max_participants}
                        >
                          {event.is_registered ? "Unregister" : "Register"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="groups" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Community Groups</h2>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Create Group
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map((group) => (
                <Card key={group.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="aspect-video relative">
                    <img 
                      src={group.image} 
                      alt={group.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary">{group.category}</Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{group.name}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{group.members.toLocaleString()} members</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <CardDescription>{group.description}</CardDescription>
                    
                    <div className="flex flex-wrap gap-2">
                      {group.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button 
                      className="w-full"
                      variant={group.is_joined ? "outline" : "default"}
                      onClick={() => handleJoinGroup(group.id)}
                    >
                      {group.is_joined ? "Leave Group" : "Join Group"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="announcements" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Community Announcements</h2>
              <Button variant="outline">
                <Bell className="h-4 w-4 mr-2" />
                Subscribe to Updates
              </Button>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "New Feature: Video Call Integration",
                  content: "We've added seamless video calling to all learning sessions. Join meetings directly from your dashboard!",
                  date: "2024-09-06",
                  type: "feature"
                },
                {
                  title: "Weekly Challenge: Share Your Learning Story",
                  content: "This week's challenge is to share your most impactful learning experience. Winners get 100 bonus credits!",
                  date: "2024-09-05",
                  type: "challenge"
                },
                {
                  title: "Community Milestone: 10K Members!",
                  content: "We've reached 10,000 active members! Thank you for making SkillSwap an amazing learning community.",
                  date: "2024-09-04",
                  type: "milestone"
                }
              ].map((announcement, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${
                        announcement.type === 'feature' ? 'bg-blue-100 dark:bg-blue-900' :
                        announcement.type === 'challenge' ? 'bg-purple-100 dark:bg-purple-900' :
                        'bg-green-100 dark:bg-green-900'
                      }`}>
                        {announcement.type === 'feature' ? <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" /> :
                         announcement.type === 'challenge' ? <Trophy className="h-5 w-5 text-purple-600 dark:text-purple-400" /> :
                         <Star className="h-5 w-5 text-green-600 dark:text-green-400" />}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{announcement.title}</h3>
                        <p className="text-muted-foreground mb-2">{announcement.content}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(announcement.date), 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}