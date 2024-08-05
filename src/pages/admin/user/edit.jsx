import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import UserForm from "src/sections/admin/user/form";

export default function UserEdit() {
  let { id } = useParams();

  return (
    <>
      <Helmet>
        <title> User Edit | {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
      <UserForm
        title="Edit User"
        id={id}
      />
    </>
  );
}
