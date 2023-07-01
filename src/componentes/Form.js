import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
function FormList() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setError('');
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the title is already in use
    const existingNote = notes.find((note) => note.title === title);
    if (existingNote) {
      setError('Note with the same title already exists!');
      return;
    }

    // Check if the description is required
    if (title.length < 10 && !description) {
      setError('Description is mandatory for titles with less than 10 characters!');
      return;
    }

    const newNote = { title, description };
    setNotes([...notes, newNote]);
    setTitle('');
    setDescription('');
    setError('');
  };

  const handleDelete = (title) => {
    const updatedNotes = notes.filter((note) => note.title !== title);
    setNotes(updatedNotes);
  };

  return (
    <div className="container">
      <h1 className="title">Note Taking App</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            className="form"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input 
            type="text"
            className="form-control"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className='add'>
        <button type="submit" className="btn btn-primary">Add Note</button>
        </div>
      </form>

      {error && <p className="error">{error}</p>}

      {notes.map((note, index) => (
        <div key={index} className="note card">
          <div className="card-body">
            <h3 className="note-title card-title">{note.title}</h3>
            {note.description && <p className="note-description card-text">{note.description}</p>}
            <button onClick={() => handleDelete(note.title)} className="btn btn-danger">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
 
export default FormList;

