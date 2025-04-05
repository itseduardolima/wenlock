import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./pages/Home";
import "./styles/main.scss";
import MainLayout from "./layouts/MainLayout";
import Users from "./pages/Users";
import { QueryProvider } from "./providers/QueryProvider";

const theme = createTheme({
  palette: {
    primary: {
      main: "#17876D",
    },
    secondary: {
      main: "#00AAC1",
    },
    error: {
      main: "#B00020",
    },
    background: {
      default: "#F0F0F0",
    },
  },
  typography: {
    fontFamily: "Manrope, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
  },
});

function App() {
  return (
    <QueryProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="usuarios" element={<Users />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryProvider>
  );
}

export default App;
