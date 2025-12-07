import React, { useState } from "react";
import { useContextInformation } from "../hooks/Context";
//import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Avatar, Badge, Button } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";

const Header: React.FC = () => {
  const { loggedInUser, logIn, logOut } = useContextInformation();
  const navigate = useNavigate();

  return (
    <div className="hederContainer">
      <div className="hedarConected">
        <Avatar
          size="large"
          style={{ backgroundColor: "#1565f9ff", cursor:"pointer" }}
          icon={!loggedInUser ? <UserOutlined /> : undefined}
          onClick={() => {
            if (!loggedInUser?.conected) return navigate("/login");
          }}
        >
          {loggedInUser
            ? loggedInUser.name
                .split(" ")
                .map((word) => word[0])
                .join("")
                .toUpperCase()
            : null}
        </Avatar>
        {
          <Button
            type="primary"
            onClick={() =>
              loggedInUser?.conected
                ? logOut(loggedInUser.id)
                : navigate("/login")
            }
          >
            {loggedInUser?.conected ? "Log Out" : "Log In"}
          </Button>
        }
      </div>

      <h3>{loggedInUser?.conected ? `hello ${loggedInUser.name}` : "hello"}</h3>
      <div className="hederNavigete">
        <Button type="primary" onClick={() => navigate("/")}>
          Home
        </Button>
        <Badge
          count={loggedInUser?.cart.length}
          onClick={() =>loggedInUser?.conected? navigate("/cart") : navigate("/login")}
        >
          <ShoppingCartOutlined style={{ fontSize: "1.2em",cursor:"pointer" }} />
        </Badge>
      </div>
    </div>
  );
};

export default Header;
