

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
    loaderRenderFn={() =>  <img src="https://upload.wikimedia.org/wikipedia/commons/d/de/Ajax-loader.gif"  />}
    
    />
    
About Props
| attribute      | type     | required | default value | description                                                                   |
|----------------|----------|:--------:|---------------|-------------------------------------------------------------------------------|
| getAsyncData   | function |    yes   |               | should be an async function to fetch data                                     |
| itemRender     | function |    yes   |               | to render the dropdown list item                                              |
| keyExtractor   | function |    yes   |               | function for supply key to list items                                         |
| label          | string   | optional | Choose        | Button label                                                                  |
| style          | object   | optional | undefined     | inline styles to the container of dropdown                                    |
| onChange       | function | optional | undefined     | return selected object on this callback                                       |
| className      | string   | optional | undefined     | class attribute to the container of dropdown                                  |
| filterFn       | function | optional | undefined     |  listitem, filterValue entered will be args and should return a boolean value |
| loaderRenderFn | function | optional | Loading..     | Component shown while loading async data                                      |
  
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

***Few unit tests are added with jest and enzyme***



Launches the test runner in the interactive watch mode.<br  />

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

  

### `yarn build`

  

Builds the app for production to the `build` folder.<br  />

It correctly bundles React in production mode and optimizes the build for the best performance.

  

The build is minified and the filenames include the hashes.<br  />

Your app is ready to be deployed!

  

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
