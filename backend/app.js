const express = require("express");
const sequelize = require('./config/sequelize');
const path = require("path");
const helmet = require("helmet");

const userRoutes = require("./routes/user");


const connect = async function () {
  try {
    await sequelize.authenticate();
    console.log('La connexion a été établie avec succès.');
  } catch (error) {
    console.error('Impossible de se connecter à la base de données :', error);
  }
};
connect();



const app = express();

app.use(helmet());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

  
app.use(express.json()); 

app.use("/images", express.static(path.join(__dirname, 'images')));
app.use("/api/auth", userRoutes);

module.exports = app;
