import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { lighten } from "@mui/material/styles";

const services = [
  {
    title: "Get Free USA Address",
    description:
      "Sign up with Us and get your free USA address. Once you registered with We Ship Worldwide.",
    image: "/assets/images/services/Get-Free-USA-Address.png",
  },
  {
    title: "Shop from USA",
    description:
      "Shop from various online retailers of USA and use Our Free USA address when you checkout.",
    image: "/assets/images/services/Shop-from-U.S.A.png",
  },
  {
    title: "Receiving Package",
    description:
      "We will accept your package on behalf of you. We will consolidate more packages in one on your request.",
    image: "/assets/images/services/Receiving-Package.png",
  },
  {
    title: "Get Package Fast",
    description:
      "We will ship your package(s) to your doorstep and update your account with package forwarding details.",
    image: "/assets/images/services/Get-Package-Fast.png",
  },
];

export default function HowItWorks() {
  const theme = useTheme();
  return (
    <Box sx={{ backgroundColor: lighten(theme.palette.primary.light, 0.8) }}>
      <Container maxWidth="lg">
        <Box sx={{ py: 6 }}>
          <Grid
            container
            spacing={6}
          >
            <Grid
              md={12}
              xs={12}
            >
              <Typography
                variant="h3"
                component="h2"
                align="center"
                gutterBottom
              >
                How it Works
              </Typography>
              <Typography
                variant="body1"
                align="center"
                gutterBottom
              >
                Shop from TOP USA Brands and Ship to your Doorstep!
              </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={4}
          >
            {services.map((service, index) => (
              <Grid
                xs={12}
                sm={6}
                md={3}
                key={index}
              >
                <ServiceCard service={service} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

const ServiceCard = ({ service }) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        transition: "box-shadow 0.3s",
        "&:hover": {
          boxShadow: `0 4px 8px 0 ${theme.palette.primary.light}`,
        },
      }}
      align="center"
    >
      <CardMedia
        component="img"
        loading="lazy"
        image={service.image}
        alt={service.title}
        sx={{ p: 4 }}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="h5"
        >
          {service.title}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
        >
          {service.description}
        </Typography>
      </CardContent>
    </Card>
  );
};
