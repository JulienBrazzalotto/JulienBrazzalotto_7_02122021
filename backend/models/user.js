const sequelize = require('../config/sequelize');
const { Sequelize, DataTypes } = require('sequelize');

const user = sequelize.define('user', {

    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.INTEGER,
        defaultValue: 2
    }
})

module.exports = user;
