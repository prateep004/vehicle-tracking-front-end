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
import Coordinates from "../coordinates/index";
import { getVahicles } from "../../services/vehicles/index";

class Vehicles extends React.Component {
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
      vehicleId: null,
      view: "page-vehicle",
      page: 0,
      setPage: 0,
      rowsPerPage: 10,
      setRowsPerPage: 10,
    };
  }

  componentDidMount() {
    this.getVahicles();
  }

  getVahicles(page = 1, size = 10) {
    getVahicles(page, size).then(rs => {
      this.setState({ ...this.state, entities: rs.data.entities, page_information: rs.data.page_information });
    });
  }

  handleChangePage = (event, newPage) => {
    let page = (newPage + 1);
    if (this.state.page_information.page !== page) {
      this.getVahicles(page, this.state.page_information.size);
    }
  };

  handleChangeRowsPerPage = (event) => {
    this.getVahicles(1, +event.target.value);
  };

  handleClickViewTimeline = (vehicleId) => {
    this.setState({ ...this.state, view: "page-coor", vehicleId: vehicleId });
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
          {this.state.view === "page-vehicle" ? 'Vehicles' : `Vehicles ID: ${this.state.vehicleId}`}
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
                  {this.state.entities.map((row, index) => {
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
              count={this.state.page_information.total_number_of_entities}
              rowsPerPage={this.state.page_information.size}
              page={this.state.page_information.page - 1}
              onPageChange={this.handleChangePage}
              onRowsPerPageChange={this.handleChangeRowsPerPage}
            />
          </Box>
        </Box>
        {
          (this.state.view === "page-coor" ? <Box sx={{ p: 3 }} hidden={this.state.view !== "page-coor"}>
            <Button onClick={() => this.handleClickViewVehicle()} variant="outlined" startIcon={<ArrowBackIcon />}>
              Back
            </Button>
            <Coordinates vehicleId={this.state.vehicleId} />
          </Box>
            : ''
          )
        }
      </Box>
    );
  }
}

export default Vehicles;
