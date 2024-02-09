import { createContext, useContext, useState } from "react";
import { Places, Reservation } from "../components/types";
import { places as placesMocked } from "../utils/mock";

interface BookingContextProviderProps {
  children: React.ReactNode;
}
interface BookingContextProps {
  reservations: Reservation[] | null;
  places: Places[] | null;
  addReservation: (item: Reservation) => void;
  updateReservation: (item: Reservation) => void;
  deleteReservation: (item: Reservation) => void;
}
const defaultValue = {
  reservations: null,
  addReservation: () => {},
  updateReservation: () => {},
  deleteReservation: () => {},
  addExcludeDates: () => {},
  places: null,
};

export const BookingContext = createContext<BookingContextProps>(defaultValue);

export const BookingContextProvider = ({
  children,
}: BookingContextProviderProps) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [places, setPlaces] = useState<Places[]>(placesMocked);

  const addReservation = (item: Reservation) => {
    setReservations((prev) => [...prev, item]);
    addExcludeDates(item);
  };

  const updateReservation = (item: Reservation) => {
    setReservations((prev) =>
      prev.map((reservation) =>
        item.id === reservation.id ? item : reservation
      )
    );
    removingExcludeDates(item);
    addExcludeDates(item);
  };

  const deleteReservation = (reservation: Reservation) => {
    setReservations((prev) =>
      prev.filter((item) => item.id !== reservation.id)
    );
    removingExcludeDates(reservation);
  };

  const addExcludeDates = (reservation: Reservation) => {
    const { from, to } = reservation;
    if (!from || !to) return;
    setPlaces((prev) =>
      prev.map((place) => {
        if (place.id === reservation.reservationId) {
          const excludeDates = [
            ...place.excludeDates,
            { start: from, end: to, id: reservation.id },
          ];
          const customPlace = { ...place, excludeDates };
          return customPlace;
        }
        return place;
      })
    );
  };

  const removingExcludeDates = (reservation: Reservation) => {
    setPlaces((prev) =>
      prev.map((place) => {
        if (place.id === reservation.reservationId) {
          const newExcludeDates = place.excludeDates.filter(
            (item) => item.id !== reservation.id
          );
          return { ...place, excludeDates: newExcludeDates };
        }

        return place;
      })
    );
  };

  return (
    <BookingContext.Provider
      value={{
        reservations,
        places,
        addReservation,
        updateReservation,
        deleteReservation,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = () => useContext(BookingContext);
