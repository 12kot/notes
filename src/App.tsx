import React from "react";
import Header from "./components/header/header";
import Menu from "./components/content/menu/menu";
import Note from "./components/content/note/note";
import styles from "./App.module.scss";
import { useAppSelector } from "./hooks/hooks";
import Tags from "./components/content/tags/tags";

const App = () => {
  const { currentNote, tags, notes } = useAppSelector((state) => state.app);

  return (
    <>
      <Header />
      <Tags tags={tags} />
      <main className={styles.content}>
        <Menu items={notes} />
        <Note currentNote={currentNote} />
      </main>
    </>
  );
};

export default App;
