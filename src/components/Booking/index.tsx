import { useState } from "react";
import { Box, Fab, Snackbar, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Checklist from "@mui/icons-material/Checklist";
import nextId from "react-id-generator";
import Search from "../Search";
import BookingCard from "../BookingCard";
import BookingModal from "../BookingModal";
import { useBookingContext } from "../../context/BookingContext";
import { Reservation } from "../types";
import { BookingStatus, NotificationMessage } from "../enum";

interface FabIconProps {
  onClick: React.MouseEventHandler;
}

const Booking = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const { reservations, addReservation, updateReservation, deleteReservation, places } = useBookingContext();
  const [modalStatus, setModalStatus] = useState(BookingStatus.CREATE);
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleNewBooking = () => {
    setSelectedReservation(null);
    setModalStatus(BookingStatus.CREATE);
    openModal();
  };

  const handleAddBooking = (item: Partial<Reservation>) => {
    const reservationId = nextId();
    const newReservation = { ...item, id: reservationId };
    addReservation(newReservation as Reservation);
    setNotificationMessage(NotificationMessage.CREATE);
    setShowNotification(true);
    handleCloseModal();
  };

  const handleUpdateBooking = (item: Reservation) => {
    updateReservation(item);
    setNotificationMessage(NotificationMessage.EDIT);
    setShowNotification(true);
    handleCloseModal();
  };

  const handleDeleteBooking = (item: Reservation) => {
    deleteReservation(item);
    setNotificationMessage(NotificationMessage.DELETE);
    setShowNotification(true);
    handleCloseModal();
  };

  const handleItemClick = (item: Reservation) => {
    setSelectedReservation(item);
    setModalStatus(BookingStatus.EDIT);
    openModal();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };


  return (
    <main>
      <BookingModal
        addBooking={handleAddBooking}
        deleteBooking={handleDeleteBooking}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        bookingStatus={modalStatus}
        reservation={selectedReservation}
        updatingBooking={handleUpdateBooking}
      />
      <section className="flex flex-col w-full px-10 sm:px-20">
        <div className="flex justify-center w-full pt-3">
          <Search />
        </div>
        {reservations?.length === 0 ? (
          <div className="flex flex-col items-center h-96 justify-end opacity-50">
            <Checklist sx={{ width: 200, height: 200 }} color="primary" />
            <Typography variant="body1" component="span">
              No reservations have been booked; add an item
            </Typography>
          </div>
        ) : (
          <ul className="pt-3">
            {reservations?.map((item) => (
              <li key={item.id}>
                <BookingCard reservation={item} onClickItem={handleItemClick} />
              </li>
            ))}
          </ul>
        )}
      </section>
      <FabIcon onClick={handleNewBooking} />
      <Snackbar
        open={showNotification}
        autoHideDuration={2000}
        onClose={handleCloseNotification}
        message={notificationMessage}
      />
    </main>
  );
};

const FabIcon = ({ onClick }: FabIconProps) => {
  return (
    <div className="fixed right-5 bottom-5">
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Fab size="large" variant="circular" color="primary" onClick={onClick}>
          <AddIcon />
        </Fab>
      </Box>
    </div>
  );
};
export default Booking;
