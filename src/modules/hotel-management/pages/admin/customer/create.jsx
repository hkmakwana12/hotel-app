import { Helmet } from "react-helmet-async";

import CustomerForm from "src/modules/hotel-management/sections/customer/form";

export default function CustomerCreate() {
  return (
    <>
      <Helmet>
        <title>Create Customer | {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>

      <CustomerForm
        title="Create Customer"
        id={null}
      />
    </>
  );
}
