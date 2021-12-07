const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordValidator = require('password-validator');
const emailValidator = require("email-validator");

const user = require('../models/user');


const schema = new passwordValidator();
schema
  .is().min(3)
  .is().max(50)
  .has().uppercase()
  .has().lowercase()
  .has().digits(1)
  .has().not().spaces();



exports.signup = (req, res, next) => {
    if (!emailValidator.validate(req.body.email)){
        return res.status(401).json({message: 'Veuillez entrer une adresse email valide'});
    }

    if (!schema.validate(req.body.password)){
        return res.status(401).json({message: 'Le mot de passe doit avoir une longueur de 3 à 50 caractères avec au moins un chiffre, une minuscule, une majuscule et ne possédant pas d\'espace !!!'});
    };

    
    bcrypt.hash(req.body.password, 10)
        .then(hash =>{
            user.create({
                pseudo: req.body.pseudo,
                email: req.body.email,
                password: hash
            })
                .then(() => res.status(201).json({message: 'Utilisateur créé !'}))
                .catch(error => res.status(400).json({error}));
            
        })
        .catch(error => res.status(500).json({error}));
}


exports.login = (req, res, next) => {
    user.findOne({ where: {email: req.body.email} })
        .then(user => {
            if(!user){
                return res.status(401).json({error: 'Utilisateur non trouvé !'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => { 
                    if(!valid){
                        return res.status(401).json({error: 'Mot de passe incorrect !'});
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id},
                            process.env.TOKEN, 
                            {expiresIn: '24h'} 
                        )
                    }); 
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};
