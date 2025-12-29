//import React, { useEffect, useState } from "react";
//import { useContextInformation } from "../hooks/Context";
//import { cartItem } from "../types/types";
//import Table, { ColumnsType } from "antd/es/table";
//import { Button, Typography } from "antd";
//import { useNavigate } from "react-router-dom";
//
//const ShoppingCart: React.FC = () => {
//  const { loggedInUser,removeItem } = useContextInformation();
//  const [totalSum, setTotalSum] = useState<number>((): number =>
//    calculateTotalSum()
//  );
//  const navigate = useNavigate();
//
//  const column: ColumnsType<cartItem> = [
//  {
//    title: "Image",
//    dataIndex: "image",
//    render: (url: string) => (
//      <img src={url} alt="picture" style={{ width: "60px" }} />
//    ),
//  },
//  { title: "Name", dataIndex: "name" },
//  { title: "Price", dataIndex: "price", render: (p) => <h3>{`${p}$`}</h3> },
//  { title: "Quantity", dataIndex: "quantity" },
//  {title: "Remove", dataIndex: "id", render:((id:string)=>
//    <Button danger onClick={()=>removeItem(id)} >Remove</Button>
//  )}
//];
//
//
//  const response = () => {
//    if (!loggedInUser) {
//      return <h3>you need to log in to your account first</h3>;
//    } else if (loggedInUser.cart.length === 0) {
//      return <h3>You have no products in your cart</h3>;
//    } else {
//      return (
//        <Table<cartItem> columns={column} dataSource={loggedInUser.cart} />
//      );
//    }
//  };
//
//  function calculateTotalSum(): number {
//    if (loggedInUser) {
//      let sum = 0;
//      loggedInUser.cart.forEach(
//        (item) => (sum += item.quantity * Number(item.price))
//      );
//      return sum;
//    } else {
//      return 0;
//    }
//  };
//
//  useEffect(()=>{
//    setTotalSum(calculateTotalSum());
//  },[loggedInUser])
//
//  return (
//    <div>
//      <h1>Your Shopping Cart🛒</h1>
//      {response()}
//      <div className="totalSum">
//        <Typography.Text
//          strong
//          style={{ fontSize: "1.2em" }}
//        >{`Total Sum ${totalSum.toFixed(2)}$`}</Typography.Text>
//        <Button type="primary" onClick={()=> navigate("/payment")}>pay</Button>
//      </div>
//    </div>
//  );
//};
//
//export default ShoppingCart;
//
import React, { useEffect, useState } from "react";
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
  const [totalSum, setTotalSum] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    setTotalSum(calculateTotalSum());
  }, [loggedInUser]);

  const calculateTotalSum = (): number => {
    if (!loggedInUser) return 0;
    return loggedInUser.cart.reduce(
      (sum, item) => sum + item.quantity * Number(item.price),
      0
    );
  };

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
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: 60 }}
                  />
                </TableCell>

                <TableCell>{item.name}</TableCell>

                <TableCell>
                  <Typography fontWeight="bold">
                    {item.price}$
                  </Typography>
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
        <Typography variant="h6">
          Total Sum: {totalSum.toFixed(2)}$
        </Typography>

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
