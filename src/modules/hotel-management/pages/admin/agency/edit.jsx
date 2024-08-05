import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import AgencyForm from "src/modules/hotel-management/sections/agency/form";

export default function AgencyEdit() {
  let { id } = useParams();

  return (
    <>
      <Helmet>
        <title> Edit Agency | {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>

      <AgencyForm
        title="Edit Agency"
        id={id}
      />
    </>
  );
}
