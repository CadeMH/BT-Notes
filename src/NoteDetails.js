import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from './CallAPI';

const NoteDetails = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [noteText, setNoteText] = useState('');
  const [noteData, setNoteData] = useState(null);
  const [savedLabel, setSavedLabel] = useState('');
  const nav = useNavigate();

  // Pull data from the API using the current note's ID
  useEffect(() => {
    fetch('http://localhost:8000/notes/' + id)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setNoteData(data);
        setTitle(data.title);
        setNoteText(data.noteText);
      })
  }, [id]);

  // Method to remove the current note from the JSON/API
  const deleteClick = () => {
    fetch('http://localhost:8000/notes/' + id, {
      method: 'DELETE'
    }).then(() => {
      nav('/');
    });
  };

  // Method to edit the current note
  const editClick = (e) => {
    e.preventDefault();
    api({ title, noteText }, 'http://localhost:8000/notes/' + id, 'PATCH');
    setSavedLabel('Saved!');
  }

  return (
    <div className="note-details">
      <h1>Note Details</h1>
      {noteData && (
        <article>
          <div className="details">
            <h2>{title}</h2>
            <div>{noteText}</div>
          </div>
          <br/>
          <button onClick={deleteClick}>Delete Note</button>
          <button onClick={() => nav('/')}>Return to Home</button>
          <br/>
          <br/>
          <div className="edit">
            <h3>Edit note</h3>
            <form onSubmit={editClick}>
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
              <button>Save</button>
              <label>{savedLabel}</label>
            </form>
          </div>
        </article>
      )}
    </div>
  );
};

export default NoteDetails;