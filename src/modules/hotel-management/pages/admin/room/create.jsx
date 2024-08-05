
import { Helmet } from "react-helmet-async";


import RoomForm from "src/modules/hotel-management/sections/room/form";



export default function RoomCreate() {
  

  return (
    <>
      <Helmet>
        <title>Create Room | {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>

      <RoomForm
        title="Create Room"
        id={null}
      />
    </>
  );
}
