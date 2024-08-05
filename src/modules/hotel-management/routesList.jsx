import { lazy } from "react";

export const AgencyPage = lazy(() =>
  import("src/modules/hotel-management/pages/admin/agency")
);
export const AgencyEdit = lazy(() =>
  import("src/modules/hotel-management/pages/admin/agency/edit")
);
export const AgencyCreate = lazy(() =>
  import("src/modules/hotel-management/pages/admin/agency/create")
);
export const CustomerPage = lazy(() =>
  import("src/modules/hotel-management/pages/admin/customer")
);
export const CustomerEdit = lazy(() =>
  import("src/modules/hotel-management/pages/admin/customer/edit")
);
export const CustomerCreate = lazy(() =>
  import("src/modules/hotel-management/pages/admin/customer/create")
);

export const BranchPage = lazy(() =>
  import("src/modules/hotel-management/pages/admin/branch")
);
export const BranchEdit = lazy(() =>
  import("src/modules/hotel-management/pages/admin/branch/edit")
);
export const BranchCreate = lazy(() =>
  import("src/modules/hotel-management/pages/admin/branch/create")
);

export const RoomCategoryPage = lazy(() =>
  import("src/modules/hotel-management/pages/admin/room-category")
);
export const RoomCategoryEdit = lazy(() =>
  import("src/modules/hotel-management/pages/admin/room-category/edit")
);
export const RoomCategoryCreate = lazy(() =>
  import("src/modules/hotel-management/pages/admin/room-category/create")
);

export const RoomPage = lazy(() =>
  import("src/modules/hotel-management/pages/admin/room")
);
export const RoomEdit = lazy(() =>
  import("src/modules/hotel-management/pages/admin/room/edit")
);
export const RoomCreate = lazy(() =>
  import("src/modules/hotel-management/pages/admin/room/create")
);

export const BookingPage = lazy(() =>
  import("src/modules/hotel-management/pages/admin/booking")
);
export const BookingEdit = lazy(() =>
  import("src/modules/hotel-management/pages/admin/booking/edit")
);
export const BookingCreate = lazy(() =>
  import("src/modules/hotel-management/pages/admin/booking/create")
);

const hotelRoutesList = {
  adminRoutes: [
    {
      path: "agency",
      children: [
        { index: true, element: <AgencyPage /> },
        { path: "create", element: <AgencyCreate /> },
        { path: ":id", element: <AgencyEdit /> },
      ],
    },
    {
      path: "customer",
      children: [
        { index: true, element: <CustomerPage /> },
        { path: "create", element: <CustomerCreate /> },
        { path: ":id", element: <CustomerEdit /> },
      ],
    },
    {
      path: "branch",
      children: [
        { index: true, element: <BranchPage /> },
        { path: "create", element: <BranchCreate /> },
        { path: ":id", element: <BranchEdit /> },
      ],
    },
    {
      path: "category",
      children: [
        { index: true, element: <RoomCategoryPage /> },
        { path: "create", element: <RoomCategoryCreate /> },
        { path: ":id", element: <RoomCategoryEdit /> },
      ],
    },
    {
      path: "room",
      children: [
        { index: true, element: <RoomPage /> },
        { path: "create", element: <RoomCreate /> },
        { path: ":id", element: <RoomEdit /> },
      ],
    },
    {
      path: "booking",
      children: [
        { index: true, element: <BookingPage /> },
        { path: "create", element: <BookingCreate /> },
        { path: ":id", element: <BookingEdit /> },
      ],
    },
  ],
};

export default hotelRoutesList;
