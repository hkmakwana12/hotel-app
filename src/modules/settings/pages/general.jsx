import { Button, Card, CardContent, CardHeader, Container, Divider, Stack, TextField, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { Helmet } from "react-helmet-async"
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getSettings, storeSettings } from "src/modules/settings/redux/settingsSlice";
import { useEffect } from "react";


const defaultValue = {
  name: '',
  late_fee: 0,
  bill_prefix: '',
  bill_digit_length: 4,
  bill_sequence_number: 1,
  bill_creation_date: "",
  bill_due_date: "",
};

const GeneralSettings = () => {

  const dispatch = useDispatch();

  const { isLoading, settings } = useSelector((state) => state.settings)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValue,
  });

  useEffect(() => {
    dispatch(getSettings())
  }, [dispatch])

  useEffect(() => {
    reset({
      name: settings?.name,
      late_fee: settings?.late_fee ?? 0,
      bill_prefix: settings?.bill_prefix ?? '',
      bill_digit_length: settings?.bill_digit_length ?? 0,
      bill_sequence_number: settings?.bill_sequence_number ?? 1,
      bill_creation_date: settings?.bill_creation_date ?? "04-01",
      bill_due_date: settings?.bill_due_date ?? "04-30",
    });
  }, [settings])

  const onSubmit = (data) => {

    dispatch(storeSettings(data));
  };

  return (
    <>
      <Helmet>
        <title> General Settings | {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4">General Settings</Typography>
        </Stack>

        <Grid
          container
          spacing={3}>
          <Grid md={6}>
            <Card>
              <CardHeader title="General Settings" />
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
                        name="late_fee"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            label="Late Fee in %"
                            {...field}
                            fullWidth
                            error={errors.late_fee ? true : false}
                            helperText={errors.late_fee?.message}
                          />
                        )}
                      />
                    </Grid>

                    <Grid md={12}>
                      <Controller
                        name="bill_prefix"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            label="Bill Prefix"
                            {...field}
                            fullWidth
                            error={errors.bill_prefix ? true : false}
                            helperText={errors.bill_prefix?.message}
                          />
                        )}
                      />
                    </Grid>

                    <Grid md={12}>
                      <Controller
                        name="bill_digit_length"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            label="Bill Digit Length"
                            {...field}
                            fullWidth
                            error={errors.bill_digit_length ? true : false}
                            helperText={errors.bill_digit_length?.message}
                          />
                        )}
                      />
                    </Grid>

                    <Grid md={12}>
                      <Controller
                        name="bill_sequence_number"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            label="Bill Sequence Number"
                            {...field}
                            fullWidth
                            error={errors.bill_sequence_number ? true : false}
                            helperText={errors.bill_sequence_number?.message}
                          />
                        )}
                      />
                    </Grid>

                    <Grid md={12}>
                      <Controller
                        name="bill_creation_date"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            label="Bill Creation Date (MM-DD)"
                            {...field}
                            fullWidth
                            error={errors.bill_creation_date ? true : false}
                            helperText={errors.bill_creation_date?.message}
                          />
                        )}
                      />
                    </Grid>

                    <Grid md={12}>
                      <Controller
                        name="bill_due_date"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            label="Bill Due Date (MM-DD)"
                            {...field}
                            fullWidth
                            error={errors.bill_due_date ? true : false}
                            helperText={errors.bill_due_date?.message}
                          />
                        )}
                      />
                    </Grid>

                    <Grid md={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                      >
                        Save details
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default GeneralSettings