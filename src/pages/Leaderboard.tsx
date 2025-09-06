import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  Star, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Crown,
  Medal,
  Award,
  Coins
} from 'lucide-react';

interface LeaderboardUser {
  id: string;
  name: string;
  photo_url: string;
  location: string;
  total_sessions: number;
  rating: number;
  credits_earned: number;
  students_taught: number;
  skills_mastered: number;
  streak_days: number;
  badges: number;
}

const mockLeaderboardData: LeaderboardUser[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    photo_url: '/images/portrait.jpg',
    location: 'San Francisco, CA',
    total_sessions: 156,
    rating: 4.9,
    credits_earned: 2340,
    students_taught: 89,
    skills_mastered: 8,
    streak_days: 45,
    badges: 12
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    location: 'Madrid, Spain',
    total_sessions: 203,
    rating: 4.8,
    credits_earned: 3050,
    students_taught: 124,
    skills_mastered: 6,
    streak_days: 32,
    badges: 15
  },
  {
    id: '3',
    name: 'Emma Wilson',
    photo_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    location: 'London, UK',
    total_sessions: 134,
    rating: 4.7,
    credits_earned: 2010,
    students_taught: 67,
    skills_mastered: 5,
    streak_days: 28,
    badges: 9
  },
  {
    id: '4',
    name: 'Alex Kumar',
    photo_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    location: 'Mumbai, India',
    total_sessions: 98,
    rating: 4.6,
    credits_earned: 1470,
    students_taught: 45,
    skills_mastered: 7,
    streak_days: 21,
    badges: 8
  },
  {
    id: '5',
    name: 'Lisa Zhang',
    photo_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    location: 'Toronto, Canada',
    total_sessions: 87,
    rating: 4.9,
    credits_earned: 1305,
    students_taught: 52,
    skills_mastered: 4,
    streak_days: 19,
    badges: 7
  },
  {
    id: '6',
    name: 'David Park',
    photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    location: 'Seoul, South Korea',
    total_sessions: 76,
    rating: 4.8,
    credits_earned: 1140,
    students_taught: 38,
    skills_mastered: 6,
    streak_days: 15,
    badges: 6
  }
];

const getRankIcon = (position: number) => {
  switch (position) {
    case 1:
      return <Crown className="h-6 w-6 text-yellow-500" />;
    case 2:
      return <Medal className="h-6 w-6 text-gray-400" />;
    case 3:
      return <Award className="h-6 w-6 text-amber-600" />;
    default:
      return <span className="text-lg font-bold text-muted-foreground">#{position}</span>;
  }
};

const getRankColor = (position: number) => {
  switch (position) {
    case 1:
      return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
    case 2:
      return 'bg-gradient-to-r from-gray-300 to-gray-500';
    case 3:
      return 'bg-gradient-to-r from-amber-400 to-amber-600';
    default:
      return 'bg-gradient-to-r from-blue-400 to-blue-600';
  }
};

export default function Leaderboard() {
  const [selectedTab, setSelectedTab] = useState('sessions');

  const getSortedUsers = (criteria: string) => {
    const sorted = [...mockLeaderboardData];
    switch (criteria) {
      case 'sessions':
        return sorted.sort((a, b) => b.total_sessions - a.total_sessions);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'credits':
        return sorted.sort((a, b) => b.credits_earned - a.credits_earned);
      case 'students':
        return sorted.sort((a, b) => b.students_taught - a.students_taught);
      default:
        return sorted;
    }
  };

  const getStatValue = (user: LeaderboardUser, criteria: string) => {
    switch (criteria) {
      case 'sessions':
        return user.total_sessions;
      case 'rating':
        return user.rating.toFixed(1);
      case 'credits':
        return user.credits_earned;
      case 'students':
        return user.students_taught;
      default:
        return user.total_sessions;
    }
  };

  const getStatLabel = (criteria: string) => {
    switch (criteria) {
      case 'sessions':
        return 'Sessions';
      case 'rating':
        return 'Rating';
      case 'credits':
        return 'Credits';
      case 'students':
        return 'Students';
      default:
        return 'Sessions';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Trophy className="h-8 w-8 text-yellow-500" />
            Leaderboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Celebrating our top teachers and learners
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-sm text-muted-foreground">Total Sessions</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">456</div>
              <p className="text-sm text-muted-foreground">Active Teachers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Coins className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">18,350</div>
              <p className="text-sm text-muted-foreground">Credits Earned</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-sm text-muted-foreground">Avg Rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="sessions" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Sessions
            </TabsTrigger>
            <TabsTrigger value="rating" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Rating
            </TabsTrigger>
            <TabsTrigger value="credits" className="flex items-center gap-2">
              <Coins className="h-4 w-4" />
              Credits
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Students
            </TabsTrigger>
          </TabsList>

          {['sessions', 'rating', 'credits', 'students'].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <div className="space-y-4">
                {getSortedUsers(tab).map((user, index) => {
                  const position = index + 1;
                  return (
                    <Card key={user.id} className={`overflow-hidden ${position <= 3 ? 'ring-2 ring-primary/20' : ''}`}>
                      <CardContent className="p-0">
                        <div className="flex items-center gap-4 p-6">
                          {/* Rank */}
                          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted">
                            {getRankIcon(position)}
                          </div>

                          {/* User Info */}
                          <div className="flex items-center gap-4 flex-1">
                            <Avatar className="h-16 w-16">
                              <AvatarImage src={user.photo_url} alt={user.name} />
                              <AvatarFallback>
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold hover:text-primary cursor-pointer">
                                <Link to={`/profile/${user.id}`}>{user.name}</Link>
                              </h3>
                              <p className="text-sm text-muted-foreground">{user.location}</p>
                              <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                  <span className="text-sm">{user.rating}</span>
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                  {user.badges} badges
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {user.streak_days} day streak
                                </Badge>
                              </div>
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="text-right">
                            <div className={`text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${getRankColor(position)}`}>
                              {getStatValue(user, tab)}
                            </div>
                            <p className="text-sm text-muted-foreground">{getStatLabel(tab)}</p>
                          </div>

                          {/* Action Button */}
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/profile/${user.id}`}>
                              View Profile
                            </Link>
                          </Button>
                        </div>

                        {/* Top 3 Special Styling */}
                        {position <= 3 && (
                          <div className={`h-2 ${getRankColor(position)}`} />
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Achievement Showcase */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-purple-500" />
              Recent Achievements
            </CardTitle>
            <CardDescription>Latest milestones reached by our community</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { user: 'Sarah Chen', achievement: 'Completed 150th session', time: '2 hours ago', icon: '🎯' },
                { user: 'Marcus Johnson', achievement: 'Earned "Language Master" badge', time: '5 hours ago', icon: '🏆' },
                { user: 'Emma Wilson', achievement: 'Reached 30-day teaching streak', time: '1 day ago', icon: '🔥' },
                { user: 'Alex Kumar', achievement: 'Earned 1000 credits milestone', time: '2 days ago', icon: '💰' }
              ].map((achievement, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <p className="font-medium">{achievement.user}</p>
                    <p className="text-sm text-muted-foreground">{achievement.achievement}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{achievement.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}