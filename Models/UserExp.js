const mongoose = require('mongoose');


const RodInfo = new mongoose.Schema({
    "length":{type:Number,required:true},
    "diameter":{type:Number,required:true}
})

const RowInTable = new mongoose.Schema({
    "torque":{type:Number,required:true} ,
    "angleOfTwist": {type:Number,required:true}
})

const ExpValues = new mongoose.Schema({
    "row01":{type:RowInTable},
    "row02":{type:RowInTable},
    "modulusG":{type:Number,required:true}
})

const Values = new mongoose.Schema({
    "rodInfo":{type:RodInfo},
    "expValues":{type:ExpValues}
})

const UserExpSchema = new mongoose.Schema({
    "userid":{type:String,required:true},
    "name":{type:String,required:true},
    "college":{type:String,required:true},
    "branch":{type:String,required:true},
    "values":{type:Values,required:true}   
}, {timestamps:true});


module.exports =  mongoose.model("UserExp", UserExpSchema);
