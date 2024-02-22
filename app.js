const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config(); // .env file
const port = 3000;
const bodyParser = require('body-parser');
const {connectDB} = require('./config/dbConnection');

// Utils
const {welcomeEmail} = require('./utils/emailTransporter');

// Models
const Clinet = require('./models/clients');

// static files
app.use(express.static( path.join(__dirname,'/public')));

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Body Barser
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    res.render('index.ejs', { title: 'Home' });
    }
);


app.post('/', (req, res) => {
    const { name, email, message } = req.body;

    try{
    // Connect to DB
    
    connectDB().then(()=> {
      // Save to DB
    const client = new Clinet({
        name,
        email,
        message
      });

      client.save()
      .then(result => {
        welcomeEmail(email, name);
        res.redirect('/');
      })
    })
    

    
    
    console.log(name , email , message);

    } catch (error) {
        redirect('/');
        console.log(error , 'Error in saving to DB');
    }
  });


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
