import React from "react";
import { Box, TextField } from "@mui/material";
import moment from "moment";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { getCoordinates } from "../../services/coordinates/index";

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
    id: "created_at",
    name: "Recorded",
    label: "Recorded",
    align: "left",
    minWidth: "30%",
  },
];

class Coordinates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entities: [],
      page_information: {
        page: 1,
        size: 10,
        total_number_of_entities: 1,
        total_number_of_pages: 1
      },
      apiready: true,
      vehicleId: props?.vehicleId,
      startdate: null,
      enddate: null,
      page: 0,
      setPage: 0,
      rowsPerPage: 10,
      setRowsPerPage: 10,
    };
  }

  componentDidMount() {
    this.getCoordinates(this.state.vehicleId);
  }

  componentDidUpdate() {
    this.checkDateStartToEnd();
  }

  getCoordinates(vehicleId, page = 1, size = 10, start = null, end = null) {
    getCoordinates(vehicleId, page, size, start, end).then((rs) => {
      this.setState({ ...this.state, entities: rs.data.entities, page_information: rs.data.page_information, apiready: false });
    });
  }

  handleChangePage = (event, newPage) => {
    let page = (newPage + 1);
    if (this.state.page_information.page !== page) {
      this.getCoordinates(this.state.vehicleId, page, this.state.page_information.size);
    }
  };

  handleChangeRowsPerPage = (event) => {
    this.getCoordinates(this.state.vehicleId, 1, +event.target.value);
  };

  handleChangeStartdate = (event) => {
    if (event.target.value !== this.state.startdate) {
      console.log(event.target.value);
      this.setState({ ...this.state, startdate: event.target.value, apiready: true });
    }
  }

  handleChangeEmddate = (event) => {
    if (event.target.value !== this.state.enddate) {
      this.setState({ ...this.state, enddate: event.target.value, apiready: true });
    }
  }

  checkDateStartToEnd() {
    if (moment(this.state.enddate) >= moment(this.state.startdate) && this.state.apiready) {
      this.getCoordinates(this.state.vehicleId, 1, 10, this.state.startdate, this.state.enddate);
    }
  }

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
              onChange={event => this.handleChangeStartdate(event)}
              sx={{ mx: 1 }}
              id="outlined-from-date"
              InputLabelProps={{
                shrink: true,
              }}
              size="small"
              label="From date"
            />
            <TextField
              type="date"
              onChange={event => this.handleChangeEmddate(event)}
              sx={{ mx: 1 }}
              id="outlined-to-date"
              InputLabelProps={{
                shrink: true,
              }}
              size="small"
              label="To date"
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
                  {this.state.entities
                    .map((row, index) => {
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
              count={this.state.page_information.total_number_of_entities}
              rowsPerPage={this.state.page_information.size}
              page={this.state.page_information.page - 1}
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
