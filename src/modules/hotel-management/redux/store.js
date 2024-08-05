import agencyReducer from "src/modules/hotel-management/redux/slices/agencySlice";
import customerReducer from "src/modules/hotel-management/redux/slices/customerSlice";
import branchReducer from "src/modules/hotel-management/redux/slices/branchSlice";
import roomCategoryReducer from "src/modules/hotel-management/redux/slices/roomCategorySlice";
import roomReducer from "src/modules/hotel-management/redux/slices/roomSlice";
import bookingReducer from "src/modules/hotel-management/redux/slices/bookingSlice";

const hotelStore = {
  agency: agencyReducer,
  customer: customerReducer,
  branch: branchReducer,
  roomCategory: roomCategoryReducer,
  room: roomReducer,
  booking: bookingReducer,
};

export default hotelStore;
