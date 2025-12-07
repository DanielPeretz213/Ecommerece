import { Button, Card, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { user } from "../types/types";
import { useContextInformation } from "../hooks/Context";

const SignUpPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passVerification, setPassVerification] = useState<string>("");
  const {hendleAddUser} = useContextInformation();
  const navigate = useNavigate();

  const hendlerSendClick = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(password !== passVerification){
        toast.error("the password is not the same");
    }else{
        setName("");
        setEmail("");
        setPassword("");
        setPassVerification("");
        const user:user = {
            id:String(Date.now()),
            name:name,
            password:password,
            email: email,
            conected:true,
            cart:[],
        }
        hendleAddUser(user);
        navigate("/");
    }
  }
  
  return (
    <div className="containerSignUpPage">
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "40%",
          height: "80%",
          backgroundColor: "success",
          padding: "10px"
        }}
      >
        <h1>sign Up</h1>
        <form className="formSignUp" onSubmit={hendlerSendClick}>
          <TextField
            label="name"
            value={name}
            margin="normal"
            fullWidth
            required
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Email"
            value={email}
            margin="normal"
            fullWidth
            required
            onChange={(e)=> setEmail(e.target.value)}
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

          <TextField
            label="Paasword Verification"
            type="password"
            value={passVerification}
            margin="normal"
            fullWidth
            required
            onChange={(e)=> setPassVerification(e.target.value)}
            />

          <Button type="submit" fullWidth>
            send
          </Button>
          <p>To conect {<Button onClick={()=> navigate("/login")}>click</Button>}</p>
        </form>
      </Card>
    </div>
  );
};

export default SignUpPage;
