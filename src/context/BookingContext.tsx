import { createContext, useContext, useState } from "react";
import { Places, Reservation } from "../components/types";
import { places as placesMocked} from "../utils/mock";

interface BookingContextProviderProps {
  children: React.ReactNode;
}
interface BookingContextProps {
  reservations: Reservation[] | null;
  places: Places[] | null;
  addExcludeDates: (dates: Date[]) => void
  addReservation: (item: Reservation) => void;
  updateReservation: (item: Reservation) => void;
  deleteReservation: (item: string) => void;
}
const defaultValue = {
  reservations: null,
  addReservation: () => {},
  updateReservation: () => {},
  deleteReservation: () => {},
  addExcludeDates: () => {},
  places: null
};

export const BookingContext = createContext<BookingContextProps>(defaultValue);

export const BookingContextProvider = ({
  children,
}: BookingContextProviderProps) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [places,] = useState<Places[]>(placesMocked);

  const addReservation = (item: Reservation) => {
    setReservations((prev) => [...prev, item]);
    // addExcludeDates(item.from)
  };

  const updateReservation = (item: Reservation) => {
    setReservations((prev) =>
      prev.map((reservation) =>
        item.id === reservation.id ? item : reservation
      )
    );
  };

  const deleteReservation = (id: string) => {
    setReservations((prev) => prev.filter((item) => item.id !== id))
  }

  const addExcludeDates = (dates: Date[]) => {

  }

  return (
    <BookingContext.Provider
      value={{
        reservations,
        places,
        addReservation,
        addExcludeDates,
        updateReservation,
        deleteReservation
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = () => useContext(BookingContext);
