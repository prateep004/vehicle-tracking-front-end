import logo from "./assets/logo.svg";
import { Switch, Route } from "react-router-dom";
import { Container } from "@mui/material";
import "./styles/App.css";
import Vehicles from "./screens/vehicles/index.js";

function App() {
  return (
    <>
      <Switch>
        <Route path="/">
          <Container>
            <Vehicles />
          </Container>
        </Route>
      </Switch>
    </>
  );
}

export default App;
