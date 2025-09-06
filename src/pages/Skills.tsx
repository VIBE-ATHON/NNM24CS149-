import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Search, Filter, Star, MapPin, Clock, Users, MessageCircle, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import BookingModal from '@/components/BookingModal';
import ChatModal from '@/components/ChatModal';

interface Skill {
  id: string;
  user_id: string;
  user_name: string;
  user_photo: string;
  user_location: string;
  skill_name: string;
  category: string;
  description: string;
  tags: string[];
  rating: number;
  reviews: number;
  proficiency_level: number;
  is_online: boolean;
  timezone: string;
}

// Mock skills data
const mockSkills: Skill[] = [
  {
    id: '1',
    user_id: '1',
    user_name: 'Sarah Chen',
    user_photo: '/images/SarahChen.jpg',
    user_location: 'San Francisco, CA',
    skill_name: 'React Development',
    category: 'Programming',
    description: 'Learn modern React with hooks, context, and best practices. I\'ll teach you component architecture, state management, and performance optimization.',
    tags: ['JavaScript', 'Frontend', 'UI/UX', 'Redux'],
    rating: 4.9,
    reviews: 23,
    proficiency_level: 5,
    is_online: true,
    timezone: 'PST'
  },
  {
    id: '2',
    user_id: '2',
    user_name: 'Marcus Johnson',
    user_photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    user_location: 'Madrid, Spain',
    skill_name: 'Spanish Conversation',
    category: 'Languages',
    description: 'Native Spanish speaker offering conversational practice for all levels. Focus on pronunciation, grammar, and cultural context.',
    tags: ['Language', 'Conversation', 'Culture', 'Grammar'],
    rating: 4.8,
    reviews: 45,
    proficiency_level: 5,
    is_online: false,
    timezone: 'CET'
  },
  {
    id: '3',
    user_id: '3',
    user_name: 'Emma Wilson',
    user_photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    user_location: 'London, UK',
    skill_name: 'Digital Marketing',
    category: 'Marketing',
    description: 'Learn effective digital marketing strategies that drive results. SEO, social media, content marketing, and analytics.',
    tags: ['SEO', 'Social Media', 'Analytics', 'Content'],
    rating: 4.7,
    reviews: 31,
    proficiency_level: 4,
    is_online: true,
    timezone: 'GMT'
  },
  {
    id: '4',
    user_id: '4',
    user_name: 'Alex Kumar',
    user_photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    user_location: 'Mumbai, India',
    skill_name: 'Python Programming',
    category: 'Programming',
    description: 'Master Python from basics to advanced topics. Data structures, algorithms, web development with Django/Flask.',
    tags: ['Python', 'Django', 'Flask', 'Backend'],
    rating: 4.6,
    reviews: 18,
    proficiency_level: 5,
    is_online: true,
    timezone: 'IST'
  },
  {
    id: '5',
    user_id: '5',
    user_name: 'Lisa Zhang',
    user_photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    user_location: 'Toronto, Canada',
    skill_name: 'Graphic Design',
    category: 'Design',
    description: 'Learn professional graphic design using Adobe Creative Suite. Logo design, branding, and visual identity.',
    tags: ['Adobe', 'Photoshop', 'Illustrator', 'Branding'],
    rating: 4.9,
    reviews: 27,
    proficiency_level: 4,
    is_online: false,
    timezone: 'EST'
  },
  {
    id: '6',
    user_id: '6',
    user_name: 'David Park',
    user_photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    user_location: 'Seoul, South Korea',
    skill_name: 'Machine Learning',
    category: 'Data Science',
    description: 'Comprehensive ML course covering supervised/unsupervised learning, neural networks, and practical applications.',
    tags: ['ML', 'AI', 'TensorFlow', 'Data Science'],
    rating: 4.8,
    reviews: 22,
    proficiency_level: 5,
    is_online: true,
    timezone: 'KST'
  }
];

const categories = ['All', 'Programming', 'Languages', 'Marketing', 'Design', 'Data Science', 'Music', 'Business'];
const sortOptions = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'alphabetical', label: 'Alphabetical' }
];

export default function Skills() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [chatOpen, setChatOpen] = useState<string | null>(null);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    mockSkills.forEach(skill => {
      skill.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, []);

  // Filter and sort skills
  const filteredSkills = useMemo(() => {
    const filtered = mockSkills.filter(skill => {
      const matchesSearch = skill.skill_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           skill.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           skill.user_name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
      
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.some(tag => skill.tags.includes(tag));
      
      return matchesSearch && matchesCategory && matchesTags;
    });

    // Sort results
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.skill_name.localeCompare(b.skill_name));
        break;
      case 'recent':
      default:
        // Keep original order for "recent"
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategory, sortBy, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Browse Skills</h1>
          <p className="text-xl text-muted-foreground">
            Discover amazing skills from our community of learners and teachers
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search skills, people, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort Filter */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex-1" />
            
            <div className="text-sm text-muted-foreground">
              {filteredSkills.length} skills found
            </div>
          </div>

          {/* Tags Filter */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Filter by tags:</h3>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "secondary"}
                  className="cursor-pointer hover:bg-primary hover:text-white transition-colors"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            {selectedTags.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedTags([])}
                className="text-xs"
              >
                Clear all tags
              </Button>
            )}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map(skill => (
            <Card key={skill.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12 cursor-pointer" asChild>
                        <Link to={`/profile/${skill.user_id}`}>
                          <AvatarImage src={skill.user_photo} alt={skill.user_name} />
                          <AvatarFallback>{skill.user_name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Link>
                      </Avatar>
                      {skill.is_online && (
                        <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-background" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg hover:text-primary cursor-pointer" asChild>
                        <Link to={`/profile/${skill.user_id}`}>{skill.skill_name}</Link>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground hover:text-primary cursor-pointer" asChild>
                        <Link to={`/profile/${skill.user_id}`}>{skill.user_name}</Link>
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {skill.category}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <CardDescription className="line-clamp-3">
                  {skill.description}
                </CardDescription>
                
                <div className="flex flex-wrap gap-1">
                  {skill.tags.slice(0, 3).map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {skill.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{skill.tags.length - 3}
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{skill.user_location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{skill.timezone}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{skill.rating}</span>
                      <span className="text-sm text-muted-foreground">({skill.reviews})</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/profile/${skill.user_id}`}>
                        <User className="h-4 w-4 mr-1" />
                        Profile
                      </Link>
                    </Button>
                    <ChatModal 
                      isOpen={chatOpen === skill.user_id}
                      onOpenChange={(open) => setChatOpen(open ? skill.user_id : null)}
                      recipientName={skill.user_name}
                      recipientAvatar={skill.user_photo}
                    >
                      <Button size="sm" variant="outline">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Chat
                      </Button>
                    </ChatModal>
                    <BookingModal 
                      skillName={skill.skill_name}
                      teacherId={skill.user_id}
                      teacherName={skill.user_name}
                    >
                      <Button size="sm" className="group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        Book Session
                      </Button>
                    </BookingModal>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredSkills.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No skills found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or browse different categories
            </p>
            <Button onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSelectedTags([]);
            }}>
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}