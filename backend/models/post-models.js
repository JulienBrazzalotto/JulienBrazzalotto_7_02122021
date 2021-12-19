const sequelize = require('../config/sequelize');
const { Sequelize, DataTypes } = require('sequelize');

const post = sequelize.define('post', {

    
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    user_id: {
        type: DataTypes.SMALLINT,
        allowNull: false
    }
},
{
    timestamps: false
})

module.exports = post;