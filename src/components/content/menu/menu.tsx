import React from "react";
import styles from "./menu.module.scss";
import { NavLink } from "react-router-dom";

const Menu = () => {
  const items = [1, 2, 3, 4];
  const getItems = () => {
    return items.map((item) => (
      <NavLink className={styles.item} to={`${item}`}>
        {item}
      </NavLink>
    ));
  };

  return <nav>{getItems()}</nav>;
};

export default Menu;
