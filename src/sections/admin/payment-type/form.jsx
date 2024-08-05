import { useEffect } from "react";
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
  createPaymentType,
  getPaymentType,
  getPaymentTypes,
  updatePaymentType,
} from "src/redux/slices/paymentTypeSlice";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
});

export default function PaymentTypeForm({ title, id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { paymentType, isSuccess, isLoading } = useSelector(
    (state) => state.paymentType
  );

  let defaultValue = {
    name: "",
    is_active: true,
  };

  useEffect(() => {
    if (id !== null) dispatch(getPaymentType(id));
  }, [id]);

  useEffect(() => {
    if (isSuccess) navigate("/admin/payment-type");
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
    if (paymentType !== null && id !== null) {
      reset({
        name: paymentType?.name,
        is_active: paymentType?.is_active == 1 ? true : false,
      });
    }
  }, [reset, paymentType, id]);

  const onSubmit = (data) => {
    if (id === null) {
      dispatch(createPaymentType(data));
    } else {
      dispatch(updatePaymentType({ postData: data, id: id }));
    }
  };

  return (
    <>
      <Container>
        <Stack mb={5}>
          <Typography variant="h4">{title}</Typography>
        </Stack>
        <Grid container spacing={3}>
          <Grid md={6}>
            <Card>
              <CardHeader title="Payment Type Information" />
              <Divider />
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={3}>
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
                      <Stack direction="row" gap={1}>
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
                          to="/admin/payment-type"
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
