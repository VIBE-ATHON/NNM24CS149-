import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import BookingModal from '@/components/BookingModal';
import ChatModal from '@/components/ChatModal';
import { 
  Star, 
  MapPin, 
  Calendar, 
  Users, 
  MessageCircle, 
  UserPlus, 
  UserMinus,
  Trophy,
  Clock,
  BookOpen,
  Heart
} from 'lucide-react';
import { format } from 'date-fns';

interface UserProfileData {
  id: string;
  name: string;
  email: string;
  photo_url: string;
  location: string;
  bio: string;
  skills_teaching: string[];
  skills_learning: string[];
  rating: number;
  total_sessions: number;
  followers: number;
  following: number;
  is_following: boolean;
  joined_date: string;
  badges: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
    earned_at: string;
  }>;
  reviews: Array<{
    id: string;
    reviewer_name: string;
    reviewer_avatar: string;
    skill_name: string;
    rating: number;
    comment: string;
    created_at: string;
  }>;
}

// Mock user profiles
const mockUsers: Record<string, UserProfileData> = {
  '1': {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    photo_url: '/images/portrait.jpg',
    location: 'San Francisco, CA',
    bio: 'Senior Frontend Developer with 8+ years of experience in React, TypeScript, and modern web technologies. Passionate about teaching and helping others grow in their development journey.',
    skills_teaching: ['React Development', 'JavaScript', 'TypeScript', 'UI/UX Design'],
    skills_learning: ['Machine Learning', 'Python', 'Data Science'],
    rating: 4.9,
    total_sessions: 156,
    followers: 342,
    following: 89,
    is_following: false,
    joined_date: '2023-01-15',
    badges: [
      {
        id: '1',
        name: 'Expert Teacher',
        description: 'Completed 100+ teaching sessions',
        icon: '🏆',
        earned_at: '2024-06-15'
      },
      {
        id: '2',
        name: 'Community Helper',
        description: 'Highly rated by students',
        icon: '⭐',
        earned_at: '2024-05-20'
      }
    ],
    reviews: [
      {
        id: '1',
        reviewer_name: 'Mike Johnson',
        reviewer_avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
        skill_name: 'React Development',
        rating: 5,
        comment: 'Sarah is an excellent teacher! She explained React hooks in a way that finally made sense to me.',
        created_at: '2024-08-15'
      },
      {
        id: '2',
        reviewer_name: 'Anna Smith',
        reviewer_avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
        skill_name: 'TypeScript',
        rating: 5,
        comment: 'Great session on TypeScript best practices. Very knowledgeable and patient.',
        created_at: '2024-08-10'
      }
    ]
  },
  '2': {
    id: '2',
    name: 'Marcus Johnson',
    email: 'marcus.johnson@example.com',
    photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    location: 'Madrid, Spain',
    bio: 'Native Spanish speaker and certified language teacher. I love helping people discover the beauty of Spanish language and culture.',
    skills_teaching: ['Spanish Conversation', 'Spanish Grammar', 'Latin American Culture'],
    skills_learning: ['Portuguese', 'Italian', 'Photography'],
    rating: 4.8,
    total_sessions: 203,
    followers: 456,
    following: 123,
    is_following: true,
    joined_date: '2022-09-20',
    badges: [
      {
        id: '1',
        name: 'Language Master',
        description: 'Expert in multiple languages',
        icon: '🗣️',
        earned_at: '2024-03-10'
      }
    ],
    reviews: [
      {
        id: '1',
        reviewer_name: 'Lisa Wong',
        reviewer_avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face',
        skill_name: 'Spanish Conversation',
        rating: 5,
        comment: 'Marcus makes learning Spanish so enjoyable! His cultural insights are invaluable.',
        created_at: '2024-08-20'
      }
    ]
  }
};

export default function UserProfile() {
  const { userId } = useParams<{ userId: string }>();
  const { user: currentUser } = useAuth();
  const [chatOpen, setChatOpen] = useState(false);
  
  const profileUser = userId ? mockUsers[userId] : null;
  const [isFollowing, setIsFollowing] = useState(profileUser?.is_following || false);
  const [followerCount, setFollowerCount] = useState(profileUser?.followers || 0);

  if (!profileUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>User Not Found</CardTitle>
            <CardDescription>The user profile you're looking for doesn't exist.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    setFollowerCount(prev => isFollowing ? prev - 1 : prev + 1);
  };

  const isOwnProfile = currentUser?.id === profileUser.id;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src={profileUser.photo_url} alt={profileUser.name} />
                  <AvatarFallback className="text-2xl">
                    {profileUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex gap-2">
                  {!isOwnProfile && (
                    <>
                      <Button 
                        variant={isFollowing ? "outline" : "default"}
                        onClick={handleFollowToggle}
                        className="flex items-center gap-2"
                      >
                        {isFollowing ? <UserMinus className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                        {isFollowing ? 'Unfollow' : 'Follow'}
                      </Button>
                      
                      <ChatModal 
                        isOpen={chatOpen}
                        onOpenChange={setChatOpen}
                        recipientName={profileUser.name}
                        recipientAvatar={profileUser.photo_url}
                      >
                        <Button variant="outline">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                      </ChatModal>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{profileUser.name}</h1>
                    <div className="flex items-center gap-4 text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{profileUser.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {format(new Date(profileUser.joined_date), 'MMM yyyy')}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6">{profileUser.bio}</p>
                
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-2xl font-bold">{profileUser.rating}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Rating</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                      <span className="text-2xl font-bold">{profileUser.total_sessions}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Sessions</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Users className="h-4 w-4 text-green-500" />
                      <span className="text-2xl font-bold">{followerCount}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Followers</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span className="text-2xl font-bold">{profileUser.following}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Following</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Content */}
        <Tabs defaultValue="skills" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="skills" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    Teaching Skills
                  </CardTitle>
                  <CardDescription>Skills {profileUser.name} can teach</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profileUser.skills_teaching.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{skill}</h3>
                        <p className="text-sm text-muted-foreground">Expert level</p>
                      </div>
                      {!isOwnProfile && (
                        <BookingModal 
                          skillName={skill}
                          teacherId={profileUser.id}
                          teacherName={profileUser.name}
                        >
                          <Button size="sm">Book Session</Button>
                        </BookingModal>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    Learning Goals
                  </CardTitle>
                  <CardDescription>Skills {profileUser.name} wants to learn</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {profileUser.skills_learning.map((skill, index) => (
                    <Badge key={index} variant="outline" className="mr-2 mb-2">
                      {skill}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Reviews & Feedback</CardTitle>
                <CardDescription>What students say about {profileUser.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {profileUser.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={review.reviewer_avatar} alt={review.reviewer_name} />
                        <AvatarFallback>
                          {review.reviewer_name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-medium">{review.reviewer_name}</h4>
                            <p className="text-sm text-muted-foreground">{review.skill_name}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm mb-2">{review.comment}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(review.created_at), 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="badges">
            <Card>
              <CardHeader>
                <CardTitle>Achievements & Badges</CardTitle>
                <CardDescription>Recognition earned by {profileUser.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {profileUser.badges.map((badge) => (
                    <div key={badge.id} className="text-center p-6 border rounded-lg">
                      <div className="text-4xl mb-3">{badge.icon}</div>
                      <h3 className="font-semibold mb-2">{badge.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{badge.description}</p>
                      <p className="text-xs text-muted-foreground">
                        Earned {format(new Date(badge.earned_at), 'MMM d, yyyy')}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest learning and teaching activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: 'taught', skill: 'React Development', student: 'Mike Johnson', date: '2024-09-05' },
                    { type: 'learned', skill: 'Machine Learning', teacher: 'David Park', date: '2024-09-03' },
                    { type: 'badge', name: 'Expert Teacher', date: '2024-09-01' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="p-2 bg-primary/10 rounded-full">
                        {activity.type === 'taught' && <Trophy className="h-4 w-4 text-yellow-500" />}
                        {activity.type === 'learned' && <BookOpen className="h-4 w-4 text-blue-500" />}
                        {activity.type === 'badge' && <Star className="h-4 w-4 text-purple-500" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          {activity.type === 'taught' && `Taught ${activity.skill} to ${activity.student}`}
                          {activity.type === 'learned' && `Learned ${activity.skill} from ${activity.teacher}`}
                          {activity.type === 'badge' && `Earned ${activity.name} badge`}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(activity.date), 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}