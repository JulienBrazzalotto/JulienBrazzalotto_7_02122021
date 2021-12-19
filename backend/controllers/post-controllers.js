
const Post = require('../models/post-models');

exports.createPost = (req, res, next) => {
    Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.body.user_id
        })
        .then(() => res.status(201).json({message: 'Post créé !'}))
        .catch( error => res.status(400).json({error}));
};

exports.modifyPost = (req, res, next) => {
    Post.update({ title: req.body.title }, { where: { id: req.params.id } })

        .then(() => res.status(200).json({message : 'Post modifié !'}))
        .catch( error => res.status(400).json({error}));
};

exports.deletePost = (req, res, next) => {
    Post.destroy({ where: { id: req.params.id } })

        .then(() => res.status(200).json({message : 'Post supprimé !'}))
        .catch( error => res.status(400).json({error}));
};

exports.getAllPosts = (req, res, next) => {
    Post.findAll({order: [["id", "DESC"]]})

    .then( post => res.status(200).json(post))
    .catch( error => res.status(400).json({error}))
};

exports.getOnePost = (req, res, nest) => {
    Post.findOne({ where: { id: req.params.id }})
    .then( post => res.status(200).json(post))
    .catch( error => res.status(400).json({error}))
}
