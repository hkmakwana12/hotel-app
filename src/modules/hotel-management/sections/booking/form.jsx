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
  createBooking,
  getBooking,
  updateBooking,
} from "src/modules/hotel-management/redux/slices/bookingSlice";
import { useEffect } from "react";
import { fDate } from "src/utils/format-time";
import { addDays, differenceInDays } from "date-fns";
import { Autocomplete, Box } from "@mui/material";
import { getCustomers } from "src/modules/hotel-management/redux/slices/customerSlice";
import { getRooms } from "src/modules/hotel-management/redux/slices/roomSlice";

const validationSchema = yup.object({
  customer: yup.object().required("Customer is required"),
  room: yup.object().required("Room is required"),
  from_date: yup.string().required("Start Date is required"),
  end_date: yup.string().required("End Date is required"),
});

const today = fDate(new Date(), "yyyy-MM-dd");

const tomorrow = fDate(addDays(new Date(), 1), "yyyy-MM-dd");

let defaultValue = {
  customer_id: "",
  customer: null,
  room_id: "",
  room: null,
  from_date: today,
  end_date: tomorrow,
  adults: 0,
  children: 0,
  rate: 0,
  total: 0,
};

export default function BookingForm({ title, id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { booking, isSuccess, isLoading } = useSelector(
    (state) => state.booking
  );
  const { customers } = useSelector((state) => state.customer);
  const { rooms } = useSelector((state) => state.room);

  useEffect(() => {
    dispatch(getCustomers({ rowsPerPage: 100 }));
    dispatch(getRooms({ rowsPerPage: 100 }));
    if (id !== null) dispatch(getBooking(id));
  }, [id]);

  useEffect(() => {
    if (isSuccess) navigate("/admin/booking");
  }, [isSuccess]);

  const {
    control,
    reset,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValue,
  });

  const formValues = watch();

  useEffect(() => {
    const startDate = new Date(formValues.from_date);
    const endDate = new Date(formValues.end_date);

    const days = differenceInDays(endDate, startDate);

    const total = days * formValues.rate;

    setValue("total", total);
  }, [formValues]);

  useEffect(() => {
    if (booking !== null && id !== null) {
      reset({
        customer_id: booking?.customer_id,
        customer: booking?.customer,
        room_id: booking?.room_id,
        room: booking?.room,
        from_date: booking?.from_date,
        end_date: booking?.end_date,
        adults: booking?.adults,
        children: booking?.children,
        rate: booking?.rate,
        total: booking?.total,
      });
    }
  }, [reset, booking, id]);

  const onSubmit = (data) => {
    if (id === null) {
      dispatch(createBooking(data));
    } else {
      dispatch(updateBooking({ postData: data, id: id }));
    }
  };

  const handleCustomerChange = (newValue) => {
    setValue("customer", newValue);
    if (newValue) {
      setValue("customer_id", newValue.id);
    } else {
      setValue("customer_id", "");
    }
  };

  const handleRoomChange = (newValue) => {
    setValue("rate", newValue.price);
    setValue("room", newValue);
    if (newValue) {
      setValue("room_id", newValue.id);
    } else {
      setValue("room_id", "");
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
              <CardHeader title="Booking Information" />
              <Divider />
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid
                    container
                    spacing={3}
                  >
                    <Grid md={6}>
                      <Controller
                        name="customer"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Autocomplete
                            onChange={(event, newValue) => {
                              handleCustomerChange(newValue);
                            }}
                            value={value}
                            options={customers}
                            getOptionLabel={(option) => {
                              return `${option?.first_name} ${option?.last_name}`;
                            }}
                            isOptionEqualToValue={(option, value) =>
                              option.id === value.id
                            }
                            renderOption={(props, option) => (
                              <Box
                                component="li"
                                {...props}
                              >
                                {`${option.first_name} ${option.last_name}`}
                              </Box>
                            )}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Customer"
                                error={errors.customer ? true : false}
                                helperText={errors.customer?.message}
                              />
                            )}
                          />
                        )}
                      />
                    </Grid>
                    <Grid md={6}>
                      <Controller
                        name="room"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Autocomplete
                            onChange={(event, newValue) => {
                              handleRoomChange(newValue);
                            }}
                            value={value}
                            options={rooms}
                            getOptionLabel={(option) => {
                              return `${option?.room_number} - ${option?.room_category?.name}`;
                            }}
                            isOptionEqualToValue={(option, value) =>
                              option.id === value.id
                            }
                            renderOption={(props, option) => (
                              <Box
                                component="li"
                                {...props}
                              >
                                {`${option.room_number} - ${option.room_category?.name}`}
                              </Box>
                            )}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Room"
                                error={errors.room ? true : false}
                                helperText={errors.room?.message}
                              />
                            )}
                          />
                        )}
                      />
                    </Grid>

                    <Grid md={6}>
                      <Controller
                        name="from_date"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            type="date"
                            label="Start Date"
                            InputLabelProps={{ shrink: true }}
                            {...field}
                            fullWidth
                            error={errors.from_date ? true : false}
                            helperText={errors.from_date?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid md={6}>
                      <Controller
                        name="end_date"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            type="date"
                            label="End Date"
                            InputLabelProps={{ shrink: true }}
                            {...field}
                            fullWidth
                            error={errors.end_date ? true : false}
                            helperText={errors.end_date?.message}
                          />
                        )}
                      />
                    </Grid>

                    <Grid md={6}>
                      <Controller
                        name="adults"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            label="Adults"
                            {...field}
                            fullWidth
                            error={errors.adults ? true : false}
                            helperText={errors.adults?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid md={6}>
                      <Controller
                        name="children"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            label="Children"
                            {...field}
                            fullWidth
                            error={errors.children ? true : false}
                            helperText={errors.children?.message}
                          />
                        )}
                      />
                    </Grid>

                    <Grid md={6}>
                      <Controller
                        name="rate"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            label="Rate"
                            {...field}
                            fullWidth
                            error={errors.rate ? true : false}
                            helperText={errors.rate?.message}
                          />
                        )}
                      />
                    </Grid>

                    <Grid md={6}>
                      <Controller
                        name="total"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            label="Total"
                            {...field}
                            fullWidth
                            error={errors.total ? true : false}
                            helperText={errors.total?.message}
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
                          to="/admin/booking"
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
