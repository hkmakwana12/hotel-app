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
  createRoom,
  getRoom,
  updateRoom,
} from "src/modules/hotel-management/redux/slices/roomSlice";
import { useEffect } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { getBranches } from "../../redux/slices/branchSlice";
import {
  getRoomCategories,
  getRoomCategory,
  setSuccessFalse,
} from "../../redux/slices/roomCategorySlice";

const validationSchema = yup.object({
  branch_id: yup.string().required("Branch is required"),
  room_category_id: yup.string().required("Room Category is required"),
  room_number: yup.string().required("Room Number is required"),
});

export default function RoomForm({ title, id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { branches } = useSelector((state) => state.branch);
  const { roomCategories, roomCategory } = useSelector(
    (state) => state.roomCategory
  );
  const { room, isSuccess, isLoading } = useSelector((state) => state.room);

  let defaultValue = {
    branch_id: "",
    room_category_id: "",
    room_number: "",
    description: "",
    max_adult: 0,
    max_children: 0,
    min_nights: "",
    max_nights: "",
    price: 0,
    is_active: true,
  };

  useEffect(() => {
    dispatch(setSuccessFalse());
    dispatch(getBranches({ rowsPerPage: 100 }));
    dispatch(getRoomCategories({ rowsPerPage: 100 }));
    if (id !== null) dispatch(getRoom(id));
  }, [id]);

  useEffect(() => {
    if (isSuccess) navigate("/admin/room");
  }, [isSuccess]);

  const {
    control,
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValue,
  });

  useEffect(() => {
    setValue("description", roomCategory?.description);
    setValue("max_adult", roomCategory?.max_adult);
    setValue("max_children", roomCategory?.max_children);
    setValue("min_nights", roomCategory?.min_nights);
    setValue("max_nights", roomCategory?.max_nights);
    setValue("price", roomCategory?.price);
  }, [roomCategory]);

  useEffect(() => {
    if (room !== null && id !== null) {
      reset({
        branch_id: room?.branch_id,
        room_category_id: room?.room_category_id,
        room_number: room?.room_number,
        description: room?.description,
        max_adult: room?.max_adult,
        max_children: room?.max_children,
        min_nights: room?.min_nights,
        max_nights: room?.max_nights,
        price: room?.price,
        is_active: room?.is_active == 1 ? true : false,
      });
    }
  }, [reset, room, id]);

  const onSubmit = (data) => {
    if (id === null) {
      dispatch(createRoom(data));
    } else {
      dispatch(updateRoom({ postData: data, id: id }));
    }
  };

  const handleRoomCategoryChange = (event) => {
    const categoryId = event.target.value;

    if (categoryId !== "" && id === null) dispatch(getRoomCategory(categoryId));
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
          <Grid md={8}>
            <Card>
              <CardHeader title="Room Information" />
              <Divider />
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid
                    container
                    spacing={3}
                  >
                    <Grid md={6}>
                      <FormControl
                        fullWidth
                        error={errors.branch_id ? true : false}
                      >
                        <InputLabel id="branch-label">Branch</InputLabel>
                        <Controller
                          name="branch_id"
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              labelId="branch-label"
                              id="branch"
                              label="Branch"
                              MenuProps={{ sx: { maxHeight: 300 } }}
                            >
                              <MenuItem value="">Select Branch</MenuItem>
                              {branches?.map((branch) => (
                                <MenuItem
                                  value={branch.id}
                                  key={branch.id}
                                >
                                  {branch.name}
                                </MenuItem>
                              ))}
                            </Select>
                          )}
                        />
                        {errors.branch_id && (
                          <FormHelperText>
                            {errors.branch_id?.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid md={6}>
                      <FormControl
                        fullWidth
                        error={errors.room_category_id ? true : false}
                      >
                        <InputLabel id="room-category-label">
                          Room Category
                        </InputLabel>
                        <Controller
                          name="room_category_id"
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              onChange={(e) => {
                                handleRoomCategoryChange(e);
                                field.onChange(e);
                              }}
                              labelId="room-category-label"
                              id="room_category"
                              label="Room Category"
                              MenuProps={{ sx: { maxHeight: 300 } }}
                            >
                              <MenuItem value="">Select Room Category</MenuItem>
                              {roomCategories?.map((roomCategory) => (
                                <MenuItem
                                  value={roomCategory.id}
                                  key={roomCategory.id}
                                >
                                  {roomCategory.name}
                                </MenuItem>
                              ))}
                            </Select>
                          )}
                        />
                        {errors.room_category_id && (
                          <FormHelperText>
                            {errors.room_category_id?.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid md={12}>
                      <Controller
                        name="room_number"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            label="Room Number"
                            {...field}
                            fullWidth
                            error={errors.room_number ? true : false}
                            helperText={errors.room_number?.message}
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
                          to="/admin/room"
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
