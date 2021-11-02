import React from "react";
import { Box, Button } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Coordinates from "../coordinates/index.js";

const rows = [
  { vehicleId: 53456896941941 },
  { vehicleId: 69161914919491 },
  { vehicleId: 89181516911619 },
  { vehicleId: 53456896941941 },
  { vehicleId: 69161914919491 },
  { vehicleId: 89181516911619 },
  { vehicleId: 53456896941941 },
  { vehicleId: 69161914919491 },
  { vehicleId: 89181516911619 },
  { vehicleId: 53456896941941 },
  { vehicleId: 69161914919491 },
  { vehicleId: 89181516911619 },
  { vehicleId: 53456896941941 },
  { vehicleId: 69161914919491 },
  { vehicleId: 89181516911619 },
  { vehicleId: 53456896941941 },
  { vehicleId: 69161914919491 },
  { vehicleId: 89181516911619 },
  { vehicleId: 53456896941941 },
  { vehicleId: 69161914919491 },
  { vehicleId: 89181516911619 },
  { vehicleId: 53456896941941 },
  { vehicleId: 69161914919491 },
  { vehicleId: 89181516911619 },
];
class Vehicles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vehiclesId: null,
      view: "page-vehicle",
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

  handleClickViewTimeline = (vehiclesId) => {
    this.setState({ ...this.state, view: "page-coor", vehiclesId: vehiclesId });
  };

  handleClickViewVehicle = () => {
    this.setState({ ...this.state, view: "page-vehicle" });
  };

  render() {
    return (
      <Box
        sx={{
          height: "auto",
          minHeight: "99vh",
          border: 1,
          borderColor: "secondary.main",
        }}
      >
        <Box 
            sx={{
              p: 3,
              bgcolor: "secondary.main",
              color: "#fff",
            }}>
            { this.state.view === "page-vehicle" ? 'Vehicles' : `Vehicles ID: ${this.state.vehiclesId}` }
        </Box>
        <Box sx={{ p: 3 }} hidden={this.state.view !== "page-vehicle"}>
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
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align={"left"} style={{ minWidth: "85%" }}>
                      Vehicles ID
                    </TableCell>
                    <TableCell
                      align={"left"}
                      style={{ minWidth: "15%" }}
                    ></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {rows
                    .slice(
                      this.state.page * this.state.rowsPerPage,
                      this.state.page * this.state.rowsPerPage +
                        this.state.rowsPerPage
                    )
                    .map((row, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                        >
                          <TableCell align={"left"}>{row.vehicleId}</TableCell>
                          <TableCell align={"right"}>
                            <Button
                              onClick={() =>
                                this.handleClickViewTimeline(row.vehicleId)
                              }
                              variant="contained"
                            >
                              VIEW TIMELINE
                            </Button>
                          </TableCell>
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
        <Box sx={{ p: 3 }} hidden={this.state.view !== "page-coor"}>
          <Button onClick={()=> this.handleClickViewVehicle()} variant="outlined" startIcon={<ArrowBackIcon />}>
            Back
          </Button>
          <Coordinates />
        </Box>
      </Box>
    );
  }
}

export default Vehicles;
