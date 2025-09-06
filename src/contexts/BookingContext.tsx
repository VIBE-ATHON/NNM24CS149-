import React, { createContext, useContext, useState } from 'react';

export interface TimeSlot {
  id: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
  provider_id: string;
}

export interface Booking {
  id: string;
  learner_id: string;
  teacher_id: string;
  skill_name: string;
  scheduled_at: string;
  duration_minutes: number;
  status: 'scheduled' | 'completed' | 'cancelled' | 'in_progress';
  meeting_url?: string;
  notes?: string;
  created_at: string;
}

interface BookingContextType {
  bookings: Booking[];
  timeSlots: TimeSlot[];
  createBooking: (booking: Omit<Booking, 'id' | 'created_at'>) => void;
  cancelBooking: (bookingId: string) => void;
  getAvailableSlots: (providerId: string, date: string) => TimeSlot[];
  joinMeeting: (bookingId: string) => string | null;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Mock data
const mockBookings: Booking[] = [
  {
    id: '1',
    learner_id: '1',
    teacher_id: '2',
    skill_name: 'React Development',
    scheduled_at: '2024-09-08T14:00:00Z',
    duration_minutes: 60,
    status: 'scheduled',
    meeting_url: 'https://meet.jit.si/skillswap-react-session-1',
    notes: 'Focus on hooks and state management',
    created_at: '2024-09-06T10:00:00Z'
  }
];

const mockTimeSlots: TimeSlot[] = [
  {
    id: '1',
    start_time: '2024-09-08T14:00:00Z',
    end_time: '2024-09-08T15:00:00Z',
    is_available: false,
    provider_id: '2'
  },
  {
    id: '2',
    start_time: '2024-09-08T15:00:00Z',
    end_time: '2024-09-08T16:00:00Z',
    is_available: true,
    provider_id: '2'
  },
  {
    id: '3',
    start_time: '2024-09-08T16:00:00Z',
    end_time: '2024-09-08T17:00:00Z',
    is_available: true,
    provider_id: '2'
  }
];

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(mockTimeSlots);

  const createBooking = (newBooking: Omit<Booking, 'id' | 'created_at'>) => {
    const booking: Booking = {
      ...newBooking,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      meeting_url: `https://meet.jit.si/skillswap-${newBooking.skill_name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`
    };
    
    setBookings(prev => [...prev, booking]);
    
    // Mark time slot as unavailable
    setTimeSlots(prev => 
      prev.map(slot => 
        slot.start_time === newBooking.scheduled_at 
          ? { ...slot, is_available: false }
          : slot
      )
    );
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled' as const }
          : booking
      )
    );
  };

  const getAvailableSlots = (providerId: string, date: string) => {
    const dateStart = new Date(date).toISOString().split('T')[0];
    return timeSlots.filter(slot => 
      slot.provider_id === providerId && 
      slot.is_available && 
      slot.start_time.startsWith(dateStart)
    );
  };

  const joinMeeting = (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    return booking?.meeting_url || null;
  };

  return (
    <BookingContext.Provider value={{
      bookings,
      timeSlots,
      createBooking,
      cancelBooking,
      getAvailableSlots,
      joinMeeting
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}