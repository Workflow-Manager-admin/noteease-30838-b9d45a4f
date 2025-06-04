import React from 'react';
import './NoteCard.css';

// PUBLIC_INTERFACE
/**
 * Component to display a single note card.
 * @param {object} props - Component props.
 * @param {object} props.note - The note object to display.
 * @param {function} props.onEdit - Function to call when edit is clicked.
 * @param {function} props.onDelete - Function to call when delete is clicked.
 */
function NoteCard({ note, onEdit, onDelete }) {
  const MAX_SNIPPET_LENGTH = 100; // Max characters for snippet

  const getSnippet = (content) => {
    if (!content) return '';
    if (content.length <= MAX_SNIPPET_LENGTH) {
      return content;
    }
    return content.substring(0, MAX_SNIPPET_LENGTH) + '...';
  };

  return (
    <div className="note-card">
      <div className="note-card-header">
        <h3 className="note-title">{note.title}</h3>
        {note.category && <span className="note-category-badge">{note.category}</span>}
      </div>
      <p className="note-snippet">{getSnippet(note.content)}</p>
      <div className="note-card-actions">
        <button className="btn btn-small btn-edit" onClick={() => onEdit(note)}>Edit</button>
        <button className="btn btn-small btn-delete btn-danger" onClick={() => onDelete(note.id)}>Delete</button>
      </div>
    </div>
  );
}

export default NoteCard;
