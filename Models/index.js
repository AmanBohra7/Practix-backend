const User = require('./User');
const UserExp = require('./UserExp');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();


// const uri = 'mongodb://localhost:27017/practix';
const uri = process.env.ATLAS_URI

const Connection = mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true,useFindAndModify:false}).then( () => {
    console.log('Connected to database ')
})
.catch( (err) => {
    console.error(`Error connecting to the database. \n${err}`);
})
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB database connection established successfully!")
});

let Model = {
    Connection,
    User,
    UserExp
}

module.exports = {Model};