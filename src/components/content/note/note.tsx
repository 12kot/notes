import React, { useEffect } from "react";
import styles from "./note.module.scss";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { getNote, setText, saveNote } from "../../../store/slices/appSlice";

const Note = () => {
  const { id } = useParams<keyof { id: number }>();
  const dispatch = useAppDispatch();
  const text = useAppSelector((state) => state.app.currentNote.text);

  useEffect(() => {
    dispatch(getNote({ id: id }));
  }, [dispatch, id]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setText({ text: e.target.value }));
  };

  const handleSave = () => {
    dispatch(saveNote());
  };

  return (
    <article className={styles.container}>
      <textarea
        value={text}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <button onClick={handleSave}>SAVE</button>
    </article>
  );
};

export default Note;
