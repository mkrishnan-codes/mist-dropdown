
[![Netlify Status](https://api.netlify.com/api/v1/badges/a510137b-f762-41c7-af99-9f116dfd28d2/deploy-status)](https://app.netlify.com/sites/mist-dropdown/deploys)

  

Deployed version - https://mist-dropdown.netlify.app/

  
  
  
  

[Dropdown Component source ](src/components/dropdowns/AsyncDataChooser/AsyncDataChooser.js)

  
## Usage example 


   

    <AirportChooser
    className="airport-chooser"
    getAsyncData={() => Promise.resolve([{ name: 'Manu', code: '1222' }, { name: 'Ram', code: '1324' }])}
    keyExtractor={item => item.code}
    itemRender={item =>  item.name}
    label={label}
    onSelect={item => setLabel(`${item.code}`)}
    filterFn={(item, filterValue) => item['name'].search(filterValue) > -1}
    loaderRenderFn={() =>  <Loader  />}
    
    />
    
About Props

    //  getAsyncData should be an async function to fetch data
    getAsyncData: PropTypes.func.isRequired,
    //  itemRender fn to render the dropdown list item
    itemRender: PropTypes.func.isRequired,
    // keyExtractor function for supply key to list items
    keyExtractor: PropTypes.func.isRequired,
    // optional button label, if not supplied default label 'Choose' will be shown
    label: PropTypes.string,
    // style attribute
    style: PropTypes.object,
    // on change function which will return selected object
    onChange: PropTypes.func
    //  className attribute passign into the base react 
    component
      className: PropTypes.string,
    //  Filter function which can filter the data array supplied in to the dropdown list
    // Function will return listitem, filterValue entered and should return a boolean value
        filterFn: PropTypes.func,
    //  Loader function shown while loading async data, default will be 'Loading..' text
    loaderRenderFn: PropTypes.func

  
  
  
  
  ## About the project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

  

## Available Scripts

  

In the project directory, you can run:

  

### `yarn start`

  

Runs the app in the development mode.<br  />

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

  

The page will reload if you make edits.<br  />

You will also see any lint errors in the console.

  

### `yarn test`

  

Launches the test runner in the interactive watch mode.<br  />

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

  

### `yarn build`

  

Builds the app for production to the `build` folder.<br  />

It correctly bundles React in production mode and optimizes the build for the best performance.

  

The build is minified and the filenames include the hashes.<br  />

Your app is ready to be deployed!

  

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.