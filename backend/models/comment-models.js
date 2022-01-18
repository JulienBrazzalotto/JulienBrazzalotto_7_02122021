const sequelize = require('../config/sequelize');
const { Sequelize, DataTypes } = require('sequelize');

const comment = sequelize.define('comment', {

    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    user_id: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    post_id: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    moderate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
},
{
    timestamps: false
})

module.exports = comment;