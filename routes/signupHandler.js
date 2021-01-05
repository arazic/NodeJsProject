var express = require("express");
var router = express.Router();
const userOperation= require('./utils/userUtil')

// sign up at the first time
router.post('/signUp', async (req, res,next) => {
    if(req.body!= null && userOperation.validate(req.body)){
        let user= await userOperation.existUser(req.body.name);
        if(!user){
            const new_user= await userOperation.createUser(
                req.body.name,
                req.body.password,
                req.body.age,
                req.body.city);
            if(new_user){
                res.status(200).send({new_user: new_user});
            }    
        }else{
            let err = new Error("user alredy exist")
            err.status = 400
            next(err);
        }
    }
    else{
        let err = new Error("Invalid sign Up user detailes")
        err.status = 400
        next(err);
    }
});

module.exports = router;