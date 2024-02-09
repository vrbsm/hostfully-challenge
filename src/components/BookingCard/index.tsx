import {
  Card,
  CardContent,
  CardMedia,
  Tooltip,
  TooltipProps,
  Typography,
  tooltipClasses,
} from "@mui/material";
import { Reservation } from "../types";
import moment from "moment";
import { formattedAmount } from "../../utils/formatCurrency";
import styled from "@emotion/styled";

interface BookingCardProps {
  reservation: Reservation;
  onClickItem: (item: Reservation) => void
}
const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    border: "1px solid #dadde9",
  },
}));

const BookingCard = ({ reservation, onClickItem }: BookingCardProps) => {
  const { name, img, from, to, notes, adults, children, pets, price } =
    reservation || {};

  const originalTo = moment(to, "MM-DD-YYYY");
  const formattedTo = originalTo.format("DD MMM YYYY");
  const originalFrom = moment(from, "MM-DD-YYYY");
  const formattedFrom = originalFrom.format("DD MMM YYYY");
  const daysDifference = originalTo.diff(originalFrom, "days");

  return (
    <section className="pb-5">
      <Card className="cursor-pointer" onClick={() => onClickItem(reservation)}>
        <div className="w-full flex flex-col lg:flex-row">
          <CardMedia
            className="lg:max-w-[200px]"
            component="img"
            image={img}
            alt="Place booked"
          />
          <CardContent className="flex flex-col w-full divide-y lg:flex-row lg:divide-y-0 lg:divide-x lg:items-center">
            {/* general information */}
            <div className="flex flex-col lg:min-w-96 pb-2 lg:pr-2">
              <Typography variant="subtitle1" component="span">
                {name}
              </Typography>
              <Typography variant="subtitle2" component="span">
                <span className="rounded-full px-2 py-1 bg-blue-500 text-white">
                  {adults}
                </span>{" "}
                adults •{" "}
                <span className="rounded-full px-2 py-1 bg-blue-500 text-white">
                  {children}
                </span>{" "}
                children •{" "}
                <span className="rounded-full px-2 py-1 bg-blue-500 text-white">
                  {pets}
                </span>{" "}
                pets
              </Typography>
              <HtmlTooltip title={<>{notes}</>}>
                <Typography
                  className="italic pt-1 lg:max-w-xs lg:truncate"
                  variant="subtitle2"
                  component="span"
                >
                  {notes}
                </Typography>
              </HtmlTooltip>
            </div>
            {/* dates */}
            <div className="flex flex-col pt-2 pb-2 lg:pl-2 lg:pr-2 lg:w-full ">
              <Typography variant="body1" component="p">
                <b>
                  {formattedFrom} - {formattedTo}
                </b>
              </Typography>
              <div>
                <Typography
                  className="border-2 border-indigo-500/100 border-dotted p-0.5"
                  variant="subtitle2"
                  component="span"
                >
                  {daysDifference} {daysDifference === 1 ? "day" : "days"}
                </Typography>
              </div>
            </div>
            {/* currency */}
            <div className="flex flex-col pt-2 lg:pl-2 lg:w-full lg:items-end">
              <Typography variant="h5" component="p">
                {formattedAmount(price)}
              </Typography>
              <div>
                <Typography variant="subtitle2" component="span">
                  Status: Pending
                </Typography>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </section>
  );
};
export default BookingCard;
