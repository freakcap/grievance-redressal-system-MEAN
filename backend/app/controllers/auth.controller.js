const User = require('../models/user.model.js');
var jwt = require('jsonwebtoken');

exports.login = (req,res) => {
    console.log("output1");
    let promise = User.findOne({username:req.body.username}).exec();
    console.log("output2");
    promise.then(function(user){
     if(user) {
       if(user.isValid(req.body.password)){
           // generate token
        let token = jwt.sign({username:doc.username},'secret', {expiresIn : '3h'});
        console.log("output3");    
        // let token = {"username":req.body.username,"password":req.body.password};
           return res.status(200).json(token);
 
       } else {
         return res.status(501).json({message:' Invalid Credentials'});
       }
     }
     else {
       return res.status(501).json({message:'User is not registered.'});
     }
    });
 
    promise.catch(function(err){
      return res.status(501).json({message:'Some internal error'});
    });
}
 