import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Home />
    </React.Fragment>
  );
}

export default App;
