import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

import { useDispatch, useSelector } from "react-redux";
import {
  createCustomer,
  getCustomer,
  updateCustomer,
} from "src/modules/hotel-management/redux/slices/customerSlice";
import { useEffect } from "react";

const validationSchema = yup.object({
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
});

export default function CustomerForm({ title, id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { customer, isSuccess, isLoading } = useSelector(
    (state) => state.customer
  );

  let defaultValue = {
    name: "",
  };

  useEffect(() => {
    if (id !== null) dispatch(getCustomer(id));
  }, [id]);

  useEffect(() => {
    if (isSuccess) navigate("/admin/customer");
  }, [isSuccess]);

  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValue,
  });

  useEffect(() => {
    if (customer !== null && id !== null) {
      reset({
        name: customer?.name,
      });
    }
  }, [reset, customer, id]);

  const onSubmit = (data) => {
    if (id === null) {
      dispatch(createCustomer(data));
    } else {
      dispatch(updateCustomer({ postData: data, id: id }));
    }
  };

  return (
    <>
      <Container>
        <Stack mb={5}>
          <Typography variant="h4">{title}</Typography>
        </Stack>
        <Grid
          container
          spacing={3}
        >
          <Grid md={12}>
            <Card>
              <CardHeader title="Customer Information" />
              <Divider />
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid
                    container
                    spacing={3}
                  >
                    <Grid md={4}>
                      <Controller
                        name="first_name"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            label="First Name"
                            {...field}
                            fullWidth
                            error={errors.first_name ? true : false}
                            helperText={errors.first_name?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid md={4}>
                      <Controller
                        name="middle_name"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            label="Middle Name"
                            {...field}
                            fullWidth
                            error={errors.middle_name ? true : false}
                            helperText={errors.middle_name?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid md={4}>
                      <Controller
                        name="last_name"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            label="Last Name"
                            {...field}
                            fullWidth
                            error={errors.last_name ? true : false}
                            helperText={errors.last_name?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid md={6}>
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            label="Phone Number"
                            {...field}
                            fullWidth
                            error={errors.phone ? true : false}
                            helperText={errors.phone?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid md={6}>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            label="Email Address"
                            {...field}
                            fullWidth
                            error={errors.email ? true : false}
                            helperText={errors.email?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid md={6}>
                      <Controller
                        name="line_1"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            label="Address Line 1"
                            {...field}
                            fullWidth
                            error={errors.line_1 ? true : false}
                            helperText={errors.line_1?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid md={6}>
                      <Controller
                        name="line_2"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            label="Address Line 2"
                            {...field}
                            fullWidth
                            error={errors.line_2 ? true : false}
                            helperText={errors.line_2?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid md={4}>
                      <Controller
                        name="city"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            label="City"
                            {...field}
                            fullWidth
                            error={errors.city ? true : false}
                            helperText={errors.city?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid md={4}>
                      <Controller
                        name="state"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            label="State"
                            {...field}
                            fullWidth
                            error={errors.state ? true : false}
                            helperText={errors.state?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid md={4}>
                      <Controller
                        name="zipcode"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            label="Zipcode"
                            {...field}
                            fullWidth
                            error={errors.zipcode ? true : false}
                            helperText={errors.zipcode?.message}
                          />
                        )}
                      />
                    </Grid>

                    <Grid md={12}>
                      <Stack
                        direction="row"
                        gap={1}
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          disabled={isLoading}
                        >
                          Save details
                        </Button>
                        <Button
                          variant="outlined"
                          component={Link}
                          to="/admin/customer"
                        >
                          Cancel
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
