import { lazy } from "react";

export const GeneralSettings = lazy(() =>
  import("src/modules/settings/pages/general")
);

const settingsRoutesList = {
  adminRoutes: [
    {
      path: "settings",
      children: [
        { path: "general", element: <GeneralSettings /> },
      ],
    },
  ],
};

export default settingsRoutesList;
