// src/components/Header/Header2.jsx
import { useState } from "react";
import {
  Badge,
  Container,
  IconButton,
  InputBase,
  Stack,
  Typography,
  useTheme,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import SearchIcon from "@mui/icons-material/Search";
import { ExpandMore } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";

// 🔍 Styled Components
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 22,
  border: "1px solid #777",
  display: "flex",
  alignItems: "center",
  width: "320px",
  transition: "0.3s",
  "&:hover": { border: "1px solid #333" },
  [theme.breakpoints.up("sm")]: {
    width: "420px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  position: "absolute",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#777",
  pointerEvents: "none",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  flex: 1,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

// 🗂️ Categories
const options = ["All Categories", "Car", "Clothes", "Electronics"];

const Header2 = () => {
  const theme = useTheme();

  // ⬇️ Menu State
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);

  const handleClickListItem = (event) => setAnchorEl(event.currentTarget);
  const handleMenuItemClick = (_, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <Container
      sx={{
        my: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* 🛒 Logo */}
      <Stack direction="row" alignItems="center" spacing={1}>
        <ShoppingCartOutlined
          sx={{ fontSize: 28, color: theme.palette.primary.main }}
        />
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          E-commerce
        </Typography>
      </Stack>

      {/* 🔍 Search Box */}
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>

        <StyledInputBase
          placeholder="Search for products…"
          inputProps={{ "aria-label": "search" }}
        />

        {/* Categories */}
        <List
          component="nav"
          sx={{
            bgcolor: theme.palette.grey[200],
            borderBottomRightRadius: 22,
            borderTopRightRadius: 22,
            p: 0,
          }}
        >
          <ListItem
            id="category-button"
            aria-haspopup="listbox"
            aria-controls="category-menu"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClickListItem}
            sx={{ px: 1, cursor: "pointer" }}
          >
            <ListItemText
              sx={{ width: 120, textAlign: "center", fontSize: 13 }}
              secondary={options[selectedIndex]}
            />
            <ExpandMore sx={{ fontSize: 18 }} />
          </ListItem>
        </List>

        <Menu
          id="category-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "category-button",
            role: "listbox",
          }}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option}
              selected={index === selectedIndex}
              onClick={(e) => handleMenuItemClick(e, index)}
              sx={{ fontSize: 13, px: 2 }}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Search>

      {/* 👤 User + Cart */}
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={4} color="primary">
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>

        <IconButton>
          <Person2OutlinedIcon />
        </IconButton>
      </Stack>
    </Container>
  );
};

export default Header2;
