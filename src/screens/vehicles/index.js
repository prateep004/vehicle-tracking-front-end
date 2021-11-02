import React from "react";
import {
  Grid,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  Pagination,
} from "@mui/material";
import Coordinates from "../coordinates/index.js";

class Vehicles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Box
        sx={{
          height: "99vh",
          maxHeight: "99vh",
          border: 1,
          borderColor: "secondary.main",
        }}
      >
        <Box
          sx={{
            backgroundColor: "secondary.main",
            color: "#fff",
            p: 3,
          }}
        >
          <Grid container>
            <Grid item xs={12} sm={12}>
              Vehicles
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            p: 3,
          }}
        >
          <List
            sx={{
              py: 0,
              width: "100%",
              maxWidth: "100%",
              bgcolor: "text.main",
              boxShadow: 3,
            }}
          >
            <ListItem sx={{ px: 3, borderBottom: 1, borderColor: "#ccc" }}>
              <ListItemText primary={`Vehicles ID`} />
            </ListItem>
            {[1, 2, 3].map((value) => (
              <ListItem
                sx={{ px: 3, borderBottom: 1, borderColor: "#ccc" }}
                key={value}
                disableGutters
                secondaryAction={
                  <Button sx={{ mr: 3 }} variant="contained">
                    VIEW TIMELINE
                  </Button>
                }
              >
                <ListItemText primary={`${value}`} />
              </ListItem>
            ))}
            <ListItem
              sx={{
                px: 3,
                borderBottom: 1,
                borderColor: "#ccc",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Pagination count={10} defaultPage={5} showFirstButton showLastButton size="small" />
            </ListItem>
          </List>
        </Box>
      </Box>
    );
  }
}

export default Vehicles;
