export type Event = {
  attendees: number;
  attendeesNames?: string[];
  capacity?: number;
  categories: Category[];
  description: string;
  eventDate: Date | number;
  eventId: string;
  shortId?: string;
  isUserAttendee: boolean;
  organisedBy?: string;
  posterPath: string;
  signupsAllowed?: boolean;
  title: string;
  venue: string;
};

export type Category = string;
