const {DataTypes} = require('sequelize')
const sequelize = require('../config/db');

const Pond = sequelize.define('Pond', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fish_type: {
    type: DataTypes.ENUM('lele', 'nila', 'gurame'),
    allowNull: false,
  },
  width: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  length: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  density: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('aktif', 'panen', 'kosong'),
    allowNull: false,
  },
}, {
  tableName: 'ponds',
  timestamps: false,
  underscored: true,
})

module.exports = Pond;
