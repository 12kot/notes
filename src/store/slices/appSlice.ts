import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { appType, note } from "../../components/types/types";

const initialNote: note = {
  id: -1,
  header: "",
  text: "",
  tags: [],
};

const initialState: appType = {
  notes: [],
  currentNote: initialNote,
  notesSize: 0,
  tags: [],
  sortTags: []
};

const getNoteTags = (text: string): string[] => {
  return Array.from(
    new Set(
      text
        .replaceAll("\n", " ")
        .toLowerCase()
        .split(" ")
        .filter((word) => word.startsWith("#"))
    )
  );
};

const getAllTags = (tags: string[][]): string[] => {
  const arr: string[] = [];

  for (const items of tags) {
    arr.push(...items);
  }

  return Array.from(new Set(arr));
};

const sortNotes = (notes: note[], tags: string[]): note[] => {
  const map = new Map<number, number>();

  for (const note of notes) {
    let quantity = 0;

    for (const tag of note.tags) {
      if (tags.includes(tag)) quantity++;
    }

    map.set(note.id, quantity);
  }

  notes.sort((a, b) => (map.get(b.id) as number) - (map.get(a.id) as number));
  return notes
}

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addNote(state) {
      state.notes.push({
        id: ++state.notesSize,
        header: "",
        text: "",
        tags: [],
      });
    },

    removeNote(state, action: PayloadAction<{ id: number }>) {
      state.notes = state.notes.filter(
        (note) => note.id !== action.payload.id
      );

      state.currentNote = initialNote;
      state.tags = getAllTags(state.notes.map((note) => note.tags));
    },

    getNote(state, action: PayloadAction<{id: number}>) {
      state.currentNote = state.notes.find(
        (note) => note.id === action.payload.id
      ) as note;
    },

    setText(state, action: PayloadAction<{text: string}>) {
      state.currentNote.text = action.payload.text;
    },

    setHead(state, action: PayloadAction<{text: string}>) {
      state.currentNote.header = action.payload.text;
    },

    saveNote(state) {
      const currentId = state.currentNote.id;
      const current: note = state.notes.find(
        (note) => note.id === currentId
      ) as note;

      state.currentNote.tags = getNoteTags(state.currentNote.text);

      current.header = state.currentNote.header;
      current.text = state.currentNote.text;
      current.tags = state.currentNote.tags;

      state.tags = getAllTags(state.notes.map((note) => note.tags));
    },

    closeNote(state) {
      state.currentNote = initialNote;
    },

    handleSortTags(state, action: PayloadAction<{tag: string}>) {
      if (state.sortTags.includes(action.payload.tag.toLowerCase())) {
        state.sortTags = state.sortTags.filter((tag) => tag !== action.payload.tag);
      } else
        state.sortTags.push(action.payload.tag.toLowerCase());
      
      state.notes = sortNotes(state.notes, state.sortTags);
      //console.log(state.notes)
    }
  },
  extraReducers: (builder) => {},
});

export const { getNote, setText, saveNote, addNote, removeNote, closeNote, handleSortTags, setHead } =
  appSlice.actions;
export default appSlice;
