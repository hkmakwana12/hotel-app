import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
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
import { createUser, getUser, updateUser } from "src/redux/slices/userSlice";
import { useEffect } from "react";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Email format is not proper"),
  password: yup.string(),
  confirmPassword: yup
    .string()
    // .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Confirm Password does not match"),
});

export default function UserForm({ title, id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isSuccess, isLoading } = useSelector((state) => state.user);

  let defaultValue = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  useEffect(() => {
    if (id !== null) dispatch(getUser(id));
  }, [id]);

  useEffect(() => {
    if (isSuccess) navigate("/admin/user");
  }, [isSuccess]);

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValue,
  });

  useEffect(() => {
    if (user !== null && id !== null) {
      reset({
        name: user?.name,
        email: user?.email,
      });
    }
  }, [reset, user, id]);

  const onSubmit = (data) => {
    if (id === null) {
      dispatch(createUser(data));
    } else {
      dispatch(updateUser({ postData: data, id: id }));
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
          <Grid md={6}>
            <Card>
              <CardHeader title="User Information" />
              <Divider />
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid
                    container
                    spacing={3}
                  >
                    <Grid md={12}>
                      <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            label="Name"
                            {...field}
                            fullWidth
                            error={errors.name ? true : false}
                            helperText={errors.name?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid md={12}>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            label="Email"
                            {...field}
                            fullWidth
                            error={errors.email ? true : false}
                            helperText={errors.email?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid md={12}>
                      <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            type="password"
                            label="Password"
                            {...field}
                            fullWidth
                            error={errors.password ? true : false}
                            helperText={errors.password?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid md={12}>
                      <Controller
                        name="confirmPassword"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            type="password"
                            label="Confirm Password"
                            {...field}
                            fullWidth
                            error={errors.confirmPassword ? true : false}
                            helperText={errors.confirmPassword?.message}
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
                          to="/admin/user"
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
