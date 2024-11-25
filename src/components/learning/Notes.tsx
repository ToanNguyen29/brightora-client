// Notes.tsx
import React from 'react';
import { Box, TextField, Button, Divider, Paper, Typography } from "@mui/material";

interface Note {
  id: string;
  text: string;
}

interface NotesProps {
  notes: Note[];
  newNote: string;
  setNewNote: React.Dispatch<React.SetStateAction<string>>;
  handleAddNote: () => void;
}

const Notes: React.FC<NotesProps> = ({ notes, newNote, setNewNote, handleAddNote }) => (
  <Box p={3}>
    <Typography variant="h6" gutterBottom>Add a Note</Typography>
    <TextField 
      variant="outlined" 
      fullWidth 
      multiline 
      rows={4} 
      value={newNote}
      onChange={(e) => setNewNote(e.target.value)}
      sx={{ mb: 2 }}
    />
    <Button variant="contained" color="primary" onClick={handleAddNote}>Add Note</Button>
    <Divider sx={{ my: 3 }} />
    <Typography variant="h6">Your Notes</Typography>
    {notes.map((note) => (
      <Paper key={note.id} sx={{ p: 2, mb: 2 }}>
        <Typography>{note.text}</Typography>
      </Paper>
    ))}
  </Box>
);

export default Notes;
