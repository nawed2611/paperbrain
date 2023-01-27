const mongoose = require('mongoose');

const Paper = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    abstract: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    starred: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Paper', Paper);