import './App.css';
import AddTrip from './components/AddTripForm';
import AskAI from './components/AskAI';
import TripList from './components/TripList';
import { Trip } from './types';
import { useCollection, useQuery } from '@squidcloud/react';

function App() {
  const collection = useCollection<Trip>('trips'); // This is the name in the database. It will grab the trips collection from the db
  const trips = useQuery(collection.query()); // This is a hook provided by squid to get data i.e all of the trips from the db

  console.log(trips)
  console.log(trips.data)

  //! Helper function that will help us find a trip that needs to be modified
  const findTrip = (id: string) => {
    return trips.data.find((trip) => trip.data.id === id)
  }

  //! Function that will be called when we need to delete a trip
  const onDelete = (id: string) => {
    const trip = findTrip(id);
    if (trip) trip.delete()
  };

  const onAddNote = (tripId: string, note: string) => {
    const trip = findTrip(tripId);
    if (!trip) return
    const notes = trip.data.notes
    notes.push(note)
    trip.update({
      notes: notes
    })
  };


  const onDeleteNote = (tripId: string, noteIndex: number) => {
    const trip = findTrip(tripId);
    if (!trip) return
    const notes = trip.data.notes;
    trip.update({
      notes: notes.filter((_, index) => index !== noteIndex)
    })
  };

  return (
    <div className="card">
      {/* <h1>Hello World</h1> */}
      <AskAI />
      <AddTrip />
      <TripList
        trips={trips.data.map((trip) => trip.data)}
        onDelete={onDelete}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
      />
    </div>
  );
}

export default App;
