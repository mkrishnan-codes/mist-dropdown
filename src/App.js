import React, { useState } from 'react';
import './App.scss';
import AirportChooser from './components/dropdowns/AsyncDataChooser/AsyncDataChooser';
import Airport from './components/renderers/Airport';
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
          className="airport-chooser"
          getAsyncData={getData}
          keyExtractor={item => item.code}
          itemRender={item => <Airport name={item.name} city={item.city} country={item.country} code={item.code} />}
          label={label}
          onSelect={item => setLabel(`${item.code} (${item.city})`)}
        />
        <input value={label} />

      </div>
    </div>
  );
}

export default App;
