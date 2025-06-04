import React, { useState, useEffect } from 'react';
import './NoteModal.css';

// PUBLIC_INTERFACE
/**
 * Modal component for creating or editing a note.
 * @param {object} props - Component props.
 * @param {boolean} props.isOpen - Whether the modal is open.
 * @param {function} props.onClose - Function to call when closing the modal.
 * @param {function} props.onSave - Function to call when saving the note.
 * @param {object|null} props.note - The note data to edit, or null for a new note.
 * @param {string[]} props.categories - List of available categories.
 */
function NoteModal({ isOpen, onClose, onSave, note, categories }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setCategory(note.category || '');
    } else {
      setTitle('');
      setContent('');
      setCategory(categories.length > 0 ? categories[0] : '');
    }
  }, [note, isOpen, categories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Title cannot be empty.'); // Simple validation
      return;
    }
    onSave({ title, content, category });
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{note ? 'Edit Note' : 'Create New Note'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="note-title">Title</label>
            <input
              type="text"
              id="note-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="note-content">Content</label>
            <textarea
              id="note-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter note content"
              rows="6"
            />
          </div>
          <div className="form-group">
            <label htmlFor="note-category">Category</label>
            <select 
              id="note-category" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories && categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="modal-actions">
            <button type="submit" className="btn">{note ? 'Save Changes' : 'Create Note'}</button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteModal;
