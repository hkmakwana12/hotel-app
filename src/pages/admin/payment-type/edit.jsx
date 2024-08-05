import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import PaymentTypeForm from "src/sections/admin/payment-type/form";

export default function PaymentTypeEdit() {
  let { id } = useParams();

  return (
    <>
      <Helmet>
        <title> Edit Payment Type | {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>

      <PaymentTypeForm title="Edit Payment Type" id={id} />
    </>
  );
}
