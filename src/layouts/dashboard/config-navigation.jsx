import SvgColor from "src/components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "dashboard",
    path: "/admin/dashboard",
    icon: icon("ic_analytics"),
  },
  {
    title: "Bookings",
    path: "/admin/booking",
    icon: icon("ic_cart"),
  },
  {
    title: "Agencies",
    path: "/admin/agency",
    icon: icon("ic_cart"),
  },
  {
    title: "Customers",
    path: "/admin/customer",
    icon: icon("ic_cart"),
  },
  {
    title: "Branches",
    path: "/admin/branch",
    icon: icon("ic_cart"),
  },
  {
    title: "Room Categories",
    path: "/admin/category",
    icon: icon("ic_cart"),
  },
  {
    title: "Rooms",
    path: "/admin/room",
    icon: icon("ic_cart"),
  },
  {
    title: "Config",
    icon: icon("ic_lock"),
    items: [
      {
        title: "Payment Types",
        path: "/admin/payment-type",
        icon: icon("ic_circle"),
      },
      {
        title: "User",
        path: "/admin/user",
        icon: icon("ic_circle"),
      },
    ],
  },
  {
    title: "Settings",
    icon: icon("ic_disabled"),
    items: [
      {
        title: "general",
        path: "/admin/settings/general",
        icon: icon("ic_circle"),
      },
    ],
  },
];

export default navConfig;
