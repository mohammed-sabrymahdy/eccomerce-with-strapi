import { useState, useEffect, useCallback } from "react";
import { Fab, Box, Zoom } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";

function ScrollToTopFab() {
  const [trigger, setTrigger] = useState(false);

  // Custom scroll trigger logic instead of useScrollTrigger
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset || document.documentElement.scrollTop;
      setTrigger(scrolled > 100);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <Zoom in={trigger}>
      <Box
        role="presentation"
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 1000, // Increased z-index to ensure it's on top
        }}
      >
        <Fab
          onClick={scrollToTop}
          color="primary"
          size="small"
          aria-label="Scroll back to top"
        >
          <KeyboardArrowUp fontSize="medium" />
        </Fab>
      </Box>
    </Zoom>
  );
}

export default ScrollToTopFab;
