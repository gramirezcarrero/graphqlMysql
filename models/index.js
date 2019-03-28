'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
/*
const AuthorModel = db.define('author', {
  authorId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: "author_id" },
  firstName: { type: Sequelize.STRING, field: "first_name" },
  lastName: { type: Sequelize.STRING, field: "last_name" },
},{
        freezeTableName: false,
        timestamps: false,
        underscored: false,
        tableName: "author"
    });


const PostModel = db.define('post', {
    postId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: "post_id" },
  text: { type: Sequelize.STRING },
  title:  { type: Sequelize.STRING },
  views: { type: Sequelize.INTEGER },
},{
        freezeTableName: false,
        timestamps: false,
        underscored: false,
        tableName: "post"
    });


AuthorModel.hasMany(PostModel, {
    foreignKey: 'author_id'
});
PostModel.belongsTo(AuthorModel, {
    foreignKey: 'author_id'
});

const Author = db.models.author;
const Post = db.models.post;

export { Author, Post };*/