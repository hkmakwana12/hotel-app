import { Button, Menu, MenuItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Iconify from "src/components/iconify";
import { listClasses } from "@mui/material/List";
import { useDispatch, useSelector } from "react-redux";
import { getAllBranches } from "src/modules/hotel-management/redux/slices/branchSlice";

function HotelSelect() {
  const [open, setOpen] = useState(null);
  const [branchId, setBranchId] = useState(0);
  const [branchName, setBranchName] = useState("");

  const { allbranches } = useSelector((state) => state.branch);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBranches());
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem("hotel_id") &&
      localStorage.getItem("hotel_id") !== 0
    ) {
      setBranchId(parseInt(localStorage.getItem("hotel_id")));
    } else {
      if (allbranches.length > 0) {
        setBranchId(parseInt(allbranches[0]?.id));
        localStorage.setItem("hotel_id", parseInt(allbranches[0]?.id));
      }
    }

    const branch = allbranches.filter((branch) => branch.id === branchId)[0];

    setBranchName(branch?.name);
  }, [branchId, allbranches]);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const setBranch = (id) => {
    setBranchId(parseInt(id));
    localStorage.setItem("hotel_id", parseInt(id));
  };

  return (
    <>
      <Button
        disableRipple
        color="primary"
        sx={{ ml: 2 }}
        onClick={handleOpen}
        endIcon={
          <Iconify
            icon={open ? "eva:chevron-up-fill" : "eva:chevron-down-fill"}
          />
        }
      >
        <Typography
          component="span"
          variant="subtitle2"
          sx={{ color: "text.secondary" }}
        >
          {branchName?.length < 10 ? branchName : branchName?.substring(0, 10)}
        </Typography>
      </Button>

      <Menu
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              [`& .${listClasses.root}`]: {
                p: 0,
              },
            },
          },
        }}
      >
        {allbranches.map((option) => (
          <MenuItem
            key={option.id}
            selected={option.id === branchId}
            onClick={() => {
              handleClose();
              setBranch(option.id);
            }}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default HotelSelect;
