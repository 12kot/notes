import React from "react";
import styles from "./menu.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { addNote, getNote } from "../../../store/slices/appSlice";
import { v4 } from "uuid";
import { Box, Button, ButtonGroup, Grid } from "@mui/material";

const Menu = () => {
  const dispatch = useAppDispatch();
  const { notes, currentNote } = useAppSelector((state) => state.app);

  const handleGet = (id: number): void => {
    dispatch(getNote({ id: id }));
  };

  const getItems = () => {
    return notes.map((item) => (
      <Button
        className={styles.item}
        onClick={() => handleGet(item.id)}
        key={v4()}
        sx={{
          backgroundColor:  currentNote.id === item.id ? "#e3f2fd" : "",
          "&:hover": {
            background: currentNote.id === item.id ? "#c8e4fb" : "",
          },
          overflowX: "hidden",
        }}
      >
        {item.header.slice(0, 14) || item.id}
      </Button>
    ));
  };

  const handleAdd = () => {
    dispatch(addNote());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Button
            sx={{
              backgroundColor: "#e3f2fd",
              "&:hover": {
                background: "#c8e4fb",
              },
            }}
            className={styles.item}
            onClick={handleAdd}
          >
            +
          </Button>
        </Grid>

        <Grid item xs={12}>
          <ButtonGroup
            className={styles.item}
            orientation="vertical"
            aria-label="vertical outlined button group"
          >
            {getItems()}
          </ButtonGroup>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Menu;
