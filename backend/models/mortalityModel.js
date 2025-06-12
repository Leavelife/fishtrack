const {DataTypes} = require('sequelize')
const sequelize = require('../config/db');

const Mortality = sequelize.define('Mortality', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  pond_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  cause: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  estimasi_mati: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'mortalities',
  timestamps: false,
  underscored: true,
})

module.exports = Mortality
