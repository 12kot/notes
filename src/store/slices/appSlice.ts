import { createSlice } from "@reduxjs/toolkit";

interface note {
  id: number;
  text: string;
  tags: string[];
}

interface appType {
  notes: note[];
  currentNote: note;
}

const initialState: appType = {
  notes: [
    {
      id: 1,
      text: "",
      tags: [],
    },
    {
      id: 2,
      text: "",
      tags: [],
    },
    {
      id: 3,
      text: "",
      tags: [],
    },
    {
      id: 4,
      text: "",
      tags: [],
    },
  ],
  currentNote: {
    id: 0,
    text: "",
    tags: [],
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    getNote(state, action) {
      state.currentNote = state.notes.find(
        (note) => note.id === +action.payload.id
      ) as note;
    },

    setText(state, action) {
      state.currentNote.text = action.payload.text;
    },

    saveNote(state) {
      const current: note = state.notes.find(
        (note) => note.id === state.currentNote.id
      ) as note;
      current.text = state.currentNote.text;
    },
  },
  extraReducers: (builder) => {},
});

export const { getNote, setText, saveNote } = appSlice.actions;
export default appSlice;
