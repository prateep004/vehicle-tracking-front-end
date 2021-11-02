import React from "react";
import { Box, TextField } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

const columns = [
  {
    id: "latitude",
    name: "Latitude",
    label: "Latitude",
    align: "left",
    minWidth: "35%",
  },
  {
    id: "longitude",
    name: "Longitude",
    label: "Longitude",
    align: "left",
    minWidth: "35%",
  },
  {
    id: "recorded",
    name: "Recorded",
    label: "Recorded",
    align: "left",
    minWidth: "30%",
  },
];

const rows = [
  { latitude: 12.122331, longitude: 11.2213131, recorded: "2021/11/02" },
  { latitude: 12.122331, longitude: 11.2213131, recorded: "2021/11/02" },
  { latitude: 12.122331, longitude: 11.2213131, recorded: "2021/11/02" },
  { latitude: 12.122331, longitude: 11.2213131, recorded: "2021/11/02" },
  { latitude: 12.122331, longitude: 11.2213131, recorded: "2021/11/02" },
  { latitude: 12.122331, longitude: 11.2213131, recorded: "2021/11/02" },
  { latitude: 12.122331, longitude: 11.2213131, recorded: "2021/11/02" },
  { latitude: 12.122331, longitude: 11.2213131, recorded: "2021/11/02" },
  { latitude: 12.122331, longitude: 11.2213131, recorded: "2021/11/02" },
  { latitude: 12.122331, longitude: 11.2213131, recorded: "2021/11/02" },
  { latitude: 12.122331, longitude: 11.2213131, recorded: "2021/11/02" },
  { latitude: 12.122331, longitude: 11.2213131, recorded: "2021/11/02" },
  { latitude: 12.122331, longitude: 11.2213131, recorded: "2021/11/02" },
  { latitude: 12.122331, longitude: 11.2213131, recorded: "2021/11/02" },
  { latitude: 12.122331, longitude: 11.2213131, recorded: "2021/11/02" },
  { latitude: 12.122331, longitude: 11.2213131, recorded: "2021/11/02" },
  { latitude: 12.122331, longitude: 11.2213131, recorded: "2021/11/02" },
  { latitude: 12.122331, longitude: 11.2213131, recorded: "2021/11/02" },
  { latitude: 12.122331, longitude: 11.2213131, recorded: "2021/11/02" },
  { latitude: 12.122331, longitude: 11.2213131, recorded: "2021/11/02" },
  { latitude: 12.122331, longitude: 11.2213131, recorded: "2021/11/02" },
  { latitude: 12.122331, longitude: 11.2213131, recorded: "2021/11/02" },
  { latitude: 12.122331, longitude: 11.2213131, recorded: "2021/11/02" },
  { latitude: 12.122331, longitude: 11.2213131, recorded: "2021/11/02" },
  { latitude: 12.122331, longitude: 11.2213131, recorded: "2021/11/02" },
  { latitude: 12.122331, longitude: 11.2213131, recorded: "2021/11/02" },
  { latitude: 12.122331, longitude: 11.2213131, recorded: "2021/11/02" },
  { latitude: 12.122331, longitude: 11.2213131, recorded: "2021/11/02" },
  { latitude: 12.122331, longitude: 11.2213131, recorded: "2021/11/02" },
];

class Coordinates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      setPage: 0,
      rowsPerPage: 10,
      setRowsPerPage: 10,
    };
  }

  handleChangePage = (event, newPage) => {
    this.setState({ ...this.state, page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      ...this.state,
      setPage: 0,
      rowsPerPage: +event.target.value,
    });
  };

  render() {
    return (
      <>
        <Box
          sx={{
            mt: 1,
            py: 2,
            width: "100%",
            maxWidth: "100%",
            backgroundColor: "secondary.main",
            bgcolor: "text.main",
            boxShadow: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <TextField
              type="date"
              sx={{ mx: 1 }}
              id="outlined-from-date"
              InputLabelProps={{
                shrink: true,
              }}
              size="small"
              label="From date"
              value={"TextField"}
            />
            <TextField
              type="date"
              sx={{ mx: 1 }}
              id="outlined-to-date"
              InputLabelProps={{
                shrink: true,
              }}
              size="small"
              label="To date"
              value={"TextField"}
            />
          </Box>
          <Box>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(
                      this.state.page * this.state.rowsPerPage,
                      this.state.page * this.state.rowsPerPage +
                        this.state.rowsPerPage
                    )
                    .map((row,index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
              onPageChange={this.handleChangePage}
              onRowsPerPageChange={this.handleChangeRowsPerPage}
            />
          </Box>
        </Box>
      </>
    );
  }
}

export default Coordinates;
