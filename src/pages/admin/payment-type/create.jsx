import { Helmet } from "react-helmet-async";
import PaymentTypeForm from "src/sections/admin/payment-type/form";

export default function PaymentTypeCreate() {
  return (
    <>
      <Helmet>
        <title>Create Payment Type | {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>

      <PaymentTypeForm title="Create Payment Type" id={null} />
    </>
  );
}
