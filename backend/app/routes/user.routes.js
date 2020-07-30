var jwt = require('jsonwebtoken');

module.exports = (app) => {
    const users = require('../controllers/user.controller.js');
    var decodedToken='';
    function verifyToken(req,res,next){
      let token = req.query.token;

      jwt.verify(token,'secret', function(err, tokendata){
        if(err){
          return res.status(400).json({message:' Unauthorized request'});
        }
        if(tokendata){
          decodedToken = tokendata;
          next();
        }
      })
    }
    // Create a new User
    app.post('/users', users.create);

    // Retrieve all users
    app.get('/users', verifyToken, users.findAll);

    // Retrieve a single user with userId
    app.get('/users/:userId', verifyToken, users.findOne);

    // Update a user with userId
    app.put('/users/:userId', verifyToken, users.update);

    // Delete a user with userId
    app.delete('/users/:userId', verifyToken, users.delete);

}


