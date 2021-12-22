const sequelize = require('../config/sequelize');
const { Sequelize, DataTypes } = require('sequelize');
const post = require('./post-models');
const comment = require('./comment-models');

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
},
{
    timestamps: false
})
user.hasMany(post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
post.belongsTo(user, { foreignKey: 'user_id' });

user.hasMany(comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
comment.belongsTo(user, { foreignKey: 'user_id' });


module.exports = user;
