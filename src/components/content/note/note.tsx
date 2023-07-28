import React, { ReactElement, useRef, useState } from "react";
import styles from "./note.module.scss";
import { useAppDispatch } from "../../../hooks/hooks";
import {
  setText,
  saveNote,
  removeNote,
  closeNote,
  setHead,
} from "../../../store/slices/appSlice";
import { v4 } from "uuid";
import { note } from "../../types/types";

const Note = (props: { currentNote: note }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const headRef = useRef<HTMLTextAreaElement>(null);

  const dispatch = useAppDispatch();

  const { text, tags, id, header } = props.currentNote;
  if (id === -1) return <></>;

  const handleClose = () => {
    dispatch(closeNote());
  };

  const handleChange = () => {
    dispatch(setText({ text: textRef.current?.value || "" }));
    //dispatch(saveNote());
  };

  const handleHeadChange = () => {
    dispatch(setHead({ text: headRef.current?.value || "" }));
    //dispatch(saveNote());
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

  const getMarkTexst = (): (string | JSX.Element)[] => {
    const str: (string | JSX.Element)[] = [];

    for (const word of text.replaceAll("\n", " ").split(" ")) {
      if (word.startsWith("#")) {
        str.push(" ");
        str.push(
          <span className={styles.red} key={v4()}>
            {word}
          </span>
        );
      } else str.push(" " + word);
    }

    return str;
  };

  const getNoteTags = (): ReactElement[] => {
    return Array.from(tags).map((tag) => (
      <span className={styles.tag} key={v4()}>
        {tag}
      </span>
    ));
  };

  return (
    <article className={styles.container}>
      <section className={styles.buttons}>
        <button onClick={handleClose}>НАЗАД</button>
        <button onClick={handleEdit}>
          {isEdit ? "Сохранить" : "Изменить"}
        </button>
        <button onClick={handleRemove}>DELETE</button>
      </section>

      <textarea
        className={styles.head}
          disabled={!isEdit}
          value={header}
          onChange={handleHeadChange}
          ref={headRef}
      />
      
      {!isEdit ? (
        <span>{getMarkTexst()}</span>
      ) : (
        <textarea
          disabled={!isEdit}
          value={text}
          onChange={handleChange}
          ref={textRef}
        />
      )}

      <span className={styles.tags}>{getNoteTags()}</span>
    </article>
  );
};

export default Note;
