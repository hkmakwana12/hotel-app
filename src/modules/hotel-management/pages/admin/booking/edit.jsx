import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import BookingForm from "src/modules/hotel-management/sections/booking/form";

export default function BookingEdit() {
  let { id } = useParams();

  return (
    <>
      <Helmet>
        <title> Edit Booking | {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>

      <BookingForm
        title="Edit Booking"
        id={id}
      />
    </>
  );
}
