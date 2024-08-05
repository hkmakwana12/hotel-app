import { Box, LinearProgress } from "@mui/material";
import React from "react";

const Loader = () => {
  return (
    <Box sx={{ width: "30%", my: "auto", mx: "auto" }}>
      <LinearProgress color="inherit" />
    </Box>
  );
};

export default Loader;
