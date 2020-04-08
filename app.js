const express = require('express');
const app = express();
const morgan = require('morgan'); //Middleware
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
//express-validator previously version 6.4.0

const mongoose = require('mongoose');
//const MongoClient = require('mongodb').MongoClient;

const dotenv = require('dotenv');
dotenv.config(); //This line was causing the error
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
// require('dotenv').config({ path: require('find-config')('.env') });

const port = process.env.PORT || 8080;


//db connection

//console.log(process.env.PORT);

mongoose.connect(   //First parameter is URI, second is object (with nested key value pairs), optional third is function.)
    process.env.URI, 
    {useNewUrlParser: true,
    useUnifiedTopology: true}
  ).then(() => {
      console.log('DB Connected');
  });
   
  mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
  });


/*
Previously:
const postRoutes = require('./routes/post');
app.get('/', postRoutes.getPosts)
was used to link to the post.js file.
Now object destructuring can get the exact object of the file:
*/

//Bring in routes using object destructuring.
const postRoutes = require('./routes/post');

/*
const myOwnMiddleware = (req, res, next) => {
    console.log("middleware applied");
    next(); //Used to let application proceed after executing middleware.
    //NodeJS uses event-loop and needs callback to pass on control.
    //Without next() the page never finishes loading.
};
*/


//Middleware-This can be used for authentication
app.use(morgan("dev"));
//app.use(myOwnMiddleware);
app.use(bodyParser.json());
app.use(expressValidator());
app.use('/', postRoutes)

app.listen(port, () => {console.log(`A NodeJS API is listening on port: ${port}`)});