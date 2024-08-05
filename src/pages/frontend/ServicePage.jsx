import {
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  CardMedia,
  Container,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Link as RouterLink } from "react-router-dom";

import { lighten } from "@mui/material/styles";
import { Helmet } from "react-helmet-async";

export default function ServicePage() {
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
              Our Services
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
                <Typography color="text.primary">Our Services</Typography>
              </Breadcrumbs>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
          my={4}
        >
          <Grid
            md={12}
            xs={12}
          >
            <Card sx={{ display: "flex" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { md: "row", xs: "column" },
                }}
              >
                <CardMedia
                  component="img"
                  loading="lazy"
                  sx={{ width: 251 }}
                  image="/assets/images/features2/Get-free-U.S.A.-Address.png"
                  alt="Store & Forward"
                />
                <CardContent>
                  <Typography
                    component="h3"
                    variant="h3"
                  >
                    Store & Forward
                  </Typography>

                  <Box component="ul">
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="li"
                    >
                      We will store your packages free for 30 days.
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="li"
                    >
                      Discounted & Affordable shipping rates with major carriers
                    </Typography>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid
            md={12}
            xs={12}
          >
            <Card sx={{ display: "flex" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { md: "row", xs: "column" },
                }}
              >
                <CardMedia
                  component="img"
                  loading="lazy"
                  sx={{ width: 251 }}
                  image="/assets/images/features2/Consolidation.png"
                  alt="Consolidation"
                />
                <CardContent>
                  <Typography
                    component="h3"
                    variant="h3"
                  >
                    Consolidation
                  </Typography>

                  <Box component="ul">
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="li"
                    >
                      We can combine several small packages into one package so
                      you save big on shipping. we ship worldwide provide
                      package consolidation
                    </Typography>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid
            md={12}
            xs={12}
          >
            <Card sx={{ display: "flex" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { md: "row", xs: "column" },
                }}
              >
                <CardMedia
                  component="img"
                  loading="lazy"
                  sx={{ width: 251 }}
                  image="/assets/images/features2/Repaking.png"
                  alt="Repacking"
                />
                <CardContent>
                  <Typography
                    component="h3"
                    variant="h3"
                  >
                    Repacking
                  </Typography>

                  <Box component="ul">
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="li"
                    >
                      We inspect every package upon its arrival to ensure that
                      they are shipped safely.
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="li"
                    >
                      We discard unnecessary big boxes and repack them with
                      padding to ensure the safety of your package upon request.
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="li"
                    >
                      If we find your package(s) are damaged, we take the
                      liberty to replace them if necessary.
                    </Typography>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid
            md={12}
            xs={12}
          >
            <Card sx={{ display: "flex" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { md: "row", xs: "column" },
                }}
              >
                <CardMedia
                  component="img"
                  loading="lazy"
                  sx={{ width: 251 }}
                  image="/assets/images/features2/Buy-From-US.png"
                  alt="Shop for me"
                />
                <CardContent>
                  <Typography
                    component="h3"
                    variant="h3"
                  >
                    Shop for me
                  </Typography>

                  <Box component="ul">
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="li"
                    >
                      Coming Soon…
                    </Typography>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid
            md={12}
            xs={12}
          >
            <Card sx={{ display: "flex" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { md: "row", xs: "column" },
                }}
              >
                <CardMedia
                  component="img"
                  loading="lazy"
                  sx={{ width: 251 }}
                  image="/assets/images/features2/Receiving-Your-Package.png"
                  alt="Package Return"
                />
                <CardContent>
                  <Typography
                    component="h3"
                    variant="h3"
                  >
                    Package Return
                  </Typography>

                  <Box component="ul">
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="li"
                    >
                      In case if you do not like your product, we will arrange a
                      return service for you.
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="li"
                    >
                      Please email out customer service and they will be happy
                      to explain return procedure.
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="li"
                    >
                      Please check our return service and shipping rate.
                    </Typography>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
