# SkillSwap MVP Implementation Plan

## Core Files to Create (Max 8 files limit)

### 1. Landing Page & Layout
- `src/pages/Index.tsx` - Main landing page with hero section, features, and CTAs
- `src/components/Layout.tsx` - Main layout with navigation, theme toggle, and footer

### 2. User Management & Authentication
- `src/pages/Profile.tsx` - User profile page with skills, badges, and stats
- `src/components/AuthModal.tsx` - Login/signup modal component

### 3. Skill Discovery & Matching
- `src/pages/Skills.tsx` - Skill listings with search, filters, and grid layout
- `src/components/SkillCard.tsx` - Individual skill card component

### 4. Communication & Scheduling
- `src/pages/Dashboard.tsx` - User dashboard with bookings, messages, and quick actions
- `src/components/BookingModal.tsx` - Scheduling modal for sessions

## MVP Feature Prioritization

### P0 (Must-have - This Implementation)
✅ Landing page with SkillSwap branding
✅ User authentication (mock/localStorage)
✅ User profiles with skills to teach/learn
✅ Skill listings with search and basic filtering
✅ Skill cards with ratings and tags
✅ Dark/light theme toggle
✅ Responsive design
✅ Basic matchmaking (skill compatibility)
✅ Simple booking system
✅ Basic gamification (badges, credits display)

### P1 (Future Enhancement)
- Real-time chat system
- Video call integration
- Advanced filtering (location, timezone)
- Forum and community features
- Weekly events system
- Advanced ranking algorithms
- Review and rating system

### P2 (Nice-to-have)
- AI-powered recommendations
- Mobile app
- Advanced analytics
- Multi-language support

## Technical Approach

### Data Storage
- Use localStorage for MVP (no Supabase integration initially)
- Mock data for users, skills, bookings, badges
- Simple JSON structure for easy manipulation

### State Management
- React useState/useContext for global state
- localStorage persistence
- Simple data structures matching system design

### Styling
- Shadcn-ui components for consistent design
- Tailwind CSS for custom styling
- Dark/light theme using CSS variables
- Responsive grid layouts

### Key Components Architecture
1. **ThemeProvider** - Global theme management
2. **AuthContext** - User authentication state
3. **SkillsContext** - Skills and matching data
4. **Layout** - Navigation and common UI
5. **SkillCard** - Reusable skill display component
6. **FilterSidebar** - Search and filtering controls
7. **BookingModal** - Session scheduling interface
8. **ProfileCard** - User profile display

## Implementation Strategy
1. Start with landing page and basic navigation
2. Add authentication and user profiles
3. Implement skill listings and search
4. Add booking and scheduling features
5. Integrate gamification elements
6. Polish UI/UX and responsiveness
7. Test all features and fix issues

This MVP focuses on core functionality while maintaining the potential for future Supabase integration and advanced features.