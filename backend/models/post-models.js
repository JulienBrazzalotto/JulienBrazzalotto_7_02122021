const sequelize = require('../config/sequelize');
const { Sequelize, DataTypes } = require('sequelize');
const comment = require('./comment-models');

const post = sequelize.define('post', {

    
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
    },
    created_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    updated_date: {
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
    },
    moderate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
},
{
    timestamps: false
})
post.hasMany(comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
comment.belongsTo(post, { foreignKey: 'post_id' });

module.exports = post;