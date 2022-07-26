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
const exph = require('express-handlebars');
//importing path
const path = require('path');
const handlebars = exph.create({helper});
const session = require('express-session');
const sequelizeStore = require('connect-session-sequelize') (session.Store);


//setting up the port
const PORT = process.env.PORT || 3001;
const sess = {
  secret: 'secret secret',
  cookie: {
    maxAge: 24000
  },
  resave: false,
  saveUninitialized: true,
  store: new sequelizeStore ({
    db:sequelize
  })

}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sess));
app.use(express.static(path.join(__dirname, "public")));
app.engine("handlebars", handlebars.engine);
app.set('view engine', 'handlebars')
// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
