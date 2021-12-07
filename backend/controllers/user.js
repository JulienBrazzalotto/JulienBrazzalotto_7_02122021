const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordValidator = require('password-validator');
const emailValidator = require("email-validator");

const User = require('../models/user');


const schema = new passwordValidator();
schema
  .is().min(3) //longueur minimale de 3
  .is().max(50) //longueur minimale de 50
  .has().uppercase() //Majuscule obligatoire
  .has().lowercase() //Minuscule obligatoire
  .has().digits(1) // Au moins 1 chiffre
  .has().not().spaces(); //Ne possède pas d'espace



exports.signup = (req, res, next) => {
    if (!emailValidator.validate(req.body.email)){
        return res.status(401).json({message: 'Veuillez entrer une adresse email valide'});
    }

    if (!schema.validate(req.body.password)){
        return res.status(401).json({message: 'Le mot de passe doit avoir une longueur de 3 a 50 caractères avec au moins un chiffre, une minuscule, une majuscule et ne possédant pas d\'espace !!!'});
    };

    
    bcrypt.hash(req.body.password, 10)
        .then(hash =>{
            const user = new User({
                nom_utilisateur: req.body.nom_utilisateur,
                email: req.body.email,
                password: hash
            });
            
            user.save() //Sauvegarde dans la base de données
                .then(() => res.status(201).json({message: 'Utilisateur créé !'}))
                .catch(error => res.status(400).json({error}));
            
        })
        .catch(error => res.status(500).json({error}));
}


exports.login = (req, res, next) => {
    User.findOne({email: req.body.email}) //Recherche l'email utilisateur dans la base de données
        .then(user => {
            if(!user){ //S'il n'existe pas alors
                return res.status(401).json({error: 'Utilisateur non trouvé !'});
            }
            bcrypt.compare(req.body.password, user.password) //Compare le password utilisateur avec celui enregistré dans la base de données
                .then(valid => { 
                    if(!valid){ //Si différent alors
                        return res.status(401).json({error: 'Mot de passe incorrect !'});
                    }
                    res.status(200).json({ //Sinon on renvoie cet objet
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id}, //Données encodés
                            process.env.TOKEN, //Clé secrete
                            {expiresIn: '24h'} //Durée d'expiration du token
                        )
                    }); 
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};