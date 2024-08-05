import {
  Box,
  Container,
  IconButton,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Logo from "src/components/logo";

import Grid from "@mui/material/Unstable_Grid2";
import Iconify from "src/components/iconify";

import { lighten } from "@mui/material/styles";

const navItems = [
  { link: "/", title: "Home" },
  { link: "/about-us", title: "About Us" },
  { link: "/our-services", title: "Our Services" },
  { link: "/contact-us", title: "Contact Us" },
];

export default function Footer() {
  const theme = useTheme();

  return (
    <>
      <Box
        component="footer"
        sx={{
          py: 3,
        }}
      >
        <Container maxWidth="lg">
          {/* <Grid
            container
            spacing={2}
            alignItems="center"
          >
            <Grid
              xs={12}
              md={6}
              my={4}
            >
              <Logo sx={{ mb: 4, width: "240px" }} />
              <Typography
                variant="body1"
                sx={{ fontSize: "1.2rem", color: "text.secondary" }}
              >
                We stand behind our promise to deliver timely and quality
                service.
              </Typography>
              <Stack
                direction="row"
                justifyContent="left"
                spacing={1}
                useFlexGap
                sx={{
                  color: "text.secondary",
                }}
              >
                <IconButton
                  color="inherit"
                  href="https://www.facebook.com/weshipww"
                  target="_blank"
                  aria-label="Facebook"
                  sx={{
                    alignSelf: "center",
                    "&:hover": {
                      color: "#1778f2",
                      backgroundColor: lighten("#1778f2", 0.8),
                    },
                  }}
                >
                  <Iconify icon="eva:facebook-outline" />
                </IconButton>
              </Stack>
            </Grid>
            <Grid
              xs={6}
              md={2}
              my={4}
            >
              <Typography
                variant="h4"
                component="h3"
              >
                Site Pages
              </Typography>
              <Box>
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    component={RouterLink}
                    to={item.link}
                    underline="none"
                    sx={{
                      display: "flex",
                      color: "text.secondary",
                      fontSize: "1.1rem",
                    }}
                  >
                    {item.title}
                  </Link>
                ))}
              </Box>
            </Grid>
            <Grid
              xs={6}
              md={2}
              my={4}
            >
              <Typography
                variant="h4"
                component="h3"
              >
                Policies
              </Typography>
              <Box>
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    component={RouterLink}
                    to={item.link}
                    underline="none"
                    sx={{
                      display: "flex",
                      color: "text.secondary",
                      fontSize: "1.1rem",
                    }}
                  >
                    {item.title}
                  </Link>
                ))}
              </Box>
            </Grid>
          </Grid> */}
          <Typography
            variant="body1"
            align="center"
          >
            {import.meta.env.VITE_APP_NAME} &copy; {new Date().getFullYear()}.
            All Rights Reserved. | Developed by{" "}
            <Link
              underline="none"
              sx={{ color: theme.palette.primary.main }}
              component={RouterLink}
              to="https://ethericsolution.com/"
              target="_blank"
            >
              Etheric Solution
            </Link>
            .
          </Typography>
        </Container>
      </Box>
    </>
  );
}
