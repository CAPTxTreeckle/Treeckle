export type Event = {
  attendees: number;
  capacity?: number;
  categories: Category[];
  description: string;
  eventDate: Date | number;
  eventId: string;
  isUserAttendee: boolean;
  organisedBy?: string;
  posterPath: string;
  signupsAllowed?: boolean;
  title: string;
  venue: string;
};

export type Category = string;
