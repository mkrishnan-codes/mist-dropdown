import React, { useState } from 'react';
import './App.scss';
import AirportChooser from './components/dropdowns/AsyncDataChooser/AsyncDataChooser';
import Airport from './components/renderers/Airport';
import Loader from './components/loaders/Loader'
const getData = async () => {
  const airports = await import('./configs/airports.js');
  return airports['default'];
};
function App() {
  const initialLabel = 'Choose Airport'
  const [label, setLabel] = useState(initialLabel);
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
          filterFn={(item, filterValue) => item['city'].toLowerCase().search(filterValue.replace(/\\/g, "\\\\")) > -1}
          loaderRenderFn={() => <Loader />}
        />
        <input value={`${label !== initialLabel ? label : ``}`} />

      </div>
    </div>
  );
}

export default App;
