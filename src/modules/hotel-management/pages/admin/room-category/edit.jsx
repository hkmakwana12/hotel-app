import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import RoomCategoryForm from "src/modules/hotel-management/sections/room-category/form";

export default function RoomCategoryEdit() {
  let { id } = useParams();

  return (
    <>
      <Helmet>
        <title> Edit Room Category | {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
      
      <RoomCategoryForm
        title="Edit Room Category"
        id={id}
      />
    </>
  );
}
