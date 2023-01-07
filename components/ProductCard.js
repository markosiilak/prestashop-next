import { Box, Button, Typography } from "@mui/material";

import { addProduct } from "../lib/api/cart";

export default function ProductCard({ id, name, price }) {
  return (
    <Box>
      <Typography variant="h3">{name}</Typography>
      <Typography variant="paragraph">{price}</Typography>
      <Button
        variant="contained"
        onClick={() => {
          addProduct(id);
        }}
      >
        Add to Cart
      </Button>
    </Box>
  );
}
