import { fireEvent, render, screen } from "@testing-library/react";
import BookingModal from ".";
import moment from "moment";
import { Reservation } from "../types";
import { BookingStatus } from "../enum";

jest.mock("../../context/BookingContext", () => ({
  useBookingContext: () => ({
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
  }),
}));
const reservation: Reservation = {
  id: "reservation-1",
  reservationId: 123,
  name: "California",
  img: "california-img.jpg",
  from: moment("2024-02-10", "YYYY-MM-DD").toDate(),
  to: moment("2024-02-20", "YYYY-MM-DD").toDate(),
  adults: 2,
  children: 1,
  pets: 0,
  notes: "notes",
  price: 150.0,
};

describe("BookingModal", () => {
  describe("dialog title", () => {
    it("should render +booking when type is create", () => {
      const mockAddBooking = jest.fn();
      const mockDeleteBooking = jest.fn();
      const mockUpdatingBooking = jest.fn();
      const mockOnClose = jest.fn();

      render(
        <BookingModal
          onClose={mockOnClose}
          bookingStatus={BookingStatus.CREATE}
          isOpen={true}
          reservation={reservation}
          addBooking={mockAddBooking}
          deleteBooking={mockDeleteBooking}
          updatingBooking={mockUpdatingBooking}
        />
      );
      expect(screen.getByText("+ booking")).toBeInTheDocument();
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("from")).toBeInTheDocument();
      expect(screen.getByText("to")).toBeInTheDocument();
    });
    it("should render editing booking when type is create", () => {
      const mockAddBooking = jest.fn();
      const mockDeleteBooking = jest.fn();
      const mockUpdatingBooking = jest.fn();
      const mockOnClose = jest.fn();

      render(
        <BookingModal
          onClose={mockOnClose}
          bookingStatus={BookingStatus.EDIT}
          isOpen={true}
          reservation={reservation}
          addBooking={mockAddBooking}
          deleteBooking={mockDeleteBooking}
          updatingBooking={mockUpdatingBooking}
        />
      );
      expect(screen.getByText("Edit booking")).toBeInTheDocument();
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("from")).toBeInTheDocument();
      expect(screen.getByText("to")).toBeInTheDocument();
    });
  });

  it("should handle add booking submission correctly", () => {
    const mockAddBooking = jest.fn();
    const mockDeleteBooking = jest.fn();
    const mockUpdatingBooking = jest.fn();
    const mockOnClose = jest.fn();

    render(
      <BookingModal
        onClose={mockOnClose}
        bookingStatus={BookingStatus.CREATE}
        isOpen={true}
        reservation={reservation}
        addBooking={mockAddBooking}
        deleteBooking={mockDeleteBooking}
        updatingBooking={mockUpdatingBooking}
      />
    );
    fireEvent.click(screen.getByText(/confirm/i))
    
    expect(mockAddBooking).toHaveBeenCalled()
  });
  it("should handle edit booking submission correctly", () => {
    const mockAddBooking = jest.fn();
    const mockDeleteBooking = jest.fn();
    const mockUpdatingBooking = jest.fn();
    const mockOnClose = jest.fn();

    render(
      <BookingModal
        onClose={mockOnClose}
        bookingStatus={BookingStatus.EDIT}
        isOpen={true}
        reservation={reservation}
        addBooking={mockAddBooking}
        deleteBooking={mockDeleteBooking}
        updatingBooking={mockUpdatingBooking}
      />
    );
    fireEvent.click(screen.getByTestId("edit-button"))
    
    expect(mockUpdatingBooking).toHaveBeenCalled()
  });
  it("should handle delete booking submission correctly", () => {
    const mockAddBooking = jest.fn();
    const mockDeleteBooking = jest.fn();
    const mockUpdatingBooking = jest.fn();
    const mockOnClose = jest.fn();

    render(
      <BookingModal
        onClose={mockOnClose}
        bookingStatus={BookingStatus.EDIT}
        isOpen={true}
        reservation={reservation}
        addBooking={mockAddBooking}
        deleteBooking={mockDeleteBooking}
        updatingBooking={mockUpdatingBooking}
      />
    );
    fireEvent.click(screen.getByTestId("delete-button"))
    
    expect(mockDeleteBooking).toHaveBeenCalled()
  });
});
