import { Helmet } from "react-helmet-async";

import BookingForm from "src/modules/hotel-management/sections/booking/form";

export default function BookingCreate() {
  return (
    <>
      <Helmet>
        <title>Create Booking | {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>

      <BookingForm
        title="Create Booking"
        id={null}
      />
    </>
  );
}
