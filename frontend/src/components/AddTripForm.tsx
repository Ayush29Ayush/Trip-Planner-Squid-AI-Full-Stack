import { useState, useEffect } from 'react';
import { useCollection } from '@squidcloud/react';
import './AddTripForm.css';
import { Trip } from '../types';

function AddTrip() {
  const [country, setCountry] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [countries, setCountries] = useState([]);
  const tripsCollection = useCollection<Trip>("trips") //! The name in the database is trips, but each trip looks like this as specified in "<Trip>". useCollection is a hook provided by squid

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        //! This is a function used inside map
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const countryNamess = data.map((country: any) => country.name.common);
        setCountries(countryNamess);
      })
      .catch((error) => console.error(error));
  }, []);

  const addTrip = () => {
    const tripId = crypto.randomUUID()
    //! This is the way provided by squid to insert data
    tripsCollection.doc(tripId).insert({
        id: tripId,
        country,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        notes: []
    })
  }

  return (
    <div className="trip-container">
      <h3>Add Trip</h3>
      <div className="trip-form">
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="" disabled>Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <button onClick={addTrip}>Add Trip</button>
      </div>
    </div>
  );
}

export default AddTrip;
