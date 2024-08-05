import PropTypes from "prop-types";

import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";

// ----------------------------------------------------------------------

export default function CommonTableNoData({ query, columnCount }) {
  return (
    <TableRow>
      <TableCell
        align="center"
        colSpan={columnCount}
        sx={{ py: 3 }}
      >
        <Paper
          sx={{
            textAlign: "center",
          }}
        >
          <Typography variant="body1">
            No items found. Try to broaden your search.
          </Typography>
        </Paper>
      </TableCell>
    </TableRow>
  );
}

CommonTableNoData.propTypes = {
  query: PropTypes.string,
  columnCount: PropTypes.number,
};
