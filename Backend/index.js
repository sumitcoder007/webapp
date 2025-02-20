const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connect = require('./config/connection');
const authRoutes = require('./routes/Authroutes');
const productRoutes = require('./routes/ProductRoutes');
// const ensureAuthenticated = require('../middelware/Auth');
const cors = require('cors');
const ensureAuthentication = require('./middelware/Auth');

require('dotenv').config();

const PORT = process.env.PORT || 8080

app.connect;

//use middelware 
app.use(bodyParser.json()); // featch data from the frondend like email, name etc
app.use(cors());  // to allow to feach api data different port like 3000 etc 
app.use('/api/v1/auth', authRoutes);

app.use('/api/v1/products',productRoutes);


app.get('/home', (req,res)=>{
    res.send("Welcome To Home");
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
});