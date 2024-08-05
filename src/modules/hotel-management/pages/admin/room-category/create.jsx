import { Helmet } from "react-helmet-async";

import RoomCategoryForm from "src/modules/hotel-management/sections/room-category/form";

export default function RoomCategoryCreate() {
  return (
    <>
      <Helmet>
        <title>Create Room Category | {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>

      <RoomCategoryForm
        title="Create Room Category"
        id={null}
      />
    </>
  );
}
