import React from "react";
import Header from "./components/Header";
import Booking from "./components/Booking";
import { BookingContextProvider } from "./context/BookingContext";

function App() {
  return (
    <div className="flex flex-col">
      <Header />
      <BookingContextProvider>
        <Booking />
      </BookingContextProvider>
    </div>
  );
}

export default App;
