import { SnackbarProvider } from "notistack";
import { lazy, Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "src/components/loader";

import DashboardLayout from "src/layouts/dashboard";
import FrontLayout from "src/layouts/frontend/FrontLayout";
import hotelRoutesList from "src/modules/hotel-management/routesList";
import settingsRoutesList from "src/modules/settings/routesList";

// Frontend Page
export const HomePage = lazy(() => import("src/pages/frontend/HomePage"));

// Dashboard Pages
export const IndexPage = lazy(() => import("src/pages/admin/app"));
export const BlogPage = lazy(() => import("src/pages/admin/blog"));

export const UserPage = lazy(() => import("src/pages/admin/user"));
export const UserEdit = lazy(() => import("src/pages/admin/user/edit"));
export const UserCreate = lazy(() => import("src/pages/admin/user/create"));

/**
 * Payment Type
 */
export const PaymentTypePage = lazy(() =>
  import("src/pages/admin/payment-type")
);
export const PaymentTypeEdit = lazy(() =>
  import("src/pages/admin/payment-type/edit")
);
export const PaymentTypeCreate = lazy(() =>
  import("src/pages/admin/payment-type/create")
);

export const LoginPage = lazy(() => import("src/pages/admin/login"));

export const Page404 = lazy(() => import("src/pages/page-not-found"));

const routesList = [
  {
    path: "",
    element: (
      <FrontLayout>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </FrontLayout>
    ),
    children: [
      { element: <HomePage />, index: true },

      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },
  {
    path: "admin",
    element: (
      <Suspense fallback={<Loader />}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          autoHideDuration={3000}
        />
        <DashboardLayout>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </Suspense>
    ),
    children: [
      { element: <Navigate to="/admin/dashboard" />, index: true },
      { path: "dashboard", element: <IndexPage /> },
      {
        path: "user",
        children: [
          { index: true, element: <UserPage /> },
          { path: "create", element: <UserCreate /> },
          { path: ":id", element: <UserEdit /> },
        ],
      },
      {
        path: "payment-type",
        children: [
          { index: true, element: <PaymentTypePage /> },
          { path: "create", element: <PaymentTypeCreate /> },
          { path: ":id", element: <PaymentTypeEdit /> },
        ],
      },

      ...hotelRoutesList.adminRoutes,

      ...settingsRoutesList.adminRoutes,
    ],
  },
  {
    path: "admin/login",
    element: <LoginPage />,
  },
];

export default routesList;
