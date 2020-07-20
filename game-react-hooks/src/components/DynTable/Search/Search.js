import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import useStyles from "./Search.styles";
import { Toolbar, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AddCircle from "@material-ui/icons/AddCircle";

const Search = ({ newItem, search, onSearchChange }) => {
  const classes = useStyles();
  return (
    <Toolbar>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
      <IconButton
        onClick={newItem}
        color="primary"
        aria-label="upload picture"
        component="span"
      >
        <AddCircle />
      </IconButton>
      <Typography>New Game</Typography>
    </Toolbar>
  );
};

export default Search;
