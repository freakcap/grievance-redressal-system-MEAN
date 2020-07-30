const mongoose = require('mongoose');

const ComplaintSchema = mongoose.Schema({
    title: { type:String},
    content: { type:String},
    user: { type:String},
    ctype:{type:String},
    status: { type:String},
    solution: { type:String}
}, {
    timestamps: true
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
