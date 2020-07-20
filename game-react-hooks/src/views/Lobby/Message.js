import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";

const Message = ({ name, message }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <ImageIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={name} secondary={message} />
    </ListItem>
  );
};

export default Message;
