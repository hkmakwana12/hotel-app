import { useRoutes } from "react-router-dom";
import routesList from "./routesList";

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes(routesList);

  return routes;
}
