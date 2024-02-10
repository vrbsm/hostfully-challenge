import { fireEvent, render, screen } from "@testing-library/react";
import Booking from "./components/Booking";
import { BookingContext } from "./context/BookingContext";

const deleteMock = jest.fn();
const editMock = jest.fn();
const providerValues = {
  reservations: [
    {
      id: "reservation-1",
      reservationId: 123,
      name: "California",
      img: "california-img.jpg",
      from: new Date(),
      to: new Date(),
      adults: 2,
      children: 1,
      pets: 0,
      notes: "notes",
      price: 150.0,
    },
  ],
  addReservation: () => {},
  updateReservation: editMock,
  deleteReservation: deleteMock,
  addExcludeDates: () => {},
  places: [
    {
      id: 1,
      name: "São Paulo",
      img: "mock-place1.jpg",
      dailyPrice: 100,
      excludeDates: [],
    },
    {
      id: 2,
      name: "California",
      img: "mock-place2.jpg",
      dailyPrice: 120,
      excludeDates: [],
    },
  ],
};

describe("Booking Component", () => {
  it("opens the modal when the FAB button is clicked", () => {
    render(
      <BookingContext.Provider value={providerValues}>
        <Booking />
      </BookingContext.Provider>
    );

    const fabButton = screen.getByTestId("fab-button");
    fireEvent.click(fabButton);

    expect(screen.getByText("+ booking")).toBeInTheDocument();
  });

  it("displays existing reservations", () => {
    render(
      <BookingContext.Provider value={providerValues}>
        <Booking />
      </BookingContext.Provider>
    );

    expect(screen.getByText("California")).toBeInTheDocument();
  });
  it("deletes the booking item when the delete button is clicked", () => {
    render(
      <BookingContext.Provider value={providerValues}>
        <Booking />
      </BookingContext.Provider>
    );
    fireEvent.click(screen.getByTestId("card-item-container"));
    fireEvent.click(screen.getByTestId("delete-button"));
    expect(deleteMock).toHaveBeenCalled();
  });

  it("edit the booking item when the edit button is clicked", () => {
    render(
      <BookingContext.Provider value={providerValues}>
        <Booking />
      </BookingContext.Provider>
    );
    fireEvent.click(screen.getByTestId("card-item-container"));
    fireEvent.click(screen.getByTestId("edit-button"));
    expect(editMock).toHaveBeenCalled();
  });
});
