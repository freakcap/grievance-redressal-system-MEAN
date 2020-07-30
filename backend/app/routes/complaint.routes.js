var jwt = require('jsonwebtoken');

module.exports = (app) => {

    const complaints = require('../controllers/complaint.controller.js');
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

    // Create a new Complaint
    app.post('/complaints', verifyToken, complaints.create);

    // Retrieve all Complaints
    app.get('/complaints', verifyToken, complaints.findAll);

    // Retrieve a single Complaint with complaintId
    app.get('/complaints/:complaintId', complaints.findOne);

    // Update a Complaint with complaintId
    app.put('/complaints/:complaintId', verifyToken, complaints.update);

    // Delete a Complaint with complaintId
    app.delete('/complaints/:complaintId', verifyToken, complaints.delete);
}