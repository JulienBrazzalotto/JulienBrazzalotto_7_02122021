const { Sequelize, DataTypes } = require('sequelize');

const user = sequelize.define('user', {

    pseudo: {
        type: DataTypes.STRING,
        unique: true,
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
      }
})

module.exports = user;
