const express = require ('express');
const path = require ('path');
const morgan = require ('morgan');
const dotenv = require ('dotenv');
const hbs = require('express-handlebars');
const app = express();
const mongoose = require("mongoose");
const authRoutes = require("./routes/authroutes");
const Handlebars = require('handlebars');

//Set view engine
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const handlebars = hbs.create({ helpers: {
    eq: function(a, b) {
      return a === b;
    },
    not_eq: function(a, b) {
      return a !== b;
    },
    gt: function(a, b) {
      return a > b;
    }
  },
  extname: '.hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
});

app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

//configure environment variables
dotenv.config ({path: '.env'});

//Middleware
app.use(morgan("dev"));
app.use(express.static("./public"))
app.use(authRoutes);
app.use(express.json());


//Database and Server connection
mongoose.connect(process.env.DB_URI)
    .then((result) => {
      //Start server
      console.log("Connected to database")
      const port = process.env.PORT || 8080

      app.listen(port, ()=> {
        console.log(`App listening at http://localhost:${port}`);
      });
    })
      .catch((err) => console.log(err))