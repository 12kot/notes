import React from "react";
import Header from "./components/header/header";
import Menu from "./components/content/menu/menu";
import Note from "./components/content/note/note";
import styles from "./App.module.scss";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Header />
      <main className={styles.content}>
        <Menu />
        <Routes>
          <Route path="/:id" element={<Note />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
