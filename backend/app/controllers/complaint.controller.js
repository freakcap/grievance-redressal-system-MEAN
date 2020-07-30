const Complaint = require('../models/complaint.model.js');

// Create and Save a new complaint
module.exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Complaint content can not be empty"
        });
    }

    // Create a Complaint
    const complaint = new Complaint({
        title: req.body.title || "Untitled", 
        content: req.body.content,
        user: req.body.user,
        ctype: req.body.type,
        status: "0",
        solution: " "
    });

    // Save Complaint in the database
    complaint.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the complaint."
        });
    });
};

// Retrieve and return all complaints from the database.
exports.findAll = (req, res) => {
    Complaint.find()
    .then(complaints => {
        res.send(complaints);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving complaints."
        });
    });
};

// Find a single complaint with a complaintId
exports.findOne = (req, res) => {
    Complaint.findById(req.params.complaintId)
    .then(complaint => {
        if(!complaint) {
            return res.status(404).send({
                message: "Complaint not found with id " + req.params.complaintId
            });            
        }
        res.send(complaint);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Complaint not found with id " + req.params.complaintId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving complaint with id " + req.params.complaintId
        });
    });
};

// Update a complaint identified by the complaintId in the request
exports.update = (req, res) => {
     // Validate Request
     if(!req.body.content) {
        return res.status(400).send({
            message: "Complaint content can not be empty"
        });
    }

    // Find Complaint and update it with the request body
    Complaint.findByIdAndUpdate(req.params.complaintId, {
        content: req.body.content,
        status: req.body.status,
        solution: req.body.solution
    }, {new: true})
    .then(complaint => {
        if(!complaint) {
            return res.status(404).send({
                message: "complaint not found with id " + req.params.complaintId
            });
        }
        res.send(complaint);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "complaint not found with id " + req.params.complaintId
            });                
        }
        return res.status(500).send({
            message: "Error updating complaint with id " + req.params.complaintId
        });
    });
};

// Delete a complaint with the specified complaintId in the request
exports.delete = (req, res) => {
    Complaint.findByIdAndRemove(req.params.complaintId)
    .then(complaint => {
        if(!complaint) {
            return res.status(404).send({
                message: "complaint not found with id " + req.params.complaintId
            });
        }
        res.send({message: "complaint deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "complaint not found with id " + req.params.complaintId
            });                
        }
        return res.status(500).send({
            message: "Could not delete complaint with id " + req.params.complaintId
        });
    });
};
