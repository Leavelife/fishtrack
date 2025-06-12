const {DataTypes} = require('sequelize')
const sequelize = require('../config/db');

const Feed = sequelize.define('Feed', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  pond_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  feed_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  feed_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  amount_kg: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
    tableName: 'feeds',
    timestamps: false,
    underscored: true,
})

module.exports = Feed;
