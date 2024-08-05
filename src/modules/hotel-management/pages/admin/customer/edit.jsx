import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import CustomerForm from "src/modules/hotel-management/sections/customer/form";

export default function CustomerEdit() {
  let { id } = useParams();

  return (
    <>
      <Helmet>
        <title> Edit Customer | {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>

      <CustomerForm
        title="Edit Customer"
        id={id}
      />
    </>
  );
}
