const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordValidator = require('password-validator');
const emailValidator = require("email-validator");

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
                .catch(error => res.status(400).json({error}));
            
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
                        nom: user.nom,
                        prenom: user.prenom,
                        image: user.image,
                        role: user.role,
                        token: jwt.sign(
                            {id: user.id},
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
    user.destroy({ where: {id: req.params.id} })

        .then(() => res.status(201).json({message: 'Utilisateur supprimé !'}))
        .catch(error => res.status(400).json({error}));
}


