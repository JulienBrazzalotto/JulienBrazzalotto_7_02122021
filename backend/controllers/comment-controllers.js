const Comment = require('../models/comment-models');

exports.createComment = (req, res, next) => {
    Comment.create({
            content: req.body.content,
            user_id: req.body.user_id,
            post_id: req.body.post_id
        })
        .then(() => res.status(201).json({message: 'Commentaire créé !'}))
        .catch( error => res.status(400).json({error}));
};

exports.modifyComment = (req, res, next) => {
    Comment.update({ content: req.body.content }, { where: { id: req.params.id } })

        .then(() => res.status(200).json({message : 'Commentaire modifié !'}))
        .catch( error => res.status(400).json({error}));
};

exports.deleteComment = (req, res, next) => {
    Comment.destroy({ where: { id: req.params.id } })

        .then(() => res.status(200).json({message : 'Commentaire supprimé !'}))
        .catch( error => res.status(400).json({error}));
};

exports.getAllComments = (req, res, next) => {
    Comment.findAll({order: [["id", "ASC"]]})

    .then( comment => res.status(200).json(comment))
    .catch( error => res.status(400).json({error}))
};

exports.getOneComment = (req, res, nest) => {
    Comment.findOne({ where: { id: req.params.id }})
    .then( comment => res.status(200).json(comment))
    .catch( error => res.status(400).json({error}))
}