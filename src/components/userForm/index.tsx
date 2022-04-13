import React, { useState, FC, ChangeEvent } from "react";
import { Paper, TextField, Button } from "@mui/material";
import { User } from "../../models/User";

interface UserFormProps {
  onSubmit: (credentials: User) => void;
}

const UserForm: FC<UserFormProps> = ({ onSubmit }) => {
  const [loginData, setLoginData] = useState({
    login: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(loginData);
  };

  return (
    <Paper>
      <TextField
        id="login"
        label="Login"
        variant="standard"
        onChange={handleChange}
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        variant="standard"
        autoComplete="current-password"
        onChange={handleChange}
      />
      <Button onClick={handleSubmit}></Button>
    </Paper>
  );
};

export default UserForm;
