import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { BookingProvider } from '@/contexts/BookingContext';
import { CreditProvider } from '@/contexts/CreditContext';
import Layout from '@/components/Layout';
import Index from './pages/Index';
import Skills from './pages/Skills';
import Dashboard from './pages/Dashboard';
import Forum from './pages/Forum';
import Community from './pages/Community';
import UserProfile from './pages/UserProfile';
import Leaderboard from './pages/Leaderboard';
import SkillMatching from './pages/SkillMatching';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <CreditProvider>
          <BookingProvider>
            <TooltipProvider>
              <Toaster />
              <BrowserRouter>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/skills" element={<Skills />} />
                    <Route path="/matching" element={<SkillMatching />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/forum" element={<Forum />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/profile/:userId" element={<UserProfile />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              </BrowserRouter>
            </TooltipProvider>
          </BookingProvider>
        </CreditProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;