const {DataTypes} = require('sequelize')
const sequelize = require('../config/db');

const Irrigation = sequelize.define('Irrigation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  pond_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  irrigation_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  duration_minutes: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'irrigations',
  timestamps: false,
  underscored: true,
})

module.exports = Irrigation;
