const cors = require('cors')
const express = require('express');
const {Model} = require('./Models/index');
const dotenv = require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5001;

app.use(cors())
app.use(express.json())


app.get('/getbundle',(req,res) => {
    console.log('called....!');
    res.download('testasset-Android');
})

// testing
app.get('/test',(req,res) => {
    res.status(200).json({"message":"You are ready to go!"});
})

// create new user
app.post('/createuser',(req,res) => {
    console.log(req.body);

    const user = new Model.User({
        email: req.body.email,
        password: req.body.password
    })

    user.save()
        .then(res => console.log("Saved: "+res))
        .catch(err => console.log(err));
    res.status(200).json({"message":"User Created!"});
});


// user login
app.post('/userlogin',(req,res) => {

    Model.User.findOne( {"email": req.body.email} )
        .then(content => {
            // console.log("EXT : "+content);

            if(!content){
                res.status(401).json( {"message":"No user with this email!"});
            }

            if(content["password"] === req.body["password"]){
                res.status(200).json({"userid":content["_id"]});  
            }else{
                res.status(403).json({"message":"Wrong password!"});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({"message":"ERROR!"});
        });
        
});



// adding user exp data
app.post('/userdata' , (req,res) => {

    console.log(req.body);

    // console.log(req.body.values.expValues.row)

    //  check for existing user exp data
    Model.UserExp.findOneAndUpdate(

        {"userid":req.body.userid},
        {
            "values":{
                "rodInfo":{
                    "length":req.body.values.rodInfo.length,
                    "diameter":req.body.values.rodInfo.diameter
                },
                "expValues":{
                    "row01": {  torque:req.body.values.expValues.row01.torque  , 
                                angleOfTwist: req.body.values.expValues.row01.angleOfTwist
                            },
                    "row02": {  torque:req.body.values.expValues.row02.torque  , 
                                angleOfTwist: req.body.values.expValues.row02.angleOfTwist
                            },
                    "modulusG": req.body.values.expValues.modulusG
                }
            }
        }
    ) 
        .then(content => {
            console.log("TESTING");
            if(content)
                res.status(200).json({"message":`Updated user ID: ${req.body.userid} data!`});
            else
                // creating new data of this account
                {
                    const userexp = new Model.UserExp({
                        userid:req.body.userid,
                        name:"testing",
                        college:"testing",
                        branch:"testing",
                        values:{
                            rodInfo:{
                                length:req.body.values.rodInfo.length,
                                diameter:req.body.values.rodInfo.diameter
                            },
                            expValues:{
                                row01: {  torque:req.body.values.expValues.row01.torque  , 
                                        angleOfTwist: req.body.values.expValues.row01.angleOfTwist },
                                row02: {  torque:req.body.values.expValues.row02.torque  , 
                                        angleOfTwist: req.body.values.expValues.row02.angleOfTwist },
                                modulusG : req.body.values.expValues.modulusG
                            }
                        }
                    });
                
                    userexp.save()
                        .then(content => {
                            
                            console.log(content);
                        
                            res.status(200).json({"message":`User ${req.body.userid} data has been SAVED!`});
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(400).json({"message":"error in saving data"});
                        });
                }

        })
        .catch(err => {
            console.log(err);
            res.status(200).json({"message":`NO data for user ID: ${req.body.userid}`});
        });
})



// get user exp data using userid
app.get('/userdata/:id',(req,res) => {
   
    Model.UserExp.findOne({"userid":req.params.id})
        .then(content => {

            if(!content){
                res.status(401).json( {"message":`No user with ${req.params.id} ID`});
            }

            console.log("GET /"+req.params.id);
            res.json(content).status(200);
        })
        .catch(err => {
            console.log(err);
            res.status(404).send( JSON.stringify({"message":"ERROR"}));
        })

});



app.listen(PORT,()=>{
    console.log(`Listening on http://localhost:${PORT}`);
});