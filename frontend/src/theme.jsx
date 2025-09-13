import { createContext, useState, useMemo, useEffect } from "react";
import { createTheme } from "@mui/material/styles";
import { grey, blue } from "@mui/material/colors";

// 🎨 تعريف الألوان حسب المود
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: mode === "light" ? blue[700] : blue[300],
    },
    secondary: {
      main: mode === "light" ? grey[700] : grey[400],
    },
    background: {
      default: mode === "light" ? "#f5f5f5" : "#121212",
      paper: mode === "light" ? "#fff" : "#1e1e1e",
    },
    text: {
      primary: mode === "light" ? "#2B3445" : "#fff",
      secondary: mode === "light" ? grey[700] : grey[400],
    },
    neutral: {
      main: "#64748B",
    },
    favColor: {
      main: mode === "light" ? grey[300] : grey[800],
    },
  },
});

// 🟢 Context للتبديل بين المودات
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState(localStorage.getItem("mode") || "light");

  // 📝 نحفظ المود في localStorage
  useEffect(() => {
    localStorage.setItem("mode", mode);
    document.documentElement.dataset.theme = mode;
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return [theme, colorMode];
};
