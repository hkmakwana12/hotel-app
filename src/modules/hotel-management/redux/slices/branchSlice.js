import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";

const initialState = {
  allbranches: [],
  branches: [],
  total: 0,
  branch: null,
  isLoading: false,
  isSuccess: false,
  isDeleteSuccess: false,
  error: null,
};

export const getAllBranches = createAsyncThunk("branch/all", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_ROOT_URL}/branches/all`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );

  return response.data;
});

export const getBranches = createAsyncThunk(
  "branch/getAll",
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
      `${import.meta.env.VITE_API_ROOT_URL}/branches`,
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

export const createBranch = createAsyncThunk(
  "branch/create",
  async (postData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_ROOT_URL}/branches`,
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

export const getBranch = createAsyncThunk("branch/get", async (id) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_ROOT_URL}/branches/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );

  return response.data;
});

export const updateBranch = createAsyncThunk(
  "branch/update",
  async ({ postData: postData, id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_ROOT_URL}/branches/${id}`,
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
export const deleteBranch = createAsyncThunk(
  "branch/delete",
  async (postData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_ROOT_URL}/branches/delete`,
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

export const brancheslice = createSlice({
  name: "branch",
  initialState,
  reducers: {
    setSuccessFalse: (state) => {
      state.isSuccess = false;
      state.isDeleteSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBranches.pending, (state) => {
        state.isLoading = true;
        state.allbranches = [];
      })
      .addCase(getAllBranches.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allbranches = action.payload;
      })
      .addCase(getAllBranches.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getBranches.pending, (state) => {
        state.isLoading = true;
        state.branches = [];
        // state.total = 0;
      })
      .addCase(getBranches.fulfilled, (state, action) => {
        state.isLoading = false;
        state.branches = action.payload.branches;
        state.total = action.payload.total;
      })
      .addCase(getBranches.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createBranch.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(createBranch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.branch = action.payload;

        enqueueSnackbar("Branch Created Successfully !!!", {
          variant: "success",
        });
      })
      .addCase(createBranch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;

        enqueueSnackbar(action.payload, {
          variant: "error",
        });
      })
      .addCase(getBranch.pending, (state) => {
        state.isLoading = true;
        state.branch = null;
      })
      .addCase(getBranch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.branch = action.payload;
      })
      .addCase(getBranch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateBranch.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(updateBranch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.branch = action.payload;

        enqueueSnackbar("Branch Updated Successfully !!!", {
          variant: "success",
        });
      })
      .addCase(updateBranch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;

        enqueueSnackbar(action.payload, {
          variant: "error",
        });
      })
      .addCase(deleteBranch.pending, (state) => {
        state.isDeleteSuccess = false;
        state.error = null;
      })
      .addCase(deleteBranch.fulfilled, (state, action) => {
        state.isDeleteSuccess = true;

        enqueueSnackbar("Branch Deleted Successfully !!!", {
          variant: "success",
        });
      })
      .addCase(deleteBranch.rejected, (state, action) => {
        state.error = action.payload;

        enqueueSnackbar(action.payload, {
          variant: "error",
        });
      });
  },
});

export const { setSuccessFalse } = brancheslice.actions;
export default brancheslice.reducer;
