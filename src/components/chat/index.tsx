import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import SendIcon from "@mui/icons-material/Send";
import {
  Avatar,
  Divider,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { API_BASE } from "../../consts";
import { deepOrange, deepPurple } from "@mui/material/colors";

const ChatSection = styled(Grid)`
  && {
    width: 100%,
    height: 80vh,
  }
`;

const MessageArea = styled(List)`
  && {
    overflow-y: auto,
    height: 70vh,
  }
`;

const socket = io("http://localhost:8081", {
  withCredentials: true,
});

const Chat: React.FC = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState("");

  const items: any = [
    { name: "Daniel", message: "Joł" },
    { name: "Daniel", message: "wasup" },
    { name: "Paulina", message: "wasup" },
  ];

  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket is connected");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("socket is disconnected");
      setIsConnected(false);
    });

    socket.on("pong", () => {
      console.log("socket pong");
      setLastPong(new Date().toISOString());
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  const renderMessages = items.map((item: any, index: number) => (
    <>
      <List>
        <ListItem button key={index}>
          <ListItemIcon>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>{item.name}</Avatar>
          </ListItemIcon>
          <ListItemText primary={item.message}></ListItemText>
        </ListItem>
      </List>
      <Divider />
    </>
  ));

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message">
            Chat
          </Typography>
        </Grid>
      </Grid>
      <ChatSection container>
        <Grid item xs={3} style={{ borderRight: "1px solid #e0e0e0" }}>
          <Grid item xs={12} style={{ padding: "10px" }}>
            <TextField
              id="outlined-basic-email"
              label="Search"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Divider />
          {renderMessages}
        </Grid>
        <Grid item xs={9}>
          <MessageArea>{renderMessages}</MessageArea>
          <Divider />
          <Grid container style={{ padding: "20px" }}>
            <Grid item xs={11}>
              <TextField
                id="outlined-basic-email"
                label="Type Something"
                fullWidth
              />
            </Grid>
            <Grid xs={1}>
              <Fab color="primary" aria-label="add">
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </ChatSection>
    </div>
  );
};

export default Chat;
