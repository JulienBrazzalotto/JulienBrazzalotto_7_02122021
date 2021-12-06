const express = require("express");
const path = require("path");
const helmet = require("helmet");


const app = express(); //initialise express

app.use(helmet()); //Helmet aide à protéger l'application de certaines des vulnérabilités bien connues du Web en configurant de manière appropriée des en-têtes HTTP.

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); //Permet d'accéder a l'API depuis n'importe quelle origine
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"); //Donne l'autorisation d'utiliser certains headers sur l'objet requête
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS"); //Permet d'envoyer des requêtes avec ces méthodes
    next(); // Passe l'exécution au middleware suivant
  });

  
app.use(express.json()); 

app.use("/images", express.static(path.join(__dirname, 'images'))); //Pour chaque requête envoyé à images on sert ce dossier statique images
app.use("/api/auth", userRoutes);

module.exports = app;