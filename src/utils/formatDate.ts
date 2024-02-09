import moment from "moment";
import { Reservation } from "../components/types";

export const daysDifference = (startDate: Date, endDate: Date): number => {
  const endDateFormatted = moment(endDate, "MM-DD-YYYY");
  return endDateFormatted.diff(startDate, "days");
};

type ExcludeDates = {
  id: string;
  start: Date;
  end: Date;
};

export const excludeDateIntervals = (
  excludeDates: ExcludeDates[] | undefined | null,
  reservation: Reservation | undefined | null
): ExcludeDates[] | undefined => {
  if (!excludeDates) return;
  return excludeDates.filter((item) => item.id !== reservation?.id) || [];
};

export const overlapingeExcludeDate = (
  excludeDates: ExcludeDates[] | undefined | null,
  reservation: Reservation | undefined | null,
  startDate: Date | null,
  endDate: Date | null
): boolean => {
  if (!startDate || !endDate) return false;

  const selectedDateInterval = {
    start: startDate,
    end: endDate,
  };

  const overlappingIntervals = excludeDateIntervals(
    excludeDates,
    reservation
  )?.filter((interval) => {
    const overlap =
      interval.start < selectedDateInterval?.end &&
      interval.end > selectedDateInterval?.start;
    return overlap;
  });

  return overlappingIntervals ? overlappingIntervals.length > 0 : false;
};
