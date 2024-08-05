import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

export default function DeletePopup({
  deletePopupOpen,
  setDeletePopupOpen,
  handleDeleteAgree,
}) {
  const handleDialogClose = () => {
    setDeletePopupOpen(false);
  };

  return (
    <Dialog
      open={deletePopupOpen}
      onClose={handleDialogClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
    >
      <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You won't be able to revert this!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleDialogClose}
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={handleDeleteAgree}
          autoFocus
          color="error"
        >
          Yes, Delete It!
        </Button>
      </DialogActions>
    </Dialog>
  );
}
