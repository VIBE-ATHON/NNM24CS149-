import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Calendar, 
  MessageCircle, 
  Trophy, 
  ArrowRight, 
  Star,
  Clock,
  Globe,
  Zap,
  Target,
  BookOpen,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthModal from '@/components/AuthModal';

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Exchange Skills,
              <br />
              Expand Horizons
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Connect with peers worldwide to teach what you know and learn what you need. 
              Join the future of collaborative learning.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <AuthModal>
                <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  Sign Up Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </AuthModal>
              <Link to="/skills">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  Browse Skills
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>10,000+ learners</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>4.9/5 rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>50+ countries</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How SkillSwap Works</h2>
            <p className="text-xl text-muted-foreground">Four simple steps to start your learning journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Create Profile',
                description: 'Set up your profile with skills you can teach and want to learn',
                icon: <Users className="h-8 w-8" />,
                color: 'from-blue-500 to-cyan-500'
              },
              {
                step: '02',
                title: 'Find Matches',
                description: 'Our smart algorithm finds perfect skill exchange partners for you',
                icon: <Target className="h-8 w-8" />,
                color: 'from-indigo-500 to-purple-500'
              },
              {
                step: '03',
                title: 'Schedule Sessions',
                description: 'Book flexible 30, 60, or 120-minute learning sessions',
                icon: <Calendar className="h-8 w-8" />,
                color: 'from-purple-500 to-pink-500'
              },
              {
                step: '04',
                title: 'Learn & Teach',
                description: 'Connect via video calls, earn credits, and unlock achievements',
                icon: <Trophy className="h-8 w-8" />,
                color: 'from-pink-500 to-rose-500'
              }
            ].map((item, index) => (
              <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center pb-2">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <div className="text-sm font-mono text-muted-foreground mb-2">{item.step}</div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground">Everything you need for effective peer-to-peer learning</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-6 w-6" />,
                title: 'Smart Matching',
                description: 'AI-powered algorithm finds your perfect learning partners based on skills, location, and availability.'
              },
              {
                icon: <MessageCircle className="h-6 w-6" />,
                title: 'Real-time Chat',
                description: 'Built-in messaging system to coordinate sessions and ask quick questions.'
              },
              {
                icon: <Calendar className="h-6 w-6" />,
                title: 'Flexible Scheduling',
                description: 'Book sessions that fit your schedule with integrated calendar management.'
              },
              {
                icon: <Award className="h-6 w-6" />,
                title: 'Gamification',
                description: 'Earn badges, credits, and climb leaderboards as you teach and learn.'
              },
              {
                icon: <BookOpen className="h-6 w-6" />,
                title: 'Community Forum',
                description: 'Ask questions, share knowledge, and connect with the learning community.'
              },
              {
                icon: <Clock className="h-6 w-6" />,
                title: 'Progress Tracking',
                description: 'Monitor your learning journey with detailed analytics and achievements.'
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-md transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Skills Preview */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Skills</h2>
            <p className="text-xl text-muted-foreground">Discover what our community is teaching and learning</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Sarah Chen',
                skill: 'React Development',
                rating: 4.9,
                reviews: 23,
                photo: '/images/SarahChen.jpg',
                tags: ['JavaScript', 'Frontend', 'UI/UX'],
                description: 'Learn modern React with hooks, context, and best practices from a senior developer.'
              },
              {
                name: 'Marcus Johnson',
                skill: 'Spanish Conversation',
                rating: 4.8,
                reviews: 45,
                photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
                tags: ['Language', 'Conversation', 'Culture'],
                description: 'Native speaker offering conversational Spanish practice for all levels.'
              },
              {
                name: 'Emma Wilson',
                skill: 'Digital Marketing',
                rating: 4.7,
                reviews: 31,
                photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
                tags: ['Marketing', 'SEO', 'Social Media'],
                description: 'Learn effective digital marketing strategies that actually drive results.'
              }
            ].map((teacher, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={teacher.photo} alt={teacher.name} />
                      <AvatarFallback>{teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{teacher.skill}</CardTitle>
                      <p className="text-sm text-muted-foreground">{teacher.name}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <CardDescription>{teacher.description}</CardDescription>
                  
                  <div className="flex flex-wrap gap-1">
                    {teacher.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{teacher.rating}</span>
                      <span className="text-sm text-muted-foreground">({teacher.reviews})</span>
                    </div>
                    <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/skills">
              <Button size="lg" variant="outline">
                Explore All Skills
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of learners who are already exchanging skills and growing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AuthModal>
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Sign Up Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </AuthModal>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-blue-600">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}