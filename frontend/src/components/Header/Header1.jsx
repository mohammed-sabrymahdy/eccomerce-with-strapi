// src/components/Header/Header1.jsx
import { useContext, useState } from "react";
import { ColorModeContext } from "../../theme";
import {
  Box,
  Container,
  IconButton,
  Stack,
  Typography,
  useTheme,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  DarkModeOutlined,
  ExpandMore,
  LightModeOutlined,
} from "@mui/icons-material";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

// 🌍 Language Options
const options = ["AR", "EN"];

const Header1 = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  // 🔽 Menu State
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const open = Boolean(anchorEl);

  const handleClickListItem = (event) => setAnchorEl(event.currentTarget);
  const handleMenuItemClick = (_, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };
  const handleClose = () => setAnchorEl(null);

  // 🌓 Toggle Dark/Light
  const handleToggleMode = () => {
    localStorage.setItem(
      "mode",
      theme.palette.mode === "dark" ? "light" : "dark"
    );
    colorMode.toggleColorMode();
  };

  return (
    <Box
      sx={{
        bgcolor: theme.palette.mode === "light" ? "#2B3445" : "#1e1e1e",
        py: 0.5,
        borderBottomRightRadius: 4,
        borderBottomLeftRadius: 4,
      }}
    >
      <Container>
        <Stack direction="row" alignItems="center">
          {/* 🔴 HOT Badge */}
          <Typography
            variant="body2"
            sx={{
              mr: 2,
              px: 1.5,
              py: 0.5,
              bgcolor: "#D23F57",
              borderRadius: "12px",
              fontSize: "12px",
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            HOT
          </Typography>

          {/* 🚚 Shipping Text */}
          <Typography
            variant="body2"
            sx={{ fontSize: "12px", fontWeight: 300, color: "#fff" }}
          >
            Free Express Shipping
          </Typography>

          {/* Filler to push items to the right */}
          <Box flexGrow={1} />

          {/* 🌓 Dark/Light Toggle */}
          <IconButton onClick={handleToggleMode} color="inherit">
            {theme.palette.mode === "light" ? (
              <LightModeOutlined sx={{ fontSize: 18, color: "#fff" }} />
            ) : (
              <DarkModeOutlined sx={{ fontSize: 18, color: "#fff" }} />
            )}
          </IconButton>

          {/* 🌍 Language Switcher */}
          <List component="nav" sx={{ p: 0, m: 0 }}>
            <ListItem
              id="lang-button"
              aria-haspopup="listbox"
              aria-controls="lang-menu"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClickListItem}
              sx={{ cursor: "pointer", px: 1 }}
            >
              <ListItemText
                secondary={options[selectedIndex]}
                sx={{ ".MuiTypography-root": { fontSize: 11, color: "#fff" } }}
              />
              <ExpandMore sx={{ fontSize: 16, color: "#fff" }} />
            </ListItem>
          </List>

          <Menu
            id="lang-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "lang-button",
              role: "listbox",
            }}
          >
            {options.map((option, index) => (
              <MenuItem
                key={option}
                selected={index === selectedIndex}
                onClick={(e) => handleMenuItemClick(e, index)}
                sx={{ fontSize: 11, px: 2, py: 0.5, minHeight: "24px" }}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>

          {/* 🌐 Social Icons */}
          <Stack direction="row" spacing={1} ml={1}>
            <TwitterIcon
              sx={{ fontSize: 18, color: "#fff", cursor: "pointer" }}
            />
            <FacebookIcon
              sx={{ fontSize: 18, color: "#fff", cursor: "pointer" }}
            />
            <InstagramIcon
              sx={{ fontSize: 18, color: "#fff", cursor: "pointer" }}
            />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Header1;
