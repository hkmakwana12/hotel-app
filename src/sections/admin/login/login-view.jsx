import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import { alpha, useTheme } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";

import { bgGradient } from "src/theme/css";

import Logo from "src/components/logo";
import Iconify from "src/components/iconify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "src/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

// ----------------------------------------------------------------------

const validationSchema = yup.object({
  email: yup.string().required("Email Address is required"),
  password: yup.string().required("Password is required"),
});

export default function LoginView() {
  const theme = useTheme();

  const dispatch = useDispatch();
  const { userToken, isLoading, error } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "admin@admin.com",
      password: "123456",
    },
  });

  useEffect(() => {
    if (userToken) navigate("/admin");
  }, [navigate, userToken]);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        {error && <Alert severity="error">{error}</Alert>}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              label="Email Address"
              required
              {...field}
              fullWidth
              error={errors.email ? true : false}
              helperText={errors.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              error={errors.password ? true : false}
              helperText={errors.password?.message}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      <Iconify
                        icon={
                          showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ my: 3 }}
      >
        <Link
          variant="subtitle2"
          underline="hover"
        >
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        variant="contained"
        onClick={handleSubmit(onSubmit)}
        loading={isLoading}
      >
        Login
      </LoadingButton>
    </>
  );

  if (!userToken)
    return (
      <Box
        sx={{
          ...bgGradient({
            color: alpha(theme.palette.background.default, 0.9),
            imgUrl: "/assets/background/overlay_4.jpg",
          }),
          height: 1,
        }}
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ height: 1 }}
        >
          <Logo
            sx={{
              mb: 3,
            }}
            link="/admin"
          />
          <Card
            sx={{
              p: 5,
              width: 1,
              maxWidth: 420,
            }}
          >
            <Typography
              variant="h4"
              align="center"
              sx={{ mb: 5 }}
            >
              Admin log in
            </Typography>

            {renderForm}
          </Card>
        </Stack>
      </Box>
    );
}
