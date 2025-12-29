import { Button, Card, TextField } from "@mui/material";
import React, { useState } from "react";
import "../style.css"
import { useContextInformation } from "../hooks/Context";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const {logIn} = useContextInformation();
  const navigate = useNavigate();

  const handleSendClick = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    logIn(email,password);
    setEmail("");
    setPassword("");
  }

  return (
    <div className="containerLoginPage">
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent:"center",
          width: "35%",
          height:"50%",
          backgroundColor: "success",
        }}
      >
        <h1>Login</h1>
        <form className="formLogin" onSubmit={handleSendClick}>
          <TextField
            label="email"
            value={email}
            margin="normal"
            fullWidth
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="password"
            type="password"
            value={password}
            margin="normal"
            fullWidth
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" fullWidth>
            Send
          </Button>
          <p>To Register {<Button onClick={()=> navigate("/signUp")}>Click</Button>}</p>
        </form>
      </Card>
    </div>
  );
};
export default LoginPage;
