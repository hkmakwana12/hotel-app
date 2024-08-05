import {
  Box,
  Breadcrumbs,
  Container,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Link as RouterLink } from "react-router-dom";

import { lighten } from "@mui/material/styles";
import Iconify from "src/components/iconify";
import { Helmet } from "react-helmet-async";

export default function ContactPage() {
  const theme = useTheme();
  return (
    <>
      <Helmet>
        <title>Contact Us - We Ship Worldwide</title>
      </Helmet>

      <Box
        alignContent="center"
        py={16}
        sx={{
          backgroundColor: lighten(theme.palette.primary.light, 0.8),
        }}
      >
        <Grid container>
          <Grid
            md={12}
            xs={12}
          >
            <Typography
              variant="h2"
              component="h1"
              align="center"
              gutterBottom
            >
              Contact Us
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
                <Typography color="text.primary">Contact Us</Typography>
              </Breadcrumbs>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Container maxWidth="lg">
        <Box
          alignContent="center"
          my={6}
        >
          <Grid container>
            <Grid
              md={6}
              xs={12}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
              >
                <Iconify icon="eva:email-outline" />
                <Box p={3}>
                  <Typography
                    variant="h4"
                    component="h3"
                  >
                    Email Us
                  </Typography>
                  <Typography variant="body1">info@weshipww.com</Typography>
                  <Typography variant="body1">support@weshipww.com</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid
              md={6}
              xs={12}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
              >
                <Iconify icon="eva:email-outline" />
                <Box p={3}>
                  <Typography
                    variant="h4"
                    component="h3"
                  >
                    Follow Us
                  </Typography>
                  <Typography variant="body1">info@weshipww.com</Typography>
                  <Typography variant="body1">support@weshipww.com</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
