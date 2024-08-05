import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Link as RouterLink } from "react-router-dom";

import { lighten } from "@mui/material/styles";
import { Helmet } from "react-helmet-async";

export default function AboutPage() {
  const theme = useTheme();
  return (
    <>
      <Helmet>
        <title>About Us - We Ship Worldwide</title>
      </Helmet>

      <Box
        alignContent="center"
        py={16}
        sx={{
          backgroundColor: lighten(theme.palette.primary.light, 0.8),
        }}
      >
        <Grid container>
          <Grid md={12} xs={12}>
            <Typography variant="h2" component="h1" align="center" gutterBottom>
              About Us
            </Typography>
            <Box>
              <Breadcrumbs
                aria-label="breadcrumb"
                sx={{
                  "& ol": {
                    justifyContent: "center",
                    margin: "auto",
                  },
                }}
              >
                <Link
                  underline="hover"
                  color="inherit"
                  component={RouterLink}
                  to="/"
                >
                  Home
                </Link>
                <Typography color="text.primary">About Us</Typography>
              </Breadcrumbs>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Container maxWidth="lg">
        <Box alignContent="center" my={6}>
          <Grid container spacing={2} alignItems="center">
            <Grid xs={12} md={6} p={4}>
              <Typography variant="h6" component="h2" gutterBottom>
                About Us
              </Typography>
              <Typography variant="body1" gutterBottom>
                We are your friend who lives in U.S.A.!!!! You shop, we ship for
                you.
              </Typography>
              <Typography variant="h2" component="h3" gutterBottom>
                How We Can Help
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Low Shipping Cost : </strong>We Ship Worldwide offers a
                selection of shipping services to each region or country with
                different delivery options. You choose an option suited to your
                budget.
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Fast Processing : </strong>Most shipments are available
                for review within 24 hours of receipt and processed for
                shipment.
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Security is Top Priority : </strong>All items are stored
                in our warehouse are protected by 24 hour video surveillance. We
                ensure that all items are safe from damage in transit.
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Responsive Support Team : </strong>Our support team is
                happy to help and respond to any questions about your items.
                They can be reached by phone or email.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  my: 4,
                }}
              >
                <Button
                  color="primary"
                  variant="text"
                  size="large"
                  component={RouterLink}
                  to="/login"
                >
                  Sign in
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  component={RouterLink}
                  to="/register"
                >
                  Sign Up for Free
                </Button>
              </Box>
            </Grid>
            <Grid xs={12} md={6} p={6} alignContent="center">
              <Box
                component="img"
                loading="lazy"
                src="/assets/images/Shipping-About-us.png"
                alt="We Ship Worldwide"
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 1,
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
