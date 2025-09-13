import { useState } from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  useTheme,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Chip,
  IconButton,
  Rating,
  Dialog,
} from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import { useGetproductByNameQuery } from "../../redux/product";
import ProductDetails from "./ProductDetails";

const VITE_BASE_KEY = import.meta.env.VITE_BASE_KEY; // 👈 خليه من env

const Main = () => {
  const [alignment, setAlignment] = useState("all");
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const theme = useTheme();

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const handleClickOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  ////////////////////////////////// Fetch Data from API start  ////////////////////////////////
  const { data, error, isLoading } = useGetproductByNameQuery(
    "products?populate=*"
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  const products =
    data?.data?.map((item) => {
      const images = item.productImg?.map((img) => img.url) || [
        "/images/placeholder.jpg",
      ];

      return {
        id: item.id,
        category: item.productChoice || "uncategorized",
        title: item.productTitle || "No title",
        description: item.productDescription || "No description",
        image: images[0],
        images,
        price: item.productPrice || 0,
        rating: item.productRating || 0,
        isNew: item.isNew || false,
      };
    }) || [];
  ////////////////////////////////// Fetch Data from API end ////////////////////////////////

  const filteredProducts =
    alignment === "all"
      ? products
      : products.filter((p) => p.category === alignment);

  return (
    <Container>
      {/* /////////////////////////////// section 1 /////////////////////////////////*/}
      <Stack
        spacing={2}
        direction="row"
        justifyContent="space-between"
        marginTop="10px"
        sx={{
          borderRadius: "8px",
          padding: "8px 16px",
          bgcolor: theme.palette.mode === "dark" ? "#000" : "#fff",
        }}
      >
        <Box textAlign="left">
          <Typography variant="h6">Selected Products</Typography>
          <Typography fontWeight={300} variant="body1">
            All our new arrivals in an exclusive brand selection
          </Typography>
        </Box>

        <ToggleButtonGroup
          color="error"
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="product filter"
          sx={{
            ".Mui-selected": {
              color: "#e94560 !important",
            },
          }}
        >
          <ToggleButton value="all" sx={{ color: theme.palette.text.primary }}>
            All
          </ToggleButton>

          <ToggleButton
            value="men"
            sx={{ mx: "16px !important", color: theme.palette.text.primary }}
          >
            MEN
          </ToggleButton>

          <ToggleButton
            value="women"
            sx={{ color: theme.palette.text.primary }}
          >
            Women
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      {/* /////////////////////////////// section 1 end /////////////////////////////////*/}

      {/* /////////////////////////////// section 2 start /////////////////////////////////*/}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          mt: 2,
          justifyContent: { xs: "center", sm: "flex-start" },
        }}
      >
        {filteredProducts.map((product) => (
          <Box
            key={product.id}
            sx={{
              width: {
                xs: "100%",
                sm: "calc(50% - 12px)",
                md: "calc(25% - 18px)",
              },
              minWidth: "280px",
              maxWidth: "345px",
            }}
          >
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: theme.shadows[8],
                },
                position: "relative",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <Box sx={{ position: "absolute", top: 12, left: 12, zIndex: 2 }}>
                {product.isNew && (
                  <Chip
                    label="NEW"
                    color="secondary"
                    size="small"
                    sx={{ fontWeight: "bold" }}
                  />
                )}
              </Box>

              <IconButton
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  zIndex: 2,
                  bgcolor: "rgba(255, 255, 255, 0.9)",
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 1)" },
                }}
                size="small"
              >
                <FavoriteIcon sx={{ color: "#e94560" }} />
              </IconButton>

              <CardMedia
                sx={{
                  height: 200,
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": { transform: "scale(1.05)" },
                }}
                image={product.image}
                title={product.title}
              />

              <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  sx={{
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    lineHeight: 1.3,
                    minHeight: "2.6rem",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {product.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    mb: 2,
                    minHeight: "3rem",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    lineHeight: 1.4,
                  }}
                >
                  {product.description}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Rating
                    value={product.rating}
                    precision={0.1}
                    readOnly
                    size="small"
                    sx={{ color: "#ffa726" }}
                  />
                  <Typography
                    variant="caption"
                    sx={{ ml: 1, color: "text.secondary" }}
                  >
                    ({product.rating})
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 1,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                    <Typography
                      variant="h5"
                      component="span"
                      sx={{
                        fontWeight: 700,
                        color: "#e94560",
                        fontSize: "1.5rem",
                      }}
                    >
                      ${product.price}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>

              <CardActions
                sx={{
                  padding: "8px 16px 16px",
                  justifyContent: "space-between",
                  borderTop: "1px solid",
                  borderTopColor: theme.palette.divider,
                }}
              >
                <Button
                  size="small"
                  startIcon={<ShareIcon />}
                  sx={{ color: "text.secondary" }}
                >
                  Share
                </Button>

                <Button
                  size="small"
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  onClick={() => handleClickOpen(product)}
                  sx={{
                    bgcolor: "#e94560",
                    "&:hover": { bgcolor: "#d63851" },
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>
      {/* /////////////////////////////// section 2 end /////////////////////////////////*/}

      {/* /////////////////////////////// Dialog /////////////////////////////////*/}
      <Dialog
        sx={{ ".MuiPaper-root": { minWidth: { xs: "100%", md: 800 } } }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <IconButton
          sx={{
            ":hover": { color: "red", rotate: "180deg", transition: "0.3s" },
            position: "absolute",
            top: 0,
            right: 10,
          }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>

        <ProductDetails product={selectedProduct} />
      </Dialog>
    </Container>
  );
};

export default Main;
