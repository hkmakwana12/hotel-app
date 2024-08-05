import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";

const initialState = {
  users: [],
  total: 0,
  user: null,
  isLoading: false,
  isSuccess: false,
  isDeleteSuccess: false,
  error: null,
};

export const getUsers = createAsyncThunk(
  "user/getAll",
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
      `${import.meta.env.VITE_API_ROOT_URL}/users`,
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

export const createUser = createAsyncThunk(
  "user/create",
  async (postData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_ROOT_URL}/users`,
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

export const getUser = createAsyncThunk("user/get", async (id) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_ROOT_URL}/users/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );

  return response.data;
});

export const updateUser = createAsyncThunk(
  "user/update",
  async ({ postData: postData, id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_ROOT_URL}/users/${id}`,
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
export const deleteUser = createAsyncThunk(
  "user/delete",
  async (postData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_ROOT_URL}/users/delete`,
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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSuccessFalse: (state) => {
      state.isSuccess = false;
      state.isDeleteSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
        state.users = [];
        // state.total = 0;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.users;
        state.total = action.payload.total;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;

        enqueueSnackbar("User Created Successfully !!!", {
          variant: "success",
        });
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;

        enqueueSnackbar(action.payload, {
          variant: "error",
        });
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.user = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;

        enqueueSnackbar("User Updated Successfully !!!", {
          variant: "success",
        });
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;

        enqueueSnackbar(action.payload, {
          variant: "error",
        });
      })
      .addCase(deleteUser.pending, (state) => {
        state.isDeleteSuccess = false;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isDeleteSuccess = true;

        enqueueSnackbar("User Deleted Successfully !!!", {
          variant: "success",
        });
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;

        enqueueSnackbar(action.payload, {
          variant: "error",
        });
      });
  },
});

export const { setSuccessFalse } = userSlice.actions;
export default userSlice.reducer;
