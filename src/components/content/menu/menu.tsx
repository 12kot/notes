import React from "react";
import styles from "./menu.module.scss";
import { useAppDispatch } from "../../../hooks/hooks";
import { addNote, getNote } from "../../../store/slices/appSlice";
import { v4 } from "uuid";
import { note } from "../../types/types";

const Menu = (props: { items: note[] }) => {
  const dispatch = useAppDispatch();

  const handleGet = (id: number): void => {
    dispatch(getNote({ id: id }));
  };

  const getItems = () => {
    return props.items.map((item) => (
      <button
        className={styles.item}
        onClick={() => handleGet(item.id)}
        key={v4()}
      >
        {item.id}
      </button>
    ));
  };

  const handleAdd = () => {
    dispatch(addNote());
  };

  return (
    <nav>
      <button className={styles.item} onClick={handleAdd}>
        +
      </button>
      {getItems()}
    </nav>
  );
};

export default Menu;
