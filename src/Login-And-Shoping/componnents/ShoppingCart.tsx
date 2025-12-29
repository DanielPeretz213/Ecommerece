import React, { useMemo } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContextInformation } from "../hooks/Context";
import { cartItem } from "../types/types";

const ShoppingCart: React.FC = () => {
  const { loggedInUser, removeItem } = useContextInformation();
  const navigate = useNavigate();

  const totalSum = useMemo(() => {
    if (!loggedInUser) return 0;

    return loggedInUser.cart.reduce(
      (sum, item) => sum + item.quantity * Number(item.price),
      0
    );
  }, [loggedInUser]);

  const renderContent = () => {
    if (!loggedInUser) {
      return <Typography>You need to log in first</Typography>;
    }

    if (loggedInUser.cart.length === 0) {
      return <Typography>Your cart is empty</Typography>;
    }

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loggedInUser.cart.map((item: cartItem) => (
              <TableRow key={item.id}>
                <TableCell>
                  <img src={item.image} alt={item.name} style={{ width: 60 }} />
                </TableCell>

                <TableCell>{item.name}</TableCell>

                <TableCell>
                  <Typography fontWeight="bold">{item.price}$</Typography>
                </TableCell>

                <TableCell>{item.quantity}</TableCell>

                <TableCell>
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Your Shopping Cart 🛒
      </Typography>

      {renderContent()}

      <Box
        mt={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h6">Total Sum: {totalSum.toFixed(2)}$</Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/payment")}
        >
          Pay
        </Button>
      </Box>
    </Box>
  );
};

export default ShoppingCart;
