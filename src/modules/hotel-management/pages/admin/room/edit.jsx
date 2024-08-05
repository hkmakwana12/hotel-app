import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import RoomForm from "src/modules/hotel-management/sections/room/form";

export default function RoomEdit() {
  let { id } = useParams();

  return (
    <>
      <Helmet>
        <title> Edit Room | {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
      
      <RoomForm
        title="Edit Room"
        id={id}
      />
    </>
  );
}
