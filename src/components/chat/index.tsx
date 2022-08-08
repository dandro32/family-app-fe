import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import io from "socket.io-client";

import SendIcon from "@mui/icons-material/Send";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import {
  Alert,
  Avatar,
  Badge,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import ClickAwayListener from "@mui/base/ClickAwayListener";

import styled from "@emotion/styled";
import { API_BASE, SOCKET_EVENT_NAME } from "../../consts";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { observer } from "mobx-react-lite";
import { useStores } from "../../store";
import { ChatMessage } from "../../models/Chat";

const ENTER_KEYCODE = 13;

const ChatSection = styled(Grid)`
  && {
    width: 100%,
    height: 80vh,
    background: yellow;
  }
`;

const MessageArea = styled(List)`
  && {
    max-height: 60vh;
    max-width: 400px;
    overflow-y: scroll;
  }
`;

const ChatContainer = styled.div`
  position: fixed;
  bottom: 16px;
  left: 16px;
  z-index: 2;
`;

const ChatMessageBox = styled(Paper)`
  padding: 15px;
  border: 1px solid #90a4ae;
  background: #eceff1;
`;

const SendMessageContainer = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const socket = io("http://localhost:8081", {
  withCredentials: true,
});

const Chat: React.FC = observer(() => {
  const {
    auth: {
      me: { username },
    },
    chat: { items, isLoading, fetchChatHistory },
  } = useStores();
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isHidden, setIsHidden] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      await fetchChatHistory();
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    if (items.length) {
      setMessages(items);
    }
  }, [items.length]);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on(SOCKET_EVENT_NAME, (response: ChatMessage) => {
      setMessages((prevState) => [...prevState, response]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const showChat = () => {
    setIsHidden(false);
  };

  const hideChat = () => {
    setIsHidden(true);
  };

  const getColor = (name: string): string => {
    return name?.charAt(0).toLowerCase() === "d"
      ? deepPurple[500]
      : deepOrange[500];
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === ENTER_KEYCODE) {
      sendMessage();
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setMessage(value);
  };

  const sendMessage = () => {
    if (!message.trim()) {
      return;
    }

    setMessage("");
    socket.emit(SOCKET_EVENT_NAME, { name: username, message });
  };

  const renderMessages = messages.map((item: any, index: number) => (
    <div key={`chat-${index}`}>
      <List>
        <ListItem button key={index}>
          <ListItemIcon>
            <Avatar sx={{ bgcolor: getColor(item.name) }}>
              {item.name.charAt(0).toUpperCase()}
            </Avatar>
          </ListItemIcon>
          <ListItemText
            primary={item.message}
            secondary={item.date}
          ></ListItemText>
        </ListItem>
      </List>
      <Divider />
    </div>
  ));

  return (
    <ChatContainer>
      {isHidden && (
        <IconButton color="primary" aria-label="chat" onClick={showChat}>
          <Badge badgeContent={messages.length} color="error">
            <ChatBubbleOutlineOutlinedIcon />
          </Badge>
        </IconButton>
      )}
      {!isHidden && (
        <ClickAwayListener onClickAway={hideChat}>
          <ChatMessageBox>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h5">Chat Box</Typography>
              </Grid>
            </Grid>
            <ChatSection container>
              <Grid item xs={12}>
                {isLoading && (
                  <MessageArea>
                    <CircularProgress size={20} />
                  </MessageArea>
                )}
                {!isLoading && <MessageArea>{renderMessages}</MessageArea>}

                <SendMessageContainer container>
                  <Grid item xs={11}>
                    <TextField
                      fullWidth
                      id="chat-input"
                      label="Type Something"
                      onChange={onInputChange}
                      onKeyDown={onKeyDown}
                      sx={{ marginRight: "5px" }}
                      value={message}
                    />
                  </Grid>
                  <Grid xs={1}>
                    <IconButton
                      color="primary"
                      aria-label="add"
                      onClick={sendMessage}
                    >
                      <SendIcon />
                    </IconButton>
                  </Grid>
                  <Grid container>
                    {!isConnected && (
                      <Alert severity="error">
                        Could not connect to server
                      </Alert>
                    )}
                  </Grid>
                </SendMessageContainer>
              </Grid>
            </ChatSection>
          </ChatMessageBox>
        </ClickAwayListener>
      )}
    </ChatContainer>
  );
});

export default Chat;
