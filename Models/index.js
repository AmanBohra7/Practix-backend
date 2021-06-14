const User = require('./User');
const UserExp = require('./UserExp');
const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/practix';

const Connection = mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true,useFindAndModify:false})
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB database connection established successfully!")
})

let Model = {
    Connection,
    User,
    UserExp
}

module.exports = {Model};