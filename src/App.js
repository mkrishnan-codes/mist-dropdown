import React, { useState } from 'react';
import './App.scss';
import AirportChooser from './components/dropdowns/AsyncDataChooser/AsyncDataChooser';
import Airport from './components/renderers/Airport';
// import Airport2 from './components/renderers/Airport2'
import Loader from './components/loaders/Loader'
const getData = async () => {
  const airports = await import('./configs/airports.js');
  return airports['default'];
};
const getOtherData = async () => {
  const airports = await import('./configs/airports-2.js');
  return airports['default'];
};

function App() {
  const initialLabel = 'Choose Airport'
  const [label, setLabel] = useState(initialLabel);
  const [large, setLarge] = useState(false);
  return (
    <div className="App">
      <h2>Airport choser</h2>
      <div className="airport-container">
        {!large ? <AirportChooser
          className="airport-chooser"
          getAsyncData={getData}
          keyExtractor={item => item.code}
          itemRender={item => <Airport name={item.name} city={item.city} country={item.country} code={item.code} />}
          label={label}
          onSelect={item => setLabel(`${item.code} (${item.city})`)}
          filterFn={(item, filterValue) => item['city'].toLowerCase().search(filterValue.replace(/\\/g, "\\\\")) > -1}
          loaderRenderFn={() => <Loader />}
        />
          :
          <AirportChooser
           
            getAsyncData={getOtherData}
            keyExtractor={item => item.code}
            itemRender={item => `${item.name}`}
            label="Select airport"
            onSelect={item => setLabel(`${item.name} - ${item.code}`)}
            filterFn={(item, filterValue) => item['name'].toLowerCase().search(filterValue.replace(/\\/g, "\\\\")) > -1}
            loaderRenderFn={() => <Loader />}
          />
        }
        <div className="sel-item">
          <div>
            Try another data
          </div>
          <input type="checkbox" value={large} onChange={(e) => setLarge(e.target.checked)} />
        </div>
        <div className="sel-item">
          <div>
            Selected Item
          </div>
          <input className="sel-inp" value={`${label !== initialLabel ? label : ``}`} />
        </div>

      </div>
    </div>
  );
}

export default App;
