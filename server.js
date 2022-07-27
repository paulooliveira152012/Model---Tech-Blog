//require express (glue)
const express = require('express');
//require api routes
const routes = require('./controllers');
// const routes = require('./routes');
//require sequelize connections
const sequelize = require('./config/connections');
const helper = require('./utils/helpers');
//creating a variable for the express
const app = express();
//require express.handlebars
const exphbs = require('express-handlebars');
//importing path
const path = require('path');
const handlebars = exphbs.create({helper});
const session = require('express-session');
const sequelizeStore = require('connect-session-sequelize')(session.Store);


//setting up the port
const PORT = process.env.PORT || 3001;
const sess = {
  secret: 'secret secret',
  cookie: {
    maxAge: 240000
  },
  resave: false,
  saveUninitialized: true,
  store: new sequelizeStore ({
    db:sequelize
  })

}
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.engine("handlebars", handlebars.engine);
app.set('view engine', 'handlebars')
// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});


//problem with the session

//make sure I'm requirering everything properly
//make sure all of the variables match
//make sure routes only uses either async OR .then
//when using sequelize store, use capital for classes (commom practice)

//last case scenerio --> get rid of auth
//go through the module on the sessions portion
//console log stuff to make sure each line is working properly
  //console.trace 