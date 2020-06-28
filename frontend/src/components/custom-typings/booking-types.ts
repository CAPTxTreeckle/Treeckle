export type Booking = {
  bookingId: string;
  roomName: string;
  description: string;
  contactNumber: string;
  expectedAttendees: number;
  start: number;
  end: number;
  createdByName: string;
  createdByEmail: string;
  createdDate: number;
  comments: string[];
  approved: BookingStatus;
};

export type BookingStatus = 0 | 1 | 2 | 3;

export type AvailabilityOptions = {
  available: boolean;
  time: Date;
  timeFormat: string;
};

export type Venue = {
  roomId: string;
  name: string;
};

export type BookingPeriod = {
  start: number;
  end: number;
};

export type BookedSlot = {
  startDate: number;
  endDate: number;
};
