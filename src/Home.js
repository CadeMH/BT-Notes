import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from './CallAPI';

const Home = () => {
  const [notes, setNotes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [noteText, setNoteText] = useState('');

  // Populate "notes" with data from API
  useEffect(() => {
    fetch('http://localhost:8000/notes')
      .then(res => {
        return res.json()
      })
      .then(data => {
        setNotes(data)
        setIsLoading(false)
      })
  }, []);

  // Add new entry to API
  const createClick = (e) => {
    e.preventDefault();
    api({ title, noteText }, 'http://localhost:8000/notes', 'POST')
    window.location.reload();
  }

  return (
    <div className="home">
      <h1>Home</h1>
        {/* If the API hasn't been loaded, display loading message */}
        {isLoading && <div>Loading...</div>}
        {/* Iterate through notes */}
        {notes && notes.map((note) => (
          <div className="grid-container" key={note.id}>
            {/* Make the note clickable */}
            <Link to={`/${note.id}`}>
              <div className="notes-list" key={note.id}>
                <h2>{note.title}</h2>
                <p>{note.noteText}</p>
              </div>
            </Link>
          </div>
        ))}
        {/* If notes is not null, show new note section */}
        {notes && <div className="create">
          <h2>Create new note</h2>
          <form onSubmit={createClick}>
            <label>Note Title: </label>
            <input 
              type=""
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br/>
            <label>Note Body:</label>
            <textarea
              required
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
            <button>Create Note</button>
          </form>
        </div>}
    </div>
  );
};

export default Home;
