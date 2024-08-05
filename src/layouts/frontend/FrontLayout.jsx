import { Box, Fab, Fade, Toolbar, useScrollTrigger } from "@mui/material";
import TopNav from "./common/TopNav";
import Footer from "./common/Footer";
import Iconify from "src/components/iconify";

export default function FrontLayout(props) {
  const { children } = props;
  return (
    <Box>
      <TopNav />

      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "90vh",
        }}
      >
        <Toolbar id="back-to-top-anchor" />
        {children}
      </Box>
      <Footer />
      <ScrollTop {...props}>
        <Fab
          color="primary"
          aria-label="scroll back to top"
        >
          <Iconify icon="eva:arrow-upward-outline" />
        </Fab>
      </ScrollTop>
    </Box>
  );
}

function ScrollTop(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}
