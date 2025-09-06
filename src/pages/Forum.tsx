import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Search, 
  Plus, 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  Eye,
  Clock,
  Pin,
  Users,
  TrendingUp
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author_id: string;
  author_name: string;
  author_avatar: string;
  category: string;
  tags: string[];
  upvotes: number;
  downvotes: number;
  replies: number;
  views: number;
  created_at: string;
  is_pinned: boolean;
  last_activity: string;
}

const mockPosts: ForumPost[] = [
  {
    id: '1',
    title: 'Best practices for learning React hooks?',
    content: 'I\'m transitioning from class components to hooks and looking for advice on best practices. What are the most important hooks to master first?',
    author_id: '1',
    author_name: 'Sarah Chen',
    author_avatar: '/images/Programming.jpg',
    category: 'Programming',
    tags: ['React', 'JavaScript', 'Hooks'],
    upvotes: 15,
    downvotes: 2,
    replies: 8,
    views: 124,
    created_at: '2024-09-05T10:30:00Z',
    is_pinned: false,
    last_activity: '2024-09-06T14:20:00Z'
  },
  {
    id: '2',
    title: 'Spanish pronunciation tips for beginners',
    content: 'I\'m struggling with Spanish pronunciation, especially with rolling R\'s. Any native speakers have tips?',
    author_id: '2',
    author_name: 'Alex Kumar',
    author_avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    category: 'Languages',
    tags: ['Spanish', 'Pronunciation', 'Beginner'],
    upvotes: 23,
    downvotes: 1,
    replies: 12,
    views: 89,
    created_at: '2024-09-04T15:45:00Z',
    is_pinned: true,
    last_activity: '2024-09-06T09:15:00Z'
  },
  {
    id: '3',
    title: 'Machine Learning roadmap for 2024',
    content: 'What would be a good learning path for someone starting ML in 2024? Should I focus on traditional ML first or jump into deep learning?',
    author_id: '3',
    author_name: 'Emma Wilson',
    author_avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    category: 'Data Science',
    tags: ['Machine Learning', 'AI', 'Career'],
    upvotes: 31,
    downvotes: 3,
    replies: 15,
    views: 203,
    created_at: '2024-09-03T08:20:00Z',
    is_pinned: false,
    last_activity: '2024-09-06T16:30:00Z'
  }
];

const categories = ['All', 'Programming', 'Languages', 'Data Science', 'Design', 'Marketing', 'Music', 'General'];

export default function Forum() {
  const [posts, setPosts] = useState<ForumPost[]>(mockPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('recent');
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: '',
    tags: ''
  });
  const { user } = useAuth();

  const filteredPosts = posts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
        case 'replies':
          return b.replies - a.replies;
        case 'views':
          return b.views - a.views;
        case 'recent':
        default:
          return new Date(b.last_activity).getTime() - new Date(a.last_activity).getTime();
      }
    });

  const handleCreatePost = () => {
    if (!user || !newPost.title || !newPost.content || !newPost.category) return;

    const post: ForumPost = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      author_id: user.id,
      author_name: user.name,
      author_avatar: user.photo_url || '',
      category: newPost.category,
      tags: newPost.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      upvotes: 0,
      downvotes: 0,
      replies: 0,
      views: 0,
      created_at: new Date().toISOString(),
      is_pinned: false,
      last_activity: new Date().toISOString()
    };

    setPosts(prev => [post, ...prev]);
    setNewPost({ title: '', content: '', category: '', tags: '' });
    setNewPostOpen(false);
  };

  const handleVote = (postId: string, voteType: 'up' | 'down') => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? {
            ...post,
            upvotes: voteType === 'up' ? post.upvotes + 1 : post.upvotes,
            downvotes: voteType === 'down' ? post.downvotes + 1 : post.downvotes
          }
        : post
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Community Forum</h1>
            <p className="text-muted-foreground">Ask questions, share knowledge, and connect with learners</p>
          </div>
          
          <Dialog open={newPostOpen} onOpenChange={setNewPostOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="What's your question or topic?"
                    value={newPost.title}
                    onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={newPost.category} onValueChange={(value) => setNewPost(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter(cat => cat !== 'All').map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Describe your question or share your knowledge..."
                    rows={6}
                    value={newPost.content}
                    onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    placeholder="e.g. react, javascript, beginner"
                    value={newPost.tags}
                    onChange={(e) => setNewPost(prev => ({ ...prev, tags: e.target.value }))}
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setNewPostOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleCreatePost} 
                    className="flex-1"
                    disabled={!newPost.title || !newPost.content || !newPost.category || !user}
                  >
                    Create Post
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
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
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="replies">Most Replies</SelectItem>
              <SelectItem value="views">Most Views</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Forum Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Total Posts</span>
              </div>
              <p className="text-2xl font-bold mt-1">{posts.length}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Active Members</span>
              </div>
              <p className="text-2xl font-bold mt-1">1,234</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium">This Week</span>
              </div>
              <p className="text-2xl font-bold mt-1">+45</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">Helpful Answers</span>
              </div>
              <p className="text-2xl font-bold mt-1">892</p>
            </CardContent>
          </Card>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  {/* Vote Section */}
                  <div className="flex flex-col items-center gap-2 min-w-[60px]">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVote(post.id, 'up')}
                      className="h-8 w-8 p-0"
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <span className="font-semibold text-lg">
                      {post.upvotes - post.downvotes}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVote(post.id, 'down')}
                      className="h-8 w-8 p-0"
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Post Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {post.is_pinned && <Pin className="h-4 w-4 text-blue-500" />}
                        <h3 className="text-lg font-semibold hover:text-blue-600 cursor-pointer">
                          {post.title}
                        </h3>
                      </div>
                      <Badge variant="outline">{post.category}</Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-3 line-clamp-2">
                      {post.content}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={post.author_avatar} alt={post.author_name} />
                            <AvatarFallback className="text-xs">
                              {post.author_name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span>{post.author_name}</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{formatDistanceToNow(new Date(post.created_at))} ago</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{post.replies}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{post.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No posts found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or create the first post in this category
            </p>
            <Button onClick={() => setNewPostOpen(true)}>
              Create First Post
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}