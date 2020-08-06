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
  try {
    const response = await fetch('https://manu-large-data.herokuapp.com/get-xxl');
    return response.json();
  } catch (e) {
    console.log(e)
    return [];
  }

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
          key="small"
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
            key="large"
            getAsyncData={getOtherData}
            keyExtractor={item => item.id}
            itemRender={item => `${item.words}`}
            label="Select words"
            onSelect={item => setLabel(`${item.words}`)}
            filterFn={(item, filterValue) => item['words'].toLowerCase().search(filterValue.replace(/\\/g, "\\\\")) > -1}
            loaderRenderFn={() => <Loader />}
          />
        }
        <div className="sel-item">
          <div>
            Try large data from api
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
