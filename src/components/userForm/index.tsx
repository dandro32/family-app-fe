import React, { useState, FC, ChangeEvent } from "react";
import { Paper, TextField, Button, Grid, Typography } from "@mui/material";
import { User } from "../../models/User";

interface UserFormProps {
  onSubmit: (credentials: User) => void;
  title: string;
}

const UserForm: FC<UserFormProps> = ({ onSubmit, title }) => {
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
    <>
      <Typography variant="h3" component="div">
        {title}
      </Typography>
      <TextField
        id="login"
        label="Login"
        variant="standard"
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        variant="standard"
        autoComplete="current-password"
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <Button color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </>
  );
};

export default UserForm;
