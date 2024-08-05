import React from "react";
import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Container,
} from "@mui/material";
import { lighten, useTheme } from "@mui/material/styles";

const testimonials = [
  {
    name: "John",
    position: "United Kingdom",
    text: "I had a positive experience. Great service for several years if you need to combine your parcels and deliver it safely to another country.",
    avatar: "path-to-avatar1.jpg",
  },
  {
    name: "Zack",
    position: "Lusaka,Zambia",
    text: "I've been using We Ship Worldwide for a few Months I've shipped to many different countries. They've always gotten it there perfectly safely and on time. They give you a nice selection of different shippers and different prices. It's an excellent service.",
    avatar: "path-to-avatar2.jpg",
  },
  {
    name: "Sanjay",
    position: "New Delhi,India",
    text: "Easy and Friendly Website to use… I'm able to shop for items on US sites that don't offer international shipping. I've had several packages mailed through We Ship Worldwide now and love being able to trust in the service. Will definitely be using it again, thank you.",
    avatar: "path-to-avatar3.jpg",
  },
];

const TestimonialCard = ({ testimonial }) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        transition: "box-shadow 0.3s",
        "&:hover": {
          boxShadow: `0 4px 8px 0 ${theme.palette.primary.main}`,
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <Avatar
            alt={testimonial.name}
            sx={{ marginRight: 2 }}
          >
            {testimonial.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography
              variant="h6"
              component="div"
            >
              {testimonial.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {testimonial.position}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body1">{testimonial.text}</Typography>
      </CardContent>
    </Card>
  );
};

const TestimonialsSection = () => {
  const theme = useTheme();
  return (
    <Box sx={{ backgroundColor: lighten(theme.palette.primary.light, 0.8) }}>
      <Container
        maxWidth="lg"
        sx={{ py: 8 }}
      >
        <Grid
          container
          spacing={6}
          mb={4}
        >
          <Grid
            item
            md={12}
            xs={12}
          >
            <Typography
              variant="h3"
              component="h2"
              align="center"
              gutterBottom
            >
              Testimonials
            </Typography>
            <Typography
              variant="body1"
              align="center"
              gutterBottom
            >
              What People Say About Us
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={4}
        >
          {testimonials.map((testimonial, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
            >
              <TestimonialCard testimonial={testimonial} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;
