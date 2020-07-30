const User = require('../models/user.model.js');

// Create and Save a new user
module.exports.create = (req, res, next) => {
    // Validate request
    if(!req.body.password || !req.body.username) {
        return res.status(400).send({
            message: "Username and Password can not be empty"
        });
    }

    // Create a user
    const user = new User({
        username: req.body.username, 
        password: req.body.password,
        name: req.body.name,
        rollno: req.body.rollno,
        utype: "user" // or admin
    });

    // Save user in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user."
        });
    });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res, next) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Find a single user with a userId
exports.findOne = (req, res, next) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res, next) => {
     // Validate Request
    //  if(!req.body.content) {
    //     return res.status(400).send({
    //         message: "user content can not be empty"
    //     });
    // }

    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.userId, {
        username: req.body.username, 
        password: req.body.password,
        name: req.body.name,
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res, next) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        res.send({message: "user deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};

exports.login = (req,res, next) => {
    console.log("output1");
    let promise = User.findOne({username:req.body.username}).exec();
    console.log("output2");
    promise.then(function(user){
     if(user) {
       if(user.isValid(req.body.password)){
           // generate token
        //    let token = jwt.sign({username:doc.username},'secret', {expiresIn : '3h'});
        console.log("output3");    
        let token = {"username":req.body.username,"password":req.body.password};
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
 