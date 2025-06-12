const {DataTypes} = require('sequelize')
const sequelize = require('../config/db');

const Harvest = sequelize.define('Hrvest', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  pond_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  harvest_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  weight_kg: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  price_per_kg: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  buyer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'harvests',
  timestamps: false,
  underscored: true,
})

module.exports = Harvest
