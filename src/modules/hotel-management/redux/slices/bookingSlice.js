import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";

const initialState = {
  bookings: [],
  total: 0,
  booking: null,
  isLoading: false,
  isSuccess: false,
  isDeleteSuccess: false,
  error: null,
};

export const getBookings = createAsyncThunk(
  "booking/getAll",
  async ({
    page = 0,
    rowsPerPage = 10,
    searchQuery = "",
    sortByFieldName = "id",
    orderDirection = "asc",
  }) => {
    const queryParams = {
      page: page + 1,
      rowsPerPage: rowsPerPage,
      q: searchQuery,
      sortBy: sortByFieldName,
      order: orderDirection,
    };

    const response = await axios.get(
      `${import.meta.env.VITE_API_ROOT_URL}/bookings`,
      {
        params: queryParams,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );

    return response.data;
  }
);

export const createBooking = createAsyncThunk(
  "booking/create",
  async (postData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_ROOT_URL}/bookings`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getBooking = createAsyncThunk("booking/get", async (id) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_ROOT_URL}/bookings/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );

  return response.data;
});

export const updateBooking = createAsyncThunk(
  "booking/update",
  async ({ postData: postData, id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_ROOT_URL}/bookings/${id}`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const deleteBooking = createAsyncThunk(
  "booking/delete",
  async (postData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_ROOT_URL}/bookings/delete`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setSuccessFalse: (state) => {
      state.isSuccess = false;
      state.isDeleteSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBookings.pending, (state) => {
        state.isLoading = true;
        state.bookings = [];
        // state.total = 0;
      })
      .addCase(getBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookings = action.payload.bookings;
        state.total = action.payload.total;
      })
      .addCase(getBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.booking = action.payload;

        enqueueSnackbar("Booking Created Successfully !!!", {
          variant: "success",
        });
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;

        enqueueSnackbar(action.payload, {
          variant: "error",
        });
      })
      .addCase(getBooking.pending, (state) => {
        state.isLoading = true;
        state.booking = null;
      })
      .addCase(getBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.booking = action.payload;
      })
      .addCase(getBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateBooking.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.booking = action.payload;

        enqueueSnackbar("Booking Updated Successfully !!!", {
          variant: "success",
        });
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;

        enqueueSnackbar(action.payload, {
          variant: "error",
        });
      })
      .addCase(deleteBooking.pending, (state) => {
        state.isDeleteSuccess = false;
        state.error = null;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.isDeleteSuccess = true;

        enqueueSnackbar("Booking Deleted Successfully !!!", {
          variant: "success",
        });
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.error = action.payload;

        enqueueSnackbar(action.payload, {
          variant: "error",
        });
      });
  },
});

export const { setSuccessFalse } = bookingSlice.actions;
export default bookingSlice.reducer;
