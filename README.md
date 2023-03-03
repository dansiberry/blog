# Blog: Instructions for running the project 

The app is already built in the /dist/ directory as static assets. To run it, navigate to the /dist/ directory in terminal and run a web server to serve the static assets.  
For example, this can be done on Mac with the following command: 
```sh
python -m SimpleHTTPServer 8000
```
Visit the app in the browser at http://localhost:8000/

The app will use the API endpoint of the hosted backend, found at https://danielsiberry.com/api . 
For example, the default articles response can be found at https://danielsiberry.com/api/articles.json

## Running the app for development

Node v18.14.1 is required for running the app with Vite. The node modules are installed for that version.
```sh
npm run dev
```

In development, API calls are made to localhost:8080/api
To run the backend locally, please see readme file in that backend repo.

## Building the app 

```sh
npm run build
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)
This runs the interactive end-to-end tests against the Vite development server.

```sh
npm run test:e2e:dev
```


