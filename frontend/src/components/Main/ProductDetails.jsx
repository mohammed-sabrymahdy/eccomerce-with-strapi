import { Box, Typography, Stack, Button } from "@mui/material";
import { AddShoppingCartOutlined } from "@mui/icons-material";

const ProductDetails = ({ product }) => {
  if (!product) return null; // لو مفيش منتج مختار

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 3,
        flexDirection: { xs: "column", sm: "row" },
        p: 3,
      }}
    >
      {/* الصورة الرئيسية */}
      <Box sx={{ display: "flex" }}>
        <img
          width={300}
          src={product.image}
          alt={product.title}
          style={{ borderRadius: 8 }}
        />
      </Box>

      {/* تفاصيل المنتج */}
      <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
        <Typography variant="h5" fontWeight={600}>
          {product.title}
        </Typography>

        <Typography
          my={1}
          fontSize="22px"
          color="crimson"
          variant="h6"
          fontWeight={700}
        >
          ${product.price}
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          {product.description}
        </Typography>

        {/* الصور الإضافية */}
        {product.images && product.images.length > 1 && (
          <Stack
            direction="row"
            gap={1}
            my={2}
            sx={{ justifyContent: { xs: "center", sm: "flex-start" } }}
          >
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.title}-${idx}`}
                style={{
                  borderRadius: 6,
                  width: 90,
                  height: 100,
                  objectFit: "cover",
                }}
              />
            ))}
          </Stack>
        )}

        <Button
          variant="contained"
          sx={{
            textTransform: "capitalize",
            bgcolor: "#e94560",
            "&:hover": { bgcolor: "#d63851" },
          }}
        >
          <AddShoppingCartOutlined sx={{ mr: 1 }} fontSize="small" />
          Buy now
        </Button>
      </Box>
    </Box>
  );
};

export default ProductDetails;
