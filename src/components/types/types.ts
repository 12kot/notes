export interface note {
  id: number;
  header: string;
  text: string;
  tags: string[];
}

export interface appType {
  notes: note[];
  currentNote: note;
  notesSize: number;
  tags: string[];
  sortTags: string[];
}
