import React, { useState } from 'react';
import './App.css';
import AirportChooser from './components/dropdowns/AsyncDataChooser';
import Airport from './components/Airport';
const getData = async () => {
  const airports = await import('./configs/airports.js');
  return airports['default'];
};
function App() {
  const [label, setLabel] = useState('Choose Airport');
  return (
    <div className="App">
      <div className="airport-container">
        <AirportChooser
          getAsyncData={getData}
          keyExtractor={item => item.code}
          itemRender={item => <Airport name={item.name} city={item.city} code={item.code} code={item.country} />}
          label={label}
          onSelect={item => setLabel(item.name)}
        />
        <input />

      </div>
    </div>
  );
}

export default App;
