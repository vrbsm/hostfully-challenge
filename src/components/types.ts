export type Reservation = {
  id: string;
  reservationId: number;
  name: string;
  img: string;
  from: Date | null;
  to: Date | null;
  adults: number;
  children: number;
  pets: number;
  notes: string;
  price: number;
};

export interface Places {
  id: number;
  name: string;
  dailyPrice: number;
  excludeDates: {
    id: string;
    start: Date;
    end: Date;
  }[];
  img: string;
}
