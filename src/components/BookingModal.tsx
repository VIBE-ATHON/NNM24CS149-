import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useBooking } from '@/contexts/BookingContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Calendar as CalendarIcon, Clock, Video, Users } from 'lucide-react';
import { format } from 'date-fns';

interface BookingModalProps {
  children: React.ReactNode;
  skillName: string;
  teacherId: string;
  teacherName: string;
}

export default function BookingModal({ children, skillName, teacherId, teacherName }: BookingModalProps) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState('60');
  const [notes, setNotes] = useState('');
  const { createBooking, getAvailableSlots } = useBooking();
  const { user } = useAuth();

  const availableSlots = selectedDate 
    ? getAvailableSlots(teacherId, selectedDate.toISOString())
    : [];

  const handleBooking = () => {
    if (!user) {
      toast.error('Please log in to book a session');
      return;
    }

    if (!selectedDate || !selectedTime) {
      toast.error('Please select a date and time');
      return;
    }

    const scheduledAt = new Date(selectedDate);
    const [hours, minutes] = selectedTime.split(':').map(Number);
    scheduledAt.setHours(hours, minutes, 0, 0);

    createBooking({
      learner_id: user.id,
      teacher_id: teacherId,
      skill_name: skillName,
      scheduled_at: scheduledAt.toISOString(),
      duration_minutes: parseInt(duration),
      status: 'scheduled',
      notes
    });

    toast.success('Session booked successfully!');
    setOpen(false);
    setSelectedDate(undefined);
    setSelectedTime('');
    setNotes('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Book a Learning Session</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Session Details */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5" />
                Session Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Skill</Label>
                <p className="text-sm text-muted-foreground">{skillName}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Teacher</Label>
                <p className="text-sm text-muted-foreground">{teacherName}</p>
              </div>
            </CardContent>
          </Card>

          {/* Duration Selection */}
          <div className="space-y-2">
            <Label>Session Duration</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger>
                <Clock className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">60 minutes</SelectItem>
                <SelectItem value="120">120 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <Label>Select Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date < new Date('1900-01-01')}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <div className="space-y-2">
              <Label>Available Times</Label>
              {availableSlots.length > 0 ? (
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSlots.map((slot) => {
                      const startTime = new Date(slot.start_time);
                      const timeString = format(startTime, 'HH:mm');
                      return (
                        <SelectItem key={slot.id} value={timeString}>
                          {format(startTime, 'h:mm a')}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm text-muted-foreground">No available slots for this date</p>
              )}
            </div>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Session Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="What would you like to focus on in this session?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Meeting Info */}
          <Card className="bg-blue-50 dark:bg-blue-900/20">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                <Video className="h-4 w-4" />
                <span className="text-sm font-medium">Video Call Included</span>
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                A secure video meeting link will be generated automatically
              </p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleBooking} 
              className="flex-1"
              disabled={!selectedDate || !selectedTime || !user}
            >
              Book Session
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}