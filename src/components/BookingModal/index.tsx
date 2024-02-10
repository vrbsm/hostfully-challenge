import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Places, Reservation } from "../types";
import {
  daysDifference,
  excludeDateIntervals,
  overlappingExcludeDate,
} from "../../utils/formatDate";
import { BookingStatus } from "../enum";
import { useBookingContext } from "../../context/BookingContext";

interface BookingModalProps {
  addBooking: (item: Partial<Reservation>) => void;
  bookingStatus: BookingStatus;
  deleteBooking: (item: Reservation) => void;
  isOpen: boolean;
  onClose: () => void;
  reservation: Reservation | null;
  updatingBooking: (item: Reservation) => void;
}
const BookingModal = ({
  addBooking,
  deleteBooking,
  isOpen,
  onClose,
  bookingStatus,
  reservation,
  updatingBooking,
}: BookingModalProps) => {
  const { places } = useBookingContext();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [nights, setNights] = useState(0);
  const [placeSelected, setPlaceSelected] = useState<Places | null>(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [pets, setPets] = useState(0);
  const [notes, setNotes] = useState("");

  const isBtnDisable = overlappingExcludeDate(
    placeSelected?.excludeDates,
    reservation,
    startDate,
    endDate
  );

  const price: number =
    (placeSelected && nights * placeSelected?.dailyPrice) || 0;

  let title = "+ booking";
  let DialogActionContainer = (
    <>
      <Button onClick={onClose}>Cancel</Button>
      <Button type="submit">Confirm</Button>
    </>
  );

  const setPlaceSelectedById = (id: number) => {
    const place = places?.find((item) => item.id === id);
    if (place) {
      setPlaceSelected(place);
    }
  };

  const setUpDialogInformation = () => {
    switch (bookingStatus) {
      case BookingStatus.EDIT:
        title = "Edit booking";
        DialogActionContainer = (
          <>
            <Button data-testid="cancel-button" onClick={onClose}>Cancel</Button>
            <Button data-testid="delete-button" onClick={() => reservation && deleteBooking(reservation)}>
              Delete
            </Button>
            <Button data-testid="edit-button" disabled={isBtnDisable} type="submit">
              Edit
            </Button>
          </>
        );

        break;
      case BookingStatus.CREATE:
        title = "+ booking";
        DialogActionContainer = (
          <>
            <Button data-testid="cancel-button" onClick={onClose}>Cancel</Button>
            <Button disabled={isBtnDisable} type="submit">
              Confirm
            </Button>
          </>
        );
        break;
    }
  };

  setUpDialogInformation();

  const handlePlaceChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = Number(event.target.value);
    setPlaceSelectedById(value);
  };

  useEffect(() => {
    if (!isOpen) {
      setStartDate(null);
      setEndDate(null);
      setPlaceSelected(null);
      setNights(0);
      setPlaceSelected(null);
      setAdults(1);
      setChildren(0);
      setPets(0);
      setNotes("");
    } else {
      if (reservation && bookingStatus === BookingStatus.EDIT) {
        setPlaceSelectedById(reservation?.reservationId || 0);
        setStartDate(reservation?.from);
        setEndDate(reservation?.to);
        setAdults(reservation.adults);
        setChildren(reservation.children);
        setPets(reservation.pets);
        setNotes(reservation.notes);
        if (reservation.from && reservation.to)
          setNights(daysDifference(reservation?.from, reservation?.to));
      }
    }
  }, [isOpen]);

  const handleSubmit = () => {
    let newReservation: Partial<Reservation> = {
      adults,
      children,
      pets,
      price,
      notes,
      name: placeSelected?.name || "",
      img: placeSelected?.img || "",
      from: startDate,
      to: endDate,
      reservationId: placeSelected?.id || 0,
    };
    if (bookingStatus === BookingStatus.CREATE) {
      addBooking(newReservation);
    } else if (bookingStatus === BookingStatus.EDIT) {
      newReservation.id = reservation?.id;
      updatingBooking(newReservation as Reservation);
    }
  };

  const handleDateChange = (date: Date | null, type: "start" | "end") => {
    if (type === "start") {
      setStartDate(() => {
        if (date && endDate) {
          setNights(daysDifference(date, endDate));
        }
        return date;
      });
      setEndDate(null);
    } else if (type === "end" && startDate) {
      setEndDate(() => {
        if (startDate && date) {
          setNights(daysDifference(startDate, date));
        }
        return date;
      });
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          handleSubmit();
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent className="space-y-4">
        <div>
          <Avatar
            alt={placeSelected?.name}
            src={placeSelected?.img}
            sx={{ width: 100, height: 100 }}
          />
        </div>
        <TextField
          select
          className="w-full"
          required
          value={placeSelected?.id || ""}
          label="Name"
          name="name"
          onChange={handlePlaceChange}
        >
          {places?.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        <div className="flex w-full flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
          <DatePicker
            required
            selected={startDate}
            name="from"
            autoComplete="off"
            onChange={(date) => handleDateChange(date, "start")}
            selectsStart
            excludeDateIntervals={excludeDateIntervals(
              placeSelected?.excludeDates,
              reservation
            )}
            minDate={new Date()}
            startDate={startDate}
            endDate={endDate}
            customInput={
              <TextField
                className="w-full"
                required
                id="from-required"
                label="from"
              />
            }
          />
          <DatePicker
            selected={endDate}
            name="to"
            autoComplete="off"
            required
            disabled={!startDate}
            excludeDateIntervals={excludeDateIntervals(
              placeSelected?.excludeDates,
              reservation
            )}
            excludeDates={startDate ? [startDate] : []}
            onChange={(date) => handleDateChange(date, "end")}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            customInput={
              <TextField
                error={isBtnDisable}
                helperText={isBtnDisable ? "Incorrect entry." : ""}
                className="w-full"
                id="to-required"
                label="to"
              />
            }
          />
        </div>
        <div className="flex w-full flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
          <TextField
            InputProps={{ inputProps: { min: 1 } }}
            className="w-full"
            label="Adults"
            value={adults}
            onChange={(event) => setAdults(Number(event.target.value))}
            name="adults"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            InputProps={{ inputProps: { min: 0 } }}
            className="w-full"
            name="children"
            value={children}
            onChange={(event) => setChildren(Number(event.target.value))}
            label="Children"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            InputProps={{ inputProps: { min: 0 } }}
            className="w-full"
            label="Pets"
            value={pets}
            onChange={(event) => setPets(Number(event.target.value))}
            type="number"
            name="pets"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <TextField
          InputProps={{ inputProps: { min: 0 } }}
          className="w-full"
          label="Notes"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          name="notes"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div className="flex flex-col divide-y">
          <Typography variant="h6" component="span">
            Rent: {nights} nights • daily price ${placeSelected?.dailyPrice}
          </Typography>
          <Typography variant="h5" component="span">
            Total: ${price}
          </Typography>
        </div>
      </DialogContent>
      <DialogActions>{DialogActionContainer}</DialogActions>
    </Dialog>
  );
};

export default BookingModal;
