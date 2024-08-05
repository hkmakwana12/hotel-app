import { Helmet } from "react-helmet-async";

import UserForm from "src/sections/admin/user/form";

export default function UserCreate() {
  return (
    <>
      <Helmet>
        <title> User Create | {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
      <UserForm
        title="Create User"
        id={null}
      />
    </>
  );
}
