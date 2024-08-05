import { Checkbox, Skeleton, TableCell, TableRow } from "@mui/material";
import React from "react";

export default function BookingTableLoading({ rowCount }) {
  return (
    <>
      {Array.from({ length: rowCount }, (_, i) => (
        <TableRow key={i}>
          <TableCell padding="checkbox">
            <Checkbox disableRipple />
          </TableCell>

          <TableCell>
            <Skeleton width="100%" />
          </TableCell>
          <TableCell>
            <Skeleton width="100%" />
          </TableCell>
          <TableCell>
            <Skeleton width="100%" />
          </TableCell>
          <TableCell>
            <Skeleton width="100%" />
          </TableCell>
          <TableCell>
            <Skeleton width="100%" />
          </TableCell>
          <TableCell>
            <Skeleton width="100%" />
          </TableCell>
          <TableCell>
            <Skeleton width="100%" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
