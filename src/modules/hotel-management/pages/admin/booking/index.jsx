import { Helmet } from "react-helmet-async";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";

import {
  deleteBooking,
  getBookings,
  setSuccessFalse,
} from "src/modules/hotel-management/redux/slices/bookingSlice";

import Iconify from "src/components/iconify";
import Scrollbar from "src/components/scrollbar";

import DeletePopup from "src/components/DeletePopup";
import BookingTableToolbar from "src/modules/hotel-management/sections/booking/table-toolbar";
import BookingTableRow from "src/modules/hotel-management/sections/booking/table-row";
import BookingTableLoading from "src/modules/hotel-management/sections/booking/table-loading";
import CommonTableHead from "src/sections/admin/common/common-table-head";
import CommonTableNoData from "src/sections/admin/common/common-table-no-data";
import { Box, FormControlLabel, Switch } from "@mui/material";

export default function BookingPage() {
  const dispatch = useDispatch();

  const { bookings, total, isLoading, isDeleteSuccess } = useSelector(
    (state) => state.booking
  );

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("desc");

  const [selected, setSelected] = useState([]);

  const [deleteIds, setDeleteIds] = useState([]);

  const [orderBy, setOrderBy] = useState("id");

  const [search, setSearch] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [deletePopupOpen, setDeletePopupOpen] = useState(false);

  const [isDense, setIsDense] = useState(false);

  useEffect(() => {
    setSelected([]);

    dispatch(setSuccessFalse());

    if (!isDeleteSuccess)
      dispatch(
        getBookings({
          rowsPerPage: rowsPerPage,
          page: page,
          searchQuery: search,
          orderDirection: order,
          sortByFieldName: orderBy,
        })
      );
  }, [rowsPerPage, page, search, order, orderBy, isDeleteSuccess, dispatch]);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === "asc";

    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
    setPage(0);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = bookings.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilter = (event) => {
    setPage(0);

    setSearch(event.target.value);
  };

  const handleDeletePopup = (id) => {
    setDeleteIds([id]);
    setDeletePopupOpen(true);
  };

  const handleDeleteAction = () => {
    setDeleteIds(selected);
    setDeletePopupOpen(true);
  };

  const handleDeleteAgree = () => {
    setDeletePopupOpen(false);

    dispatch(deleteBooking({ ids: deleteIds.toString() }));
  };

  const notFound = total === 0 && !isLoading;

  return (
    <>
      <Helmet>
        <title> Booking | {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4">Bookings</Typography>

          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            component={Link}
            to="/admin/booking/create"
          >
            New Booking
          </Button>
        </Stack>

        <Card>
          <BookingTableToolbar
            numSelected={selected.length}
            filterName={search}
            onFilterName={handleFilter}
            handleDeleteAction={handleDeleteAction}
          />

          <Scrollbar>
            <TableContainer sx={{ overflow: "unset" }}>
              <Table
                sx={{ minWidth: 800 }}
                size={isDense ? "small" : ""}
              >
                <CommonTableHead
                  order={order}
                  orderBy={orderBy}
                  count={total}
                  rowCount={rowsPerPage}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    {
                      id: "booking_id",
                      label: "Booking #",
                      shortable: true,
                    },
                    {
                      id: "room_id",
                      label: "Room",
                      shortable: true,
                    },
                    {
                      id: "from_date",
                      label: "From Date",
                      shortable: true,
                    },
                    {
                      id: "end_date",
                      label: "End Date",
                      shortable: true,
                    },
                    {
                      id: "total",
                      label: "Total",
                      align: "center",
                      shortable: true,
                    },
                    {
                      id: "created_at",
                      label: "Created At",
                      shortable: true,
                    },
                    { id: "" },
                  ]}
                />
                <TableBody>
                  {bookings.map((row) => (
                    <BookingTableRow
                      key={row.id}
                      row={row}
                      selected={selected.indexOf(row.id) !== -1}
                      handleClick={(event) => handleClick(event, row.id)}
                      handleDeletePopup={handleDeletePopup}
                    />
                  ))}

                  {isLoading && <BookingTableLoading rowCount={rowsPerPage} />}

                  {notFound && (
                    <CommonTableNoData
                      query={search}
                      columnCount={9}
                    />
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          <TablePagination
            page={page}
            component="div"
            count={total}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        <FormControlLabel
          sx={{ alignSelf: "center", mt: 2 }}
          control={
            <Switch
              checked={isDense}
              onChange={(event) => setIsDense(event.target.checked)}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label="Dense padding"
        />
      </Container>

      <DeletePopup
        deletePopupOpen={deletePopupOpen}
        setDeletePopupOpen={setDeletePopupOpen}
        handleDeleteAgree={handleDeleteAgree}
      />
    </>
  );
}