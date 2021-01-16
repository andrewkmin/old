# armsocial-frontend

This repository contains the front-end of armsocial.

## Getting started

- Open the terminal and run `yarn install`
- Create a `.env` file and update it as follows

```js
REACT_APP_API_ENDPOINT=localhost:3001 # Or api-armsocial-dev.herokuapp.com
NODE_ENV=development
```

- Open up the terminal and type `yarn start` to start the app.

## Building a production optimized build

- Open up the terminal and type `yarn build`
- After that type `npx serve -s build` and visit the IP that it gives you
