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
  createAgency,
  getAgency,
  updateAgency,
} from "src/modules/hotel-management/redux/slices/agencySlice";
import { useEffect } from "react";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
});

export default function AgencyForm({ title, id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { agency, isSuccess, isLoading } = useSelector((state) => state.agency);

  let defaultValue = {
    name: "",
  };

  useEffect(() => {
    if (id !== null) dispatch(getAgency(id));
  }, [id]);

  useEffect(() => {
    if (isSuccess) navigate("/admin/agency");
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
    if (agency !== null && id !== null) {
      reset({
        name: agency?.name,
      });
    }
  }, [reset, agency, id]);

  const onSubmit = (data) => {
    if (id === null) {
      dispatch(createAgency(data));
    } else {
      dispatch(updateAgency({ postData: data, id: id }));
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
              <CardHeader title="Agency Information" />
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
                          to="/admin/agency"
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
