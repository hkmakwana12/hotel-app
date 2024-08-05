import { Helmet } from "react-helmet-async";

import { AppView } from "src/sections/admin/overview/view";

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>

      <AppView />
    </>
  );
}
