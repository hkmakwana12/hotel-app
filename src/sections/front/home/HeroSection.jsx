import { Link } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

export default function HeroSection() {
  return (
    <Container maxWidth="lg">
      <Box minHeight="80vh" alignContent="center">
        <Grid container spacing={2} alignItems="center">
          <Grid xs={12} md={6}>
            <Box
              component="img"
              loading="lazy"
              src={`/assets/images/We-Ship-Worldwide-1.jpg`}
              alt="We Ship Worldwide"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 1,
              }}
            />
          </Grid>
          <Grid xs={12} md={6} p={4}>
            <Typography variant="h2" component="h1" gutterBottom>
              We Ship Worldwide
            </Typography>
            <Typography variant="h3" component="h2" gutterBottom>
              Shop from USA & We Ship to your doorstep!!!
            </Typography>
            <Typography variant="body1">
              Shop from any website in the USA and ship the items to your
              country of residence.
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
                component={Link}
                to="/login"
              >
                Sign in
              </Button>
              <Button
                color="primary"
                variant="contained"
                size="large"
                component={Link}
                to="/register"
              >
                Sign Up for Free
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
