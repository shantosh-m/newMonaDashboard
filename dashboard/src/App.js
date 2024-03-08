import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./components/Main.js";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import { MachineProvider } from "./contexts/machinecontext.js"; // Import your MachineProvider context

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MachineProvider>
        <Router>
          <Dashboard />
        </Router>
      </MachineProvider>
    </ThemeProvider>
  );
}

export default App;
