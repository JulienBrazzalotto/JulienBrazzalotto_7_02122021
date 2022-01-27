const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordValidator = require('password-validator');
const emailValidator = require("email-validator");
const fs = require('fs');

const user = require('../models/user-models');

const schema = new passwordValidator();
schema
  .is().min(3)
  .is().max(50)
  .has().uppercase()
  .has().lowercase()
  .has().digits(1)



exports.signup = (req, res, next) => {
    if (!emailValidator.validate(req.body.email)){
        return res.status(401).json({message: 'Veuillez entrer une adresse email valide'});
    }

    if (!schema.validate(req.body.password)){
        return res.status(401).json({message: 'Le mot de passe doit avoir une longueur de 3 à 50 caractères avec au moins un chiffre, une minuscule, une majuscule !!!'});
    };

    
    bcrypt.hash(req.body.password, 10)
        .then(hash =>{
            user.create({
                nom: req.body.nom,
                prenom: req.body.prenom,
                email: req.body.email,
                password: hash,
                image: req.body.image,
                role: req.body.role
            })
                .then(() => res.status(201).json({message: 'Utilisateur créé !'}))
                .catch(() => res.status(400).json('Votre adresse email est déjà utilisé'));
            
        })
        .catch(error => res.status(500).json({error}));
}


exports.login = (req, res, next) => {
    user.findOne({ where: {email: req.body.email} })
    
        .then(user => {

            if (!user) {
                return res.status(401).json('Utilisateur non trouvé !');
            }
            
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {

                    if (!valid) {
                        return res.status(401).json('Mot de passe incorrect !');
                    }

                    res.status(200).json({
                        userId: user.id,
                        image: user.image,
                        role: user.role,
                        token: jwt.sign(
                            {userId: user.id,
                            role: user.role},
                            process.env.TOKEN, 
                            {expiresIn: '24h'} 
                        )
                    }); 
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

exports.delete = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId
    const role = decodedToken.role

    user.findOne({ where: { id: req.params.id }})
    .then(User => {
        if (userId === User.id || role === 0) {
            if (User.image != null) {
                const filename = User.image.split('/images/profiles/')[1];
                fs.unlink(`images/profiles/${filename}`, () => {
                    user.destroy({ where: { id: req.params.id } })

                    .then(() => res.status(200).json({message : 'Utilisateur supprimé !'}))
                    .catch( error => res.status(400).json({error}));
                })
            
        
            } else {
                user.destroy({ where: { id: req.params.id } })

                .then(() => res.status(200).json({message : 'Utilisateur supprimé !'}))
                .catch( error => res.status(400).json({error}));
            }
        } else {
            res.status(401).json({
                message: 'Requête non autorisée !'
            });
        }
    })
    .catch(error => res.status(400).json({error}));
}

exports.getOneUser = (req, res, next) => {
    user.findOne({ where: { id: req.params.id } })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json({error}));
};

exports.modifyUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId
    const role = decodedToken.role

    if (req.file) {

        user.findOne({ where: { id: req.params.id }})
        .then(User => {
            if (userId === User.id || role === 0) {
                if (User.image) {
                const filename = User.image.split('/images/profiles/')[1];
                fs.unlink(`images/profiles/${filename}`, () => {
                    const modifyUser = {
                        nom: req.body.nom,
                        prenom: req.body.prenom,
                        email: req.body.email,
                        image: `${req.protocol}://${req.get('host')}/images/profiles/${req.file.filename}`
                    };
        
                    user.update(modifyUser , { where: { id: req.params.id } })
                
                        .then(() => res.status(200).json({message : 'Utilisateur modifié !'}))
                        .catch( error => res.status(400).json({error}));
                })} else {
                    const modifyUser = {
                        nom: req.body.nom,
                        prenom: req.body.prenom,
                        email: req.body.email,
                        image: `${req.protocol}://${req.get('host')}/images/profiles/${req.file.filename}`
                    };
            
                    user.update(modifyUser , { where: { id: req.params.id } })
            
                        .then(() => res.status(200).json({message : 'Utilisateur modifié !'}))
                        .catch( error => res.status(400).json({error}));
                }
            } else {
                res.status(401).json({
                    message: 'Requête non autorisée !'
                });
            }
        })
        .catch( error => res.status(400).json({error}));

    } else {
        user.findOne({ where: { id: req.params.id }})
        .then(User => {
            if (userId === User.id || role === 0) {
                if (User.image && req.body.image === '') {
                    const filename = User.image.split('/images/profiles/')[1];
                    fs.unlink(`images/profiles/${filename}`, () => {
                        const modifyUser = {
                            nom: req.body.nom,
                            prenom: req.body.prenom,
                            email: req.body.email,
                            image: ''
                        };

                        user.update(modifyUser , { where: { id: req.params.id } })

                            .then(() => res.status(200).json({message : 'Utilisateur modifié !'}))
                            .catch( error => res.status(400).json({error}));
                    })
                } else {
                    const modifyUser = {
                        nom: req.body.nom,
                        prenom: req.body.prenom,
                        email: req.body.email,
                    };
            
                    user.update(modifyUser , { where: { id: req.params.id } })
            
                        .then(() => res.status(200).json({message : 'Utilisateur modifié !'}))
                        .catch( error => res.status(400).json({error}));
                }
            } else {
                res.status(401).json({
                    message: 'Requête non autorisée !'
                });
            }
        })
        .catch( error => res.status(400).json({error}));
    }
};

exports.AdminModifyUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const role = decodedToken.role

    if (role === 0) {
        const modifyUser = {
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            role: req.body.role
        };

        user.update(modifyUser, { where: { id: req.params.id }
            })
            .then(() => res.status(200).json({message : 'Utilisateur modifié !'}))
            .catch((error)=> res.status(400).json({error}));
    } else {
        res.status(401).json({
            message: 'Requête non autorisée !'
        });
    }
};

exports.AdminModifyPassword = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const role = decodedToken.role

    user.findOne({ where: { id: req.params.id }})
    .then(() => {
        if (role === 0) {
            if (!schema.validate(req.body.password)) {
                return res.status(401).json('Le nouveau mot de passe doit avoir une longueur de 3 à 50 caractères avec au moins un chiffre, une minuscule, une majuscule !!!')
            }

                bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const newPassword = {
                        password : hash
                    };

                    user.update(newPassword, { where: { id: req.params.id }})
                    .then(() => { res.status(201).json({ message: 'Mot de passe modifié !' })})
                    .catch(error => res.status(400).json({ error }));

                })
                .catch(error => res.status(500).json({ error }));
            
        } else {
            res.status(401).json({
                message: 'Requête non autorisée !'
            });
        }
    })
    .catch(error => res.status(500).json({ error }));
}

exports.getAllUsers = (req, res, next) => {
    user.findAll()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json(error))
};

exports.modifyPassword = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId

    user.findOne({ where: { id: req.params.id }})
    .then(User => {
        if (userId === User.id) {
            bcrypt.compare(req.body.oldPassword, User.password)
                .then(valid => {

                if (!valid) {
                    return res.status(401).json("Mot de passe actuel incorrect");
                }

                if (!schema.validate(req.body.password)) {
                    return res.status(401).json('Le nouveau mot de passe doit avoir une longueur de 3 à 50 caractères avec au moins un chiffre, une minuscule, une majuscule !!!')
                }

                    bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        const newPassword = {
                            password : hash
                        };

                        user.update(newPassword, { where: { id: req.params.id }})
                        .then(() => { res.status(201).json({ message: 'Mot de passe modifié !' })})
                        .catch(error => res.status(400).json({ error }));

                    })
                    .catch(error => res.status(500).json({ error }));
                })
                .catch(error => res.status(500).json({ error }));
        } else {
            res.status(401).json({
                message: 'Requête non autorisée !'
            });
        }
    })
    .catch(error => res.status(500).json({ error }));
}

