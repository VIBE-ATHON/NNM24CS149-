import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useCredits } from '@/contexts/CreditContext';
import BookingModal from '@/components/BookingModal';
import ChatModal from '@/components/ChatModal';
import { 
  Users, 
  ArrowLeftRight, 
  Star, 
  MapPin, 
  Clock, 
  MessageCircle,
  Heart,
  X,
  Check,
  Zap,
  Target
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface SkillMatch {
  id: string;
  user_id: string;
  user_name: string;
  user_photo: string;
  user_location: string;
  skill_offering: string;
  skill_seeking: string;
  compatibility_score: number;
  rating: number;
  sessions_completed: number;
  is_online: boolean;
  timezone: string;
  mutual_interests: string[];
  match_type: 'perfect' | 'good' | 'potential';
}

const mockMatches: SkillMatch[] = [
  {
    id: '1',
    user_id: '2',
    user_name: 'Marcus Johnson',
    user_photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    user_location: 'Madrid, Spain',
    skill_offering: 'Spanish Conversation',
    skill_seeking: 'English Writing',
    compatibility_score: 95,
    rating: 4.8,
    sessions_completed: 203,
    is_online: true,
    timezone: 'CET',
    mutual_interests: ['Languages', 'Culture', 'Travel'],
    match_type: 'perfect'
  },
  {
    id: '2',
    user_id: '3',
    user_name: 'Emma Wilson',
    user_photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    user_location: 'London, UK',
    skill_offering: 'Digital Marketing',
    skill_seeking: 'Web Development',
    compatibility_score: 87,
    rating: 4.7,
    sessions_completed: 134,
    is_online: false,
    timezone: 'GMT',
    mutual_interests: ['Marketing', 'Technology', 'Business'],
    match_type: 'good'
  },
  {
    id: '3',
    user_id: '4',
    user_name: 'Alex Kumar',
    user_photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    user_location: 'Mumbai, India',
    skill_offering: 'Python Programming',
    skill_seeking: 'UI/UX Design',
    compatibility_score: 78,
    rating: 4.6,
    sessions_completed: 98,
    is_online: true,
    timezone: 'IST',
    mutual_interests: ['Programming', 'Technology'],
    match_type: 'good'
  },
  {
    id: '4',
    user_id: '5',
    user_name: 'Lisa Zhang',
    user_photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    user_location: 'Toronto, Canada',
    skill_offering: 'Graphic Design',
    skill_seeking: 'Photography',
    compatibility_score: 72,
    rating: 4.9,
    sessions_completed: 87,
    is_online: false,
    timezone: 'EST',
    mutual_interests: ['Design', 'Art'],
    match_type: 'potential'
  }
];

const getMatchTypeColor = (type: string) => {
  switch (type) {
    case 'perfect':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'good':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'potential':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getMatchTypeIcon = (type: string) => {
  switch (type) {
    case 'perfect':
      return <Target className="h-4 w-4" />;
    case 'good':
      return <Zap className="h-4 w-4" />;
    case 'potential':
      return <Heart className="h-4 w-4" />;
    default:
      return <Users className="h-4 w-4" />;
  }
};

export default function SkillMatching() {
  const { user } = useAuth();
  const { credits, spendCredits } = useCredits();
  const [matches, setMatches] = useState(mockMatches);
  const [chatOpen, setChatOpen] = useState<string | null>(null);
  const [userSkillOffering, setUserSkillOffering] = useState('English Writing');
  const [userSkillSeeking, setUserSkillSeeking] = useState('Spanish Conversation');

  const handleLike = (matchId: string) => {
    if (spendCredits(5, 'Skill match like')) {
      setMatches(prev => prev.filter(match => match.id !== matchId));
      // Simulate match notification
      setTimeout(() => {
        alert('🎉 It\'s a match! You can now chat with this user.');
      }, 500);
    } else {
      alert('Not enough credits! You need 5 credits to like a match.');
    }
  };

  const handlePass = (matchId: string) => {
    setMatches(prev => prev.filter(match => match.id !== matchId));
  };

  const handleSuperLike = (matchId: string) => {
    if (spendCredits(15, 'Super like')) {
      setMatches(prev => prev.filter(match => match.id !== matchId));
      // Simulate super match notification
      setTimeout(() => {
        alert('⭐ Super Match! Your profile will be highlighted to this user.');
      }, 500);
    } else {
      alert('Not enough credits! You need 15 credits for a super like.');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
            <ArrowLeftRight className="h-8 w-8 text-primary" />
            Skill Matching
          </h1>
          <p className="text-xl text-muted-foreground">
            Find perfect learning partners through mutual skill exchange
          </p>
        </div>

        {/* User's Skills */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Skills Profile</CardTitle>
            <CardDescription>Update your skills to get better matches</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">I can teach:</label>
                <Input
                  value={userSkillOffering}
                  onChange={(e) => setUserSkillOffering(e.target.value)}
                  placeholder="What skill can you teach?"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">I want to learn:</label>
                <Input
                  value={userSkillSeeking}
                  onChange={(e) => setUserSkillSeeking(e.target.value)}
                  placeholder="What skill do you want to learn?"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Credits: {credits}</span>
                <span>•</span>
                <span>Like: 5 credits</span>
                <span>•</span>
                <span>Super Like: 15 credits</span>
              </div>
              <Button>Update Skills</Button>
            </div>
          </CardContent>
        </Card>

        {/* Matches */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Your Matches</h2>
            <Badge variant="outline" className="text-sm">
              {matches.length} potential matches
            </Badge>
          </div>

          {matches.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No more matches</h3>
                <p className="text-muted-foreground mb-4">
                  You've seen all available matches. Check back later for new members!
                </p>
                <Button>Refresh Matches</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {matches.map((match) => (
                <Card key={match.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={match.user_photo} alt={match.user_name} />
                            <AvatarFallback>
                              {match.user_name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          {match.is_online && (
                            <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-background" />
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-xl hover:text-primary cursor-pointer">
                            <Link to={`/profile/${match.user_id}`}>{match.user_name}</Link>
                          </CardTitle>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{match.user_location}</span>
                            <span>•</span>
                            <Clock className="h-3 w-3" />
                            <span>{match.timezone}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className={`${getMatchTypeColor(match.match_type)} flex items-center gap-1`}>
                        {getMatchTypeIcon(match.match_type)}
                        {match.compatibility_score}% match
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Skill Exchange */}
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <ArrowLeftRight className="h-4 w-4" />
                        Skill Exchange
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">They teach:</span>
                          <Badge variant="secondary">{match.skill_offering}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">They want:</span>
                          <Badge variant="outline">{match.skill_seeking}</Badge>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{match.rating}</span>
                      </div>
                      <span className="text-muted-foreground">{match.sessions_completed} sessions</span>
                    </div>

                    {/* Mutual Interests */}
                    <div>
                      <h5 className="text-sm font-medium mb-2">Mutual Interests:</h5>
                      <div className="flex flex-wrap gap-1">
                        {match.mutual_interests.map((interest, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePass(match.id)}
                        className="flex-1"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Pass
                      </Button>
                      
                      <ChatModal 
                        isOpen={chatOpen === match.user_id}
                        onOpenChange={(open) => setChatOpen(open ? match.user_id : null)}
                        recipientName={match.user_name}
                        recipientAvatar={match.user_photo}
                      >
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Chat
                        </Button>
                      </ChatModal>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuperLike(match.id)}
                        className="text-yellow-600 hover:text-yellow-700"
                      >
                        <Star className="h-4 w-4 mr-1" />
                        Super
                      </Button>

                      <Button
                        size="sm"
                        onClick={() => handleLike(match.id)}
                        className="flex-1"
                      >
                        <Heart className="h-4 w-4 mr-1" />
                        Like
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* How It Works */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How Skill Matching Works</CardTitle>
            <CardDescription>Learn about our dual matching system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Perfect Match</h3>
                <p className="text-sm text-muted-foreground">
                  When your teaching skill matches their learning need and vice versa
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Good Match</h3>
                <p className="text-sm text-muted-foreground">
                  High compatibility based on skills, interests, and learning style
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="font-semibold mb-2">Potential Match</h3>
                <p className="text-sm text-muted-foreground">
                  Some overlap in skills or interests, worth exploring
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}