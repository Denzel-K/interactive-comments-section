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
    // ,
    // length: function(array){
    //   return array.length;
    // }
  },
  extname: '.hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
});

// Handlebars.registerHelper('length', function(array) {
//   return array.length;
// });

app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

//configure environment variables
dotenv.config ({path: '.env'});

//Database connection
mongoose.connect(process.env.DB_URI)
    .then((result) => console.log("Connected to database"))
      .catch((err) => console.log(err))

//Middleware
app.use(morgan("dev"));
app.use(express.static("./public"))
app.use(authRoutes);
app.use(express.json());

//Start server
const port = process.env.PORT || 8080

app.listen(port, ()=> {
  console.log(`App listening at http://localhost:${port}`);
});
