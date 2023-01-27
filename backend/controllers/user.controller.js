const User = require('../models/user.model');
const Paper = require('../models/paper.model');

// Create and Save a new User
const addPaper = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: 'User content can not be empty'
        });
    }

    // check if user exists
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {

                // user exists, check if paper exists
                Paper.findOne({ link: req.body.paperURL })
                    .then(paper => {
                        if (paper) {
                            // paper exists, update paper
                            Paper.findOneAndUpdate({
                                link: req
                                    .body.paperURL
                            }, {
                                title: req.body.paperName,
                                abstract: req.body.paperAbstract,
                                link: req.body.paperURL,
                                starred: req.body.starred,
                                user: user._id
                            }, { new: true })
                                .then(paper => {
                                    if (!paper) {
                                        return res.status(404).send({
                                            message: 'Paper not found with id ' + req.params.paperId
                                        });
                                    }
                                    res.send(paper);
                                }
                                ).catch(err => {
                                    if (err.kind === 'ObjectId') {
                                        return res.status(404).send({
                                            message: 'Paper not found with id ' + req.params.paperId
                                        });
                                    }
                                    return res.status(500).send({
                                        message: 'Error updating paper with id ' + req.params.paperId
                                    });
                                }
                                );
                        } else {
                            // paper does not exist, create paper
                            const paper = new Paper({
                                title: req.body.paperName,
                                abstract: req.body.paperAbstract,
                                link: req.body.paperURL,
                                starred: req.body.starred,
                                user: user._id
                            });
                            paper.save()
                                .then(data => {
                                    res.send(data);
                                })
                                .catch(err => {
                                    res.status(500).send({
                                        message: err.message || 'Some error occurred while starring the Paper.'
                                    });
                                });
                        }
                    })
                    .catch(err => {
                        if (err.kind === 'ObjectId') {
                            return res.status(404).send({
                                message: 'Paper not found with id ' + req.params.paperId
                            });
                        }
                        return res.status(500).send({
                            message: 'Error retrieving paper with id ' + req.params.paperId
                        });
                    });
            } else {
                // user does not exist, create user and paper
                const user = new User({
                    email: req.body.email,
                    username: req.body.username
                });
                user.save()
                    .then(data => {
                        const paper = new Paper({
                            title: req.body.paperName,
                            abstract: req.body.paperAbstract,
                            link: req.body.paperURL,
                            starred: req.body.starred,
                            user: data._id
                        });
                        paper.save()
                            .then(data => {
                                res.send(data);
                            })
                            .catch(err => {
                                res.status(500).send({
                                    message: err.message || 'Some error occurred while starring the Paper.'
                                });
                            });
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || 'Some error occurred while creating the User.'
                        });
                    });
            }
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'User not found with email ' + req.params.email
                });
            }
            return res.status(500).send({
                message: 'Error retrieving user with email ' + req.params.email
            });
        });
}

// Retrieve and return all users from the database.
const findAll = (req, res) => {
    User.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving users.'
            });
        });
}

// Find a single user with a userId
const findOne = (req, res) => {
    // find user by email
    User.findOne({ email: req.params.email })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: 'User not found with email ' + req.params.email
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'User not found with email ' + req.params.email
                });
            }
            return res.status(500).send({
                message: 'Error retrieving user with email ' + req.params.email
            });
        });
}

// Update a user identified by the userId in the request
const update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: 'User content can not be empty'
        });
    }

    // Find user by id and update it with the request body
    User.findOne({ email: req.params.email }
        , {
            $set: {
                paperName: req.body.paperName,
                paperURL: req.body.paperURL,
                paperAbstract: req.body.paperAbstract,
                starred: req.body.starred
            }
        }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: 'User not found with email ' + req.params.email
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'User not found with email ' + req.params.email
                });
            }
            return res.status(500).send({
                message: 'Error updating user with email ' + req.params.email
            });
        });
}


// Path: backend/routes/user.routes.js
module.exports = {
    addPaper,
    findAll,
    findOne,
    update,
}