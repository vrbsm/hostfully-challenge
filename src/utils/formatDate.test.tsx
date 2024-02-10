import moment from "moment";
import {
  daysDifference,
  excludeDateIntervals,
  overlappingExcludeDate,
} from "./formatDate";
import { Reservation } from "../components/types";

describe("formatDate", () => {
  describe("daysDifference", () => {
    it("should calculate the correct number between two dates", () => {
      const startDate = moment("2022-01-01", "YYYY-MM-DD").toDate();
      const endDate = moment("2022-01-10", "YYYY-MM-DD").toDate();
      const difference = daysDifference(startDate, endDate);
      expect(difference).toBe(9);
    });
  });
  describe("excludeDateIntervals", () => {
    it("should return undefined when there is no exclude dates", () => {
      const excludesDates = undefined;
      const reservation = {};
      const value = excludeDateIntervals(
        excludesDates,
        reservation as Reservation
      );
      expect(value).toBe(undefined);
    });
    it("should remove the reservation range from the list of date intervals", () => {
      // The excludes dates id is saved using the reservation id
      const excludesDates = [
        {
          id: "reservation-1",
          start: new Date("2022-01-01"),
          end: new Date("2022-01-10"),
        },
        {
          id: "reservation-2",
          start: new Date("2022-02-01"),
          end: new Date("2022-02-10"),
        },
      ];
      const reservation: Partial<Reservation> = {
        id: "reservation-1",
        reservationId: 123,
        name: "John Doe",
        img: "john-doe-img.jpg",
        from: new Date("2022-02-15"),
        to: new Date("2022-02-20"),
        adults: 2,
        children: 1,
        pets: 0,
        notes: "notes",
        price: 150.0,
      };

      const value = excludeDateIntervals(
        excludesDates,
        reservation as Reservation
      );
      expect(value).toStrictEqual([
        {
          id: "reservation-2",
          start: new Date("2022-02-01"),
          end: new Date("2022-02-10"),
        },
      ]);
    });
  });
  describe("overlappingExcludeDate", () => {
    it("should overlapping return false when there arent start or end dates", () => {
      const excludesDates = [
        {
          id: "reservation-1",
          start: new Date("2022-01-01"),
          end: new Date("2022-01-10"),
        },
        {
          id: "reservation-2",
          start: new Date("2022-02-01"),
          end: new Date("2022-02-10"),
        },
      ];
      const reservation: Reservation = {
        id: "reservation-1",
        reservationId: 123,
        name: "Victor M",
        img: "victor-m-img.jpg",
        from: new Date("2022-02-15"),
        to: new Date("2022-02-20"),
        adults: 2,
        children: 1,
        pets: 0,
        notes: "",
        price: 150.0,
      };
      const value = overlappingExcludeDate(
        excludesDates,
        reservation,
        null,
        null
      );
      expect(value).toBeFalsy();
    });
    it("should detects overlapping correctly", () => {
      const excludesDates = [
        {
          id: "reservation-2",
          start: new Date("2022-02-01"),
          end: new Date("2022-02-10"),
        },
      ];
      const reservation: Partial<Reservation> = {
        id: "aa-10",
        reservationId: 123,
      };
      const value = overlappingExcludeDate(
        excludesDates,
        reservation as Reservation,
        new Date("2022-02-02"),
        new Date("2022-02-20")
      );
      expect(value).toBeTruthy();
    });
  });
});
