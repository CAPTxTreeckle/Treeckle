export type Venue = {
  roomId: string;
  name: string;
};

export type BookingPeriod = {
  start: number;
  end: number;
};

export type Status = {
  success: boolean;
  message: string;
};
