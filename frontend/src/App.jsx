import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import dotenv from "dotenv"

dotenv.config()

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${process.env.VITE_API_URL}/api/crud`);

      setNotes(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(`${process.env.VITE_API_URL}/api/crud/${editingId}`, {
          title,
          content,
        });

        setEditingId(null);

      }

      else {
        await axios.post(`${process.env.VITE_API_URL}/api/crud`, {
          title,
          content,
        });
      }

      setTitle("");
      setContent("");
      fetchNotes();
    } catch (error) {
      console.log(error.message);
    }
  };
  const deleteNote = async (id) => {
    try {
      await axios.delete(`${process.env.VITE_API_URL}/api/crud/${id}`);

      fetchNotes();
    } catch (error) {
      console.log(error.message);
    }
  };
  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note._id);
  };
  return (
    <div className="container">
      <h1>MERN Notes App</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Enter note content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <button type="submit">
          {editingId ? "Update Note" : "Add Note"}
        </button>
      </form>

      <div>
        <h2>Preview</h2>
        <p>Title: {title}</p>
        <p>Content: {content}</p>
      </div>

      <div>
        <h2>All Notes</h2>

        {notes.map((note) => (
          <div className="note-card" key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>

            <button onClick={() => editNote(note)}>Edit</button>
            <button onClick={() => deleteNote(note._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;