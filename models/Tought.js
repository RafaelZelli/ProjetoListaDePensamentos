//Importa o DataTypes
const { DataTypes } = require("sequelize")

const db = require("../db/conn")

//fazer a ligação com o User.js
const User = require("../models/User")

//Declara o pensamento
const Tought = db.define("Tought", {
  title: {
    type: DataTypes.STRING,  
    allowNull: false,
    require: true,
  },
});

Tought.belongsTo(User)  //Um pensamento pertence a um usuário  (belongto)
User.hasMany(Tought)   //Um usuário tem muitos pensamentos (hasmany)

module.exports = Tought