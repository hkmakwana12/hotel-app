import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";

const initialState = {
  paymentTypes: [],
  total: 0,
  paymentType: null,
  isLoading: false,
  isSuccess: false,
  isDeleteSuccess: false,
  error: null,
};

export const getPaymentTypes = createAsyncThunk(
  "paymentType/getAll",
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
      `${import.meta.env.VITE_API_ROOT_URL}/paymentTypes`,
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

export const createPaymentType = createAsyncThunk(
  "paymentType/create",
  async (postData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_ROOT_URL}/paymentTypes`,
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

export const getPaymentType = createAsyncThunk("paymentType/get", async (id) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_ROOT_URL}/paymentTypes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );

  return response.data;
});

export const updatePaymentType = createAsyncThunk(
  "paymentType/update",
  async ({ postData: postData, id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_ROOT_URL}/paymentTypes/${id}`,
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
export const deletePaymentType = createAsyncThunk(
  "paymentType/delete",
  async (postData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_ROOT_URL}/paymentTypes/delete`,
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

export const paymentTypeSlice = createSlice({
  name: "paymentType",
  initialState,
  reducers: {
    setSuccessFalse: (state) => {
      state.isSuccess = false;
      state.isDeleteSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPaymentTypes.pending, (state) => {
        state.isLoading = true;
        state.paymentTypes = [];
        // state.total = 0;
      })
      .addCase(getPaymentTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentTypes = action.payload.paymentTypes;
        state.total = action.payload.total;
      })
      .addCase(getPaymentTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createPaymentType.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(createPaymentType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.paymentType = action.payload;

        enqueueSnackbar("payment Type Created Successfully !!!", {
          variant: "success",
        });
      })
      .addCase(createPaymentType.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;

        enqueueSnackbar(action.payload, {
          variant: "error",
        });
      })
      .addCase(getPaymentType.pending, (state) => {
        state.isLoading = true;
        state.paymentType = null;
      })
      .addCase(getPaymentType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentType = action.payload;
      })
      .addCase(getPaymentType.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updatePaymentType.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(updatePaymentType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.paymentType = action.payload;

        enqueueSnackbar("payment Type Updated Successfully !!!", {
          variant: "success",
        });
      })
      .addCase(updatePaymentType.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;

        enqueueSnackbar(action.payload, {
          variant: "error",
        });
      })
      .addCase(deletePaymentType.pending, (state) => {
        state.isDeleteSuccess = false;
        state.error = null;
      })
      .addCase(deletePaymentType.fulfilled, (state, action) => {
        state.isDeleteSuccess = true;

        enqueueSnackbar("payment Type Deleted Successfully !!!", {
          variant: "success",
        });
      })
      .addCase(deletePaymentType.rejected, (state, action) => {
        state.error = action.payload;

        enqueueSnackbar(action.payload, {
          variant: "error",
        });
      });
  },
});

export const { setSuccessFalse } = paymentTypeSlice.actions;
export default paymentTypeSlice.reducer;
