import { Helmet } from "react-helmet-async";

import BranchForm from "src/modules/hotel-management/sections/branch/form";

export default function BranchCreate() {
  return (
    <>
      <Helmet>
        <title>Create Branch | {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>

      <BranchForm
        title="Create Branch"
        id={null}
      />
    </>
  );
}
