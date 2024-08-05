import { useState } from "react";
import { Link } from "react-router-dom";

import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";

import Iconify from "src/components/iconify";
import { fDateTime } from "src/utils/format-time";

// ----------------------------------------------------------------------

export default function AgencyTableRow({
  selected,
  row,
  handleClick,
  handleDeletePopup,
}) {
  const [open, setOpen] = useState(null);

  const { name, created_at, id } = row;

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const openDeletePopup = (id) => {
    setOpen(null);

    handleDeletePopup(id);
  };

  return (
    <>
      <TableRow
        hover
        tabIndex={-1}
        role="checkbox"
        selected={selected}
      >
        <TableCell padding="checkbox">
          <Checkbox
            disableRipple
            checked={selected}
            onChange={handleClick}
          />
        </TableCell>

        <TableCell>{name}</TableCell>

        <TableCell>{fDateTime(created_at)}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem
          component={Link}
          to={`/admin/agency/${id}`}
        >
          <Iconify
            icon="eva:edit-fill"
            sx={{ mr: 2 }}
          />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => openDeletePopup(id)}
          sx={{ color: "error.main" }}
        >
          <Iconify
            icon="eva:trash-2-outline"
            sx={{ mr: 2 }}
          />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
