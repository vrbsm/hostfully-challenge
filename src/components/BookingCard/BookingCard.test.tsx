import { fireEvent, render, screen } from "@testing-library/react";
import BookingCard from ".";
import { Reservation } from "../types";
import moment from "moment";

describe("BookingCard", () => {
  it("render correctly", () => {
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
    const onClickItem = jest.fn();
    render(<BookingCard reservation={reservation} onClickItem={onClickItem} />);
    expect(screen.getByText("California")).toBeInTheDocument();
    expect(screen.getByTestId("family-members-container")).toHaveTextContent(
      "2 adults • 1 children • 0 pets"
    );
    expect(screen.getByText("notes")).toBeInTheDocument();
    expect(screen.getByText("10 Feb 2024 - 20 Feb 2024")).toBeInTheDocument();
    expect(screen.getByText("10 days")).toBeInTheDocument();
    expect(screen.getByText("$150.00")).toBeInTheDocument();
    expect(screen.getByText("Status: Pending")).toBeInTheDocument();
  });
  it("should handle the click item correctly", () => {
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
    const onClickItem = jest.fn();
    render(<BookingCard reservation={reservation} onClickItem={onClickItem} />);
    fireEvent.click(screen.getByTestId("card-item-container"));

    expect(onClickItem).toHaveBeenCalledWith(reservation);
  });
});
