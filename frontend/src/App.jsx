import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Outlet } from "react-router-dom";

// Components
import Header1 from "./components/Header/Header1.jsx";
import Header2 from "./components/Header/Header2.jsx";
import Header3 from "./components/Header/Header3.jsx";
import Hero from "./components/Hero/Hero.jsx";
import Main from "./components/Main/Main.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ScrollToTopFab from "./components/Scroll/ScrollToTopFab.jsx"; // Add this import

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box className="App">
          <Header1 />
          <Header2 />
          <Header3 />
          <Hero />
          <Main />
          <br />
          <Footer />
          <ScrollToTopFab />

          <Outlet />
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
