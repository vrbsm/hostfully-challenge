import moment from "moment";

export const daysDifference = (startDate: Date, endDate: Date): number => {
  const endDateFormatted = moment(endDate, "MM-DD-YYYY");
  return endDateFormatted.diff(startDate, "days");
};
