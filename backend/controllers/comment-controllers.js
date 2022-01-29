const Comment = require('../models/comment-models');
const Post = require('../models/post-models');
const User = require('../models/user-models');
const jwt = require('jsonwebtoken');

exports.createComment = (req, res, next) => {
    Comment.create({
            content: req.body.content,
            user_id: req.body.user_id,
            post_id: req.body.post_id
        })
        .then(() => res.status(201).json({message: 'Commentaire créé !'}))
        .catch( error => res.status(400).json({error}));
};

exports.deleteComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId
    const role = decodedToken.role

    Comment.destroy({ where: { id: req.params.id } })

    .then((comment) => {
        if (userId === comment.user_id || role === 0 || role === 1) {
            res.status(200).json({message : 'Commentaire supprimé !'})

        } else {
            res.status(401).json({
                message: 'Requête non autorisée !'
            });
        }
    })
    .catch( error => res.status(400).json({error}));
};

exports.getPostComments = (req, res, next) => {
    Comment.findAll({
        where: {
        post_id : req.params.post_id
    },
        include: [{
        model : User,
    }],
        order: [["date", "ASC"]]})

    .then( comments => res.status(200).json(comments))
    .catch( error => res.status(400).json({error}))
};

exports.getAllComments = (req, res, next) => {
    Comment.findAll({
        include: [{
            model : User
        },{
            model : Post
        }],
        order: [["date", "ASC"]]
    })

    .then( comments => res.status(200).json(comments))
    .catch( error => res.status(400).json({error}))
};

exports.modifyComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const role = decodedToken.role

    Comment.findOne({ where: { id: req.params.id }})
        .then(() => {
            if (role === 1) {
                const modifyComment = {
                    moderate: req.body.moderate
                };

                Comment.update(modifyComment , { where: { id: req.params.id } })

                .then(() => res.status(200).json({message : 'Commentaire modifié !'}))
                .catch( error => res.status(400).json({error}));

            } else {
                res.status(401).json({
                    message: 'Requête non autorisée !'
                });
            }
        })
        .catch( error => res.status(400).json({error}))
};