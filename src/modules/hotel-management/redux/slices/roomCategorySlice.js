import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";

const initialState = {
  roomCategories: [],
  total: 0,
  roomCategory: null,
  isLoading: false,
  isSuccess: false,
  isDeleteSuccess: false,
  error: null,
};

export const getRoomCategories = createAsyncThunk(
  "roomCategory/getAll",
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
      `${import.meta.env.VITE_API_ROOT_URL}/roomCategories`,
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

export const createRoomCategory = createAsyncThunk(
  "roomCategory/create",
  async (postData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_ROOT_URL}/roomCategories`,
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

export const getRoomCategory = createAsyncThunk(
  "roomCategory/get",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_ROOT_URL}/roomCategories/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );

    return response.data;
  }
);

export const updateRoomCategory = createAsyncThunk(
  "roomCategory/update",
  async ({ postData: postData, id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_ROOT_URL}/roomCategories/${id}`,
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
export const deleteRoomCategory = createAsyncThunk(
  "roomCategory/delete",
  async (postData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_ROOT_URL}/roomCategories/delete`,
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

export const roomCategorySlice = createSlice({
  name: "roomCategory",
  initialState,
  reducers: {
    setSuccessFalse: (state) => {
      state.roomCategory = null;
      state.isSuccess = false;
      state.isDeleteSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoomCategories.pending, (state) => {
        state.isLoading = true;
        state.roomCategories = [];
        // state.total = 0;
      })
      .addCase(getRoomCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.roomCategories = action.payload.roomCategories;
        state.total = action.payload.total;
      })
      .addCase(getRoomCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createRoomCategory.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(createRoomCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.roomCategory = action.payload;

        enqueueSnackbar("Room Category Created Successfully !!!", {
          variant: "success",
        });
      })
      .addCase(createRoomCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;

        enqueueSnackbar(action.payload, {
          variant: "error",
        });
      })
      .addCase(getRoomCategory.pending, (state) => {
        state.isLoading = true;
        state.roomCategory = null;
      })
      .addCase(getRoomCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.roomCategory = action.payload;
      })
      .addCase(getRoomCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateRoomCategory.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(updateRoomCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.roomCategory = action.payload;

        enqueueSnackbar("Room Category Updated Successfully !!!", {
          variant: "success",
        });
      })
      .addCase(updateRoomCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;

        enqueueSnackbar(action.payload, {
          variant: "error",
        });
      })
      .addCase(deleteRoomCategory.pending, (state) => {
        state.isDeleteSuccess = false;
        state.error = null;
      })
      .addCase(deleteRoomCategory.fulfilled, (state, action) => {
        state.isDeleteSuccess = true;

        enqueueSnackbar("Room Category Deleted Successfully !!!", {
          variant: "success",
        });
      })
      .addCase(deleteRoomCategory.rejected, (state, action) => {
        state.error = action.payload;

        enqueueSnackbar(action.payload, {
          variant: "error",
        });
      });
  },
});

export const { setSuccessFalse } = roomCategorySlice.actions;
export default roomCategorySlice.reducer;
