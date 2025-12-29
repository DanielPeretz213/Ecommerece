import React from "react";
import { useContextInformation } from "../hooks/Context";
import { useNavigate } from "react-router-dom";
import { Avatar, Badge, Button, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";

const Header: React.FC = () => {
  const { loggedInUser, logOut } = useContextInformation();
  const navigate = useNavigate();

  return (
    <div className="headerContainer">
      <div
        className="headerConected"
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        <Avatar
          sx={{ bgcolor: "#1565f9", cursor: "pointer" }}
          onClick={() => {
            if (!loggedInUser?.conected) navigate("/login");
          }}
        >
          {!loggedInUser ? (
            <PersonIcon />
          ) : (
            loggedInUser.name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .toUpperCase()
          )}
        </Avatar>

        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            loggedInUser?.conected
              ? logOut(loggedInUser.id)
              : navigate("/login")
          }
        >
          {loggedInUser?.conected ? "Log Out" : "Log In"}
        </Button>
      </div>

      <Typography variant="h6" sx={{ marginTop: 1 }}>
        {loggedInUser?.conected ? `Hello ${loggedInUser.name}` : "Hello"}
      </Typography>

      <div
        className="headerNavigete"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginTop: 8,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Home
        </Button>
        <Button
          onClick={() =>
            loggedInUser?.conected ? navigate("/cart") : navigate("/login")
          }
          variant="text"
          sx={{ padding: 0, minWidth: 0 }}
        >
          <Badge badgeContent={loggedInUser?.cart.length ?? 0} color="primary">
            <ShoppingCartIcon sx={{ fontSize: 28 }} />
          </Badge>
        </Button>
      </div>
    </div>
  );
};

export default Header;
