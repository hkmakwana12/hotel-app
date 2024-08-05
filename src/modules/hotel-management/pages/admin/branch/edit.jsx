import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import BranchForm from "src/modules/hotel-management/sections/branch/form";

export default function BranchEdit() {
  let { id } = useParams();

  return (
    <>
      <Helmet>
        <title> Edit Branch | {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
      
      <BranchForm
        title="Edit Branch"
        id={id}
      />
    </>
  );
}
