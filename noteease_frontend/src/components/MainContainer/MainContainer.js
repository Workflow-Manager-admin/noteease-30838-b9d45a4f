import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import NoteCard from '../NoteCard/NoteCard';
import NoteModal from '../NoteModal/NoteModal';
import './MainContainer.css';

const DEFAULT_CATEGORIES = ["All", "Personal", "Work", "Study", "Ideas"];

// PUBLIC_INTERFACE
/**
 * Main container component for the NoteEase application.
 * Manages notes, categories, search, and modal interactions.
 */
function MainContainer() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORIES[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null); // Note being edited
  const [availableCategories, setAvailableCategories] = useState(DEFAULT_CATEGORIES);

  // Load notes from local storage on initial render
  useEffect(() => {
    const storedNotes = localStorage.getItem('noteease_notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
    const storedCategories = localStorage.getItem('noteease_categories');
    if (storedCategories) {
        const parsedCategories = JSON.parse(storedCategories);
        if (parsedCategories.length > 0) {
            setAvailableCategories(parsedCategories);
            if(!parsedCategories.includes(selectedCategory)){
                 setSelectedCategory(parsedCategories[0] || "All");
            }
        }
    } else {
        localStorage.setItem('noteease_categories', JSON.stringify(DEFAULT_CATEGORIES));
    }
  }, []);

  // Save notes to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('noteease_notes', JSON.stringify(notes));
  }, [notes]);

   // Save categories to local storage
   useEffect(() => {
    localStorage.setItem('noteease_categories', JSON.stringify(availableCategories));
  }, [availableCategories]);


  const handleAddNoteClick = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const handleEditNoteClick = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleDeleteNote = (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter(note => note.id !== noteId));
    }
  };

  const handleSaveNote = (noteData) => {
    if (editingNote) {
      // Update existing note
      setNotes(notes.map(n => n.id === editingNote.id ? { ...editingNote, ...noteData } : n));
    } else {
      // Create new note
      const newNote = { ...noteData, id: uuidv4() };
      setNotes([newNote, ...notes]);
    }
    // Add new category if it doesn't exist
    if (noteData.category && !availableCategories.includes(noteData.category)) {
      setAvailableCategories([...availableCategories, noteData.category]);
    }
    setIsModalOpen(false);
    setEditingNote(null);
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="main-container">
      <header className="app-header">
        <h1>NoteEase</h1>
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search notes by title or content..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="category-filters">
        {availableCategories.map(category => (
          <button
            key={category}
            className={`category-chip ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="notes-grid">
        {filteredNotes.length > 0 ? (
          filteredNotes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={handleEditNoteClick}
              onDelete={handleDeleteNote}
            />
          ))
        ) : (
          <p className="no-notes-message">
            {notes.length === 0 ? "No notes yet. Click the '+' button to add one!" : "No notes match your current filters."}
          </p>
        )}
      </div>

      <button className="fab" onClick={handleAddNoteClick}>
        +
      </button>

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingNote(null);
        }}
        onSave={handleSaveNote}
        note={editingNote}
        categories={availableCategories.filter(c => c !== "All")} // "All" is not a real category to assign
      />
    </div>
  );
}

export default MainContainer;
