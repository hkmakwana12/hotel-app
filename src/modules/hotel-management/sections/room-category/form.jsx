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
  createRoomCategory,
  getRoomCategory,
  updateRoomCategory,
} from "src/modules/hotel-management/redux/slices/roomCategorySlice";
import { useEffect } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
});

export default function RoomCategoryForm({ title, id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { roomCategory, isSuccess, isLoading } = useSelector(
    (state) => state.roomCategory
  );

  let defaultValue = {
    name: "",
    description: "",
    max_adult: 0,
    max_children: 0,
    min_nights: "",
    max_nights: "",
    price: 0,
    is_active: true,
  };

  useEffect(() => {
    if (id !== null) dispatch(getRoomCategory(id));
  }, [id]);

  useEffect(() => {
    if (isSuccess) navigate("/admin/category");
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
    if (roomCategory !== null && id !== null) {
      reset({
        name: roomCategory?.name,
        description: roomCategory?.description,
        max_adult: roomCategory?.max_adult,
        max_children: roomCategory?.max_children,
        min_nights: roomCategory?.min_nights,
        max_nights: roomCategory?.max_nights,
        price: roomCategory?.price,
        is_active: roomCategory?.is_active == 1 ? true : false,
      });
    }
  }, [reset, roomCategory, id]);

  const onSubmit = (data) => {
    if (id === null) {
      dispatch(createRoomCategory(data));
    } else {
      dispatch(updateRoomCategory({ postData: data, id: id }));
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
              <CardHeader title="Room Category Information" />
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
                    <Grid md={6}>
                      <Controller
                        name="max_adult"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            label="Max Adults"
                            {...field}
                            fullWidth
                            error={errors.max_adult ? true : false}
                            helperText={errors.max_adult?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid md={6}>
                      <Controller
                        name="max_children"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            label="Max Children"
                            {...field}
                            fullWidth
                            error={errors.max_children ? true : false}
                            helperText={errors.max_children?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid md={6}>
                      <Controller
                        name="min_nights"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            label="Min Nights"
                            {...field}
                            fullWidth
                            error={errors.min_nights ? true : false}
                            helperText={
                              errors.min_nights?.message ??
                              "empty = no minimum booking nights"
                            }
                          />
                        )}
                      />
                    </Grid>
                    <Grid md={6}>
                      <Controller
                        name="max_nights"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            label="Max Nights"
                            {...field}
                            fullWidth
                            error={errors.max_nights ? true : false}
                            helperText={
                              errors.max_nights?.message ??
                              "empty = no maximum booking nights"
                            }
                          />
                        )}
                      />
                    </Grid>
                    <Grid md={12}>
                      <Controller
                        name="price"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            label="Price"
                            {...field}
                            fullWidth
                            error={errors.price ? true : false}
                            helperText={errors.price?.message}
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
                          to="/admin/category"
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
