//require express (glue)
const express = require('express');
//require api routes
const routes = require('./controllers');
// const routes = require('./routes');
//require sequelize connections
const sequelize = require('./config/connections');
//creating a variable for the express
const app = express();
//setting up the port
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
