import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";

import Nav from "./nav";
import Main from "./main";
import Header from "./header";
import { useGetUserDetailsQuery } from "src/services/authService";
import { useDispatch, useSelector } from "react-redux";
import { logout, setCredentials } from "src/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userToken } = useSelector((state) => state.auth);

  // automatically authenticate user if token is found
  const { data, error } = useGetUserDetailsQuery("userDetails", {
    // perform a refetch every 15mins
    pollingInterval: 900000,
  });

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(logout());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (!userToken) navigate("/admin/login");
  }, [userToken, navigate]);

  if (userToken)
    return (
      <>
        <Header onOpenNav={() => setOpenNav(true)} />

        <Box
          sx={{
            minHeight: 1,
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
          }}
        >
          <Nav
            openNav={openNav}
            onCloseNav={() => setOpenNav(false)}
          />

          <Main>{children}</Main>
        </Box>
      </>
    );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
