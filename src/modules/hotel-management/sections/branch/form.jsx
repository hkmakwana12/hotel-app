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
  createBranch,
  getBranch,
  updateBranch,
} from "src/modules/hotel-management/redux/slices/branchSlice";
import { useEffect } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
});

export default function BranchForm({ title, id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { branch, isSuccess, isLoading } = useSelector((state) => state.branch);

  let defaultValue = {
    name: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    is_active: true,
  };

  useEffect(() => {
    if (id !== null) dispatch(getBranch(id));
  }, [id]);

  useEffect(() => {
    if (isSuccess) navigate("/admin/branch");
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
    if (branch !== null && id !== null) {
      reset({
        name: branch?.name,
        description: branch?.description,
        address: branch?.address,
        phone: branch?.phone,
        email: branch?.email,
        is_active: branch?.is_active == 1 ? true : false,
      });
    }
  }, [reset, branch, id]);

  const onSubmit = (data) => {
    if (id === null) {
      dispatch(createBranch(data));
    } else {
      dispatch(updateBranch({ postData: data, id: id }));
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
              <CardHeader title="Branch Information" />
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
                        name="description"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            multiline
                            rows={3}
                            label="Description"
                            {...field}
                            fullWidth
                            error={errors.description ? true : false}
                            helperText={errors.description?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid md={12}>
                      <Controller
                        name="address"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            label="Address"
                            {...field}
                            fullWidth
                            error={errors.address ? true : false}
                            helperText={errors.address?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid md={12}>
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
                    <Grid md={12}>
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
                    <Grid md={12}>
                      <FormControlLabel
                        control={
                          <Controller
                            control={control}
                            name="is_active"
                            inputRef={register("is_active")}
                            render={({ field: { onChange, value } }) => (
                              <Checkbox
                                checked={value}
                                color="primary"
                                onChange={(e) => onChange(e.target.checked)}
                              />
                            )}
                          />
                        }
                        label={
                          <Typography
                            color={errors.is_active ? "error" : "inherit"}
                          >
                            Active
                          </Typography>
                        }
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
                          to="/admin/branch"
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
