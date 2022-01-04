const Post = require('../models/post-models');
const User = require('../models/user-models');
const fs = require('fs');
const { post } = require('../routes/post-routes');

exports.createPost = (req, res, next) => {
    if (req.file) {
        Post.create({
            title: req.body.title,
            content: req.body.content,
            image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            user_id: req.body.user_id
        })
        .then(() => res.status(201).json({message: 'Post créé !'}))
        .catch( error => res.status(400).json({error}));
    } else {
        Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.body.user_id
        })
        .then(() => res.status(201).json({message: 'Post créé !'}))
        .catch( error => res.status(400).json({error}));
    }
    
};

exports.modifyPost = (req, res, next) => {
    if (req.file) {
        Post.findOne({ where: { id: req.params.id }})
        .then(post => {
            const filename = post.image.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                const modifyPost = {
                title: req.body.title,
                content: req.body.content,
                image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            };
    
                Post.update(modifyPost , { where: { id: req.params.id } })
            
                    .then(() => res.status(200).json({message : 'Post modifié !'}))
                    .catch( error => res.status(400).json({error}));
        })})
    } else {
        const modifyPost = {
        title: req.body.title,
        content: req.body.content,
        };

        Post.update(modifyPost , { where: { id: req.params.id } })

            .then(() => res.status(200).json({message : 'Post modifié !'}))
            .catch( error => res.status(400).json({error}));
    }
    
};

exports.deletePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id }})
        .then(post => {
            if (post.image != null) {
                const filename = post.image.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Post.destroy({ where: { id: req.params.id } })

                    .then(() => res.status(200).json({message : 'Post supprimé !'}))
                    .catch( error => res.status(400).json({error}));
                })
            
        
            } else {
                Post.destroy({ where: { id: req.params.id } })

                .then(() => res.status(200).json({message : 'Post supprimé !'}))
                .catch( error => res.status(400).json({error}));
            }
        })
}

exports.getAllPosts = (req, res, next) => {
    
    Post.findAll({ 
        include: [{
            model : User
        }],
        order: [["id", "DESC"]]})

    .then( post => res.status(200).json(post))
    .catch( error => res.status(400).json({error}))
};

exports.getOnePost = (req, res, nest) => {
    Post.findOne({
        include: [{
            model : User
        }], 
        where: { id: req.params.id }})
    .then( post => res.status(200).json(post))
    .catch( error => res.status(400).json({error}))
}

