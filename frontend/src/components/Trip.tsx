import { format } from 'date-fns';
import { Trip } from '../types';
import { useState } from 'react';

//! Here, we are defining the type of the props as we are working on a typescript file so defining types of any variable is a must.
type Props = {
  trip: Trip; // Defines the trip schema desclared in our squid db as a Trip type
  onDelete: (id: string) => void; // Defines the onDelete function which will take id as functional parameter and return type is void
  onAddNote: (tripId: string, note: string) => void; // Defines the onAddNote function which will take tripId and note as functional parameter and return type is void
  onDeleteNote: (tripId: string, noteIndex: number) => void; // Defines the onDeleteNote function which will take tripId and noteIndex as functional parameter and return type is void
  index: number; // Defines the index as number
};

function TripCard({ trip, onDelete, onAddNote, onDeleteNote, index }: Props) {
  const [newNote, setNewNote] = useState('');

  const handleAddNote = (tripId: string, note: string) => {
    if (note.trim() !== '') {
      onAddNote(tripId, note.trim());
      setNewNote('');
    }
  };

  return (
    <div className="trip-card" key={index}>
      <h4>
        <span>{format(trip.startDate, 'PPP')} - {format(trip.endDate, 'PPP')}</span>
        <button className="country-button">{trip.country}</button>
        <button className="delete-button" onClick={() => onDelete(trip.id)}>Delete</button>
      </h4>
      <ul>
        {trip.notes.map((note, noteIndex) => (
          <li key={noteIndex} className="note">
            {note}{' '}
            <button className="delete-button" onClick={() => onDeleteNote(trip.id, noteIndex)}>x</button>
          </li>
        ))}
      </ul>
      <div className="note-form">
        <input type="text" className="note-input" value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder="Add a note" />
        <button className="add-note-button" onClick={() => handleAddNote(trip.id, newNote)}>Add Note</button>
      </div>
    </div>
  );
}

export default TripCard