import { Helmet } from "react-helmet-async";

import AgencyForm from "src/modules/hotel-management/sections/agency/form";

export default function AgencyCreate() {
  return (
    <>
      <Helmet>
        <title>Create Agency | {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>

      <AgencyForm
        title="Create Agency"
        id={null}
      />
    </>
  );
}
