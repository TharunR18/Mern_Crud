import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Analytics } from "@vercel/analytics/react"


function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/crud`);

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
        await axios.put(`${import.meta.env.VITE_API_URL}/api/crud/${editingId}`, {
          title,
          content,
        });

        setEditingId(null);

      }

      else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/crud`, {
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
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/crud/${id}`);

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
    <div className={darkMode ? "app dark" : "app light"}>
      <div className="container">

        <button
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        <h1> Task Tracker</h1>

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

        <footer className="footer">
          <p>
            Crafted By{" "}
            <a
              href="https://www.linkedin.com/in/tharun2007/"
              target="_blank"
              rel="noreferrer"
            >
              Tharun
            </a>
          </p>
        </footer>
      </div>
      <Analytics />
    </div>

  );
}

export default App;