export type BookingId = {
  bookingid: number;
};

export type BookingDates = {
  checkin: string;
  checkout: string;
};

export type CreateBookingPayload = {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds?: string;
};

export type AuthPayload = {
  username: string;
  password: string;
}

export type UpdateBookingPayload = CreateBookingPayload;
