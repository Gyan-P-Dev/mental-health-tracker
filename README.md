# Getting Started with Create React App

# Key Technologies Used in the Application:

In this application, the backend is built using Node.js and Express.js, with SQLite as the database for data storage and Socket.IO for real-time, bi-directional communication. The frontend is developed using React.js, styled with Tailwind CSS, and includes additional libraries like react-oauth/google for Google login functionality, Recharts for interactive charting, Mantine , and Socket.IO for real-time updates from the server.


## Available Scripts

In the project directory, you can run:
### `npm install`
run this commond in project repository for install the require dependencies.

### `npm start`

please run this command in '/frontend' directory.
Runs the frontend app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


### `node index.js`
in the "/backend" project directory you can run for the backend server


### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.



`key points`

`Google Login`
1. Users will first log in using their Google account.

`Redirect to Daily Log Page`
2. After logging in, users will be redirected to the daily log page.

`Initial Chart State`
3. Initially, the chart will display no data.

`Adding Log Data`
4. Users can add data to the chart by clicking the "Add New Log" button or "Add Log Detail".

`Chart Updates via WebSocket`
5. Chart data is dynamically updated via WebSocket after adding new logs.

`Multiple Log Entries`
6. Users can continue to add more data to the chart using the "Add New Log" button.

`Timeframe Selection (Monthly/Weekly)`
7. Buttons labeled "Monthly" or "Weekly" are available above the chart to change the displayed timeframe.

`Dynamic Data Update`
8. Switching between Monthly and Weekly will update the chart to display data relevant to the selected timeframe.

`Identical Data on Timeframe Change`
9. If the chart data does not change when switching between Weekly and Monthly, it indicates that all data in the database has the same date.






