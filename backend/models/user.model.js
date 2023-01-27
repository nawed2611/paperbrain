const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    papers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paper'
    }]
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', User);
