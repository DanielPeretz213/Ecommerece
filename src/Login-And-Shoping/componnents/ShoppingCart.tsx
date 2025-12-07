import React, { useEffect, useState } from "react";
import { useContextInformation } from "../hooks/Context";
import { cartItem } from "../types/types";
import Table, { ColumnsType } from "antd/es/table";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const ShoppingCart: React.FC = () => {
  const { loggedInUser,removeItem } = useContextInformation();
  const [totalSum, setTotalSum] = useState<number>((): number =>
    calculateTotalSum()
  );
  const navigate = useNavigate();

  const column: ColumnsType<cartItem> = [
  {
    title: "Image",
    dataIndex: "image",
    render: (url: string) => (
      <img src={url} alt="piktur" style={{ width: "60px" }} />
    ),
  },
  { title: "Name", dataIndex: "name" },
  { title: "Price", dataIndex: "price", render: (p) => <h3>{`${p}$`}</h3> },
  { title: "Quantity", dataIndex: "quantity" },
  {title: "Remove", dataIndex: "id", render:((id:string)=>
    <Button danger onClick={()=>removeItem(id)} >Remove</Button>
  )}
];


  const response = () => {
    if (!loggedInUser) {
      return <h3>you need to log in to your account first</h3>;
    } else if (loggedInUser.cart.length === 0) {
      return <h3>You have no product in your cart</h3>;
    } else {
      return (
        <Table<cartItem> columns={column} dataSource={loggedInUser.cart} />
      );
    }
  };

  function calculateTotalSum(): number {
    if (loggedInUser) {
      let sum = 0;
      loggedInUser.cart.forEach(
        (item) => (sum += item.quantity * Number(item.price))
      );
      return sum;
    } else {
      return 0;
    }
  };

  useEffect(()=>{
    setTotalSum(calculateTotalSum());
  },[loggedInUser])

  return (
    <div>
      <h1>Your Shopping Cart🛒</h1>
      {response()}
      <div className="totalSum">
        <Typography.Text
          strong
          style={{ fontSize: "1.2em" }}
        >{`Total Sum ${totalSum.toFixed(2)}$`}</Typography.Text>
        <Button type="primary" onClick={()=> navigate("/payment")}>pay</Button>
      </div>
    </div>
  );
};

export default ShoppingCart;
