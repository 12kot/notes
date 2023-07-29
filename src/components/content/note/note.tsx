import React, { ReactElement, useState } from "react";
import styles from "./note.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  setText,
  saveNote,
  removeNote,
  closeNote,
  setHead,
  handleSortTags,
} from "../../../store/slices/appSlice";
import { v4 } from "uuid";
import { Box, Button, ButtonGroup, TextField } from "@mui/material";

const Note = (): ReactElement => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { currentNote, sortTags } = useAppSelector((state) => state.app);

  const dispatch = useAppDispatch();

  const { text, tags, id, header } = currentNote;
  if (id === -1) return <></>;

  const handleSort = (tag: string): void => {
    dispatch(handleSortTags({ tag: tag }));
  };

  const handleClose = () => {
    dispatch(closeNote());
  };

  const handleChange = (text: string) => {
    dispatch(setText({ text: text }));
    dispatch(saveNote());
  };

  const handleHeadChange = (text: string) => {
    dispatch(setHead({ text: text }));
    dispatch(saveNote());
  };

  const handleEdit = () => {
    if (isEdit) {
      dispatch(saveNote());
    }

    setIsEdit((e) => !e);
  };

  const handleRemove = () => {
    dispatch(removeNote({ id: id }));
  };

  const _getButton = (word: string): ReactElement => {
    const isSortTag = sortTags.includes(word.toLowerCase());

    return (
      <Button
        sx={{
          backgroundColor: isSortTag ? "#e3f2fd" : "",
          "&:hover": {
            background: isSortTag ? "#c8e4fb" : "#e3f2fd",
          },
        }}
        variant="text"
        size="small"
        onClick={() => handleSort(word)}
        key={v4()}
      >
        {word}
      </Button>
    );
  };

  const getMarkTexst = (): (string | JSX.Element)[] => {
    const str: (string | JSX.Element)[] = [];

    for (const word of text.replaceAll("\n", " ").split(" ")) {
      if (word.startsWith("#") && word.length > 1) {
        str.push(" ");
        str.push(_getButton(word));
      } else str.push(" " + word);
    }

    return str;
  };

  const getNoteTags = (): ReactElement[] => {
    return tags.map((tag) => _getButton(tag));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        overflowX: "hidden",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          sx={{
            backgroundColor: "#e3f2fd",
            "&:hover": {
              background: "#c8e4fb",
            },
          }}
          onClick={handleClose}
        >
          НАЗАД
        </Button>
        <ButtonGroup
          sx={{ display: "flex" }}
          aria-label="outlined button group"
        >
          <Button onClick={handleRemove}>DELETE</Button>
          <Button sx={{ margin: "0 auto 0 0" }} onClick={handleEdit}>
            {isEdit ? "Сохранить" : "Изменить"}
          </Button>
        </ButtonGroup>
      </Box>

      <TextField
        label="Невероятный банан"
        size="small"
        value={header}
        onChange={(e) => handleHeadChange(e.target.value)}
        disabled={!isEdit}
      />

      {!isEdit ? (
        <span className={styles.note}>{getMarkTexst()}</span>
      ) : (
        <TextField
          label="Сегодня на меня напал банан..."
          value={text}
          onChange={(e) => handleChange(e.target.value)}
          disabled={!isEdit}
          multiline
          maxRows={40}
        />
      )}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        {getNoteTags()}
      </Box>
    </Box>
  );
};

export default Note;
