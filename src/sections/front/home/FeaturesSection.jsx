import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const features = [
  {
    title: "Consolidation",
    description: "Combine multiple packages into one shipment upon request.",
    image: "/assets/images/features/Consolidation.png",
  },
  {
    title: "Fast Shipping",
    description:
      "We work hard to ensure that your shipment orders are fulfilled ASAP.",
    image: "/assets/images/features/Fast-Shipping.png",
  },
  {
    title: "Responsive Support",
    description:
      "Our Support Staff is ready and willing to answer any of your inquiry promptly.",
    image: "/assets/images/features/Responsive-Support.png",
  },
  {
    title: "Shop For Me",
    description:
      "We can buy your items if the merchant doesn't accept your credit card.",
    image: "/assets/images/features/Shop-For-Me.png",
  },
  {
    title: "Free Membership",
    description:
      "Your USA address costs nothing. We are happy to accept your packages.",
    image: "/assets/images/features/Free-Membership.png",
  },
  {
    title: "Secure Storage",
    description:
      "Your items are stored in our secured warehouse and are monitored by 24-hour surveillance.",
    image: "/assets/images/features/Secure-Storage.png",
  },
  {
    title: "Repackaging",
    description: "We can repack your boxes to save your shipping cost.",
    image: "/assets/images/features/Repackaging.png",
  },
  {
    title: "Shipment Insurance",
    description:
      "Protect your shipment value with opt-in coverage for total peace of mind.",
    image: "/assets/images/features/Shipment-Insurance.png",
  },
];

export default function FeaturesSection() {
  return (
    <Box>
      <Container maxWidth="lg">
        <Box sx={{ py: 6 }}>
          <Grid
            container
            spacing={4}
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
                Features & Highlights
              </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={4}
          >
            {features.map((feature, index) => (
              <Grid
                xs={12}
                sm={6}
                md={3}
                key={index}
              >
                <FeatureCard feature={feature} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

const FeatureCard = ({ feature }) => {
  return (
    <Box
      sx={{
        transition: "box-shadow 0.3s",
      }}
      align="center"
    >
      <Box
        component="img"
        src={feature.image}
        alt={feature.title}
        sx={{ p: 4 }}
      />
      <Typography
        gutterBottom
        variant="h5"
        component="h5"
      >
        {feature.title}
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
      >
        {feature.description}
      </Typography>
    </Box>
  );
};
