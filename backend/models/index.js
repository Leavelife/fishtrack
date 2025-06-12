const sequelize = require('../config/db');
const Transaction = require('../models/transactionModel');
const Harvest = require('../models/harvestModel')
const Feed = require('../models/feedModel')
const Irrigation = require('../models/irrigationModel')
const Mortality = require('../models/mortalityModel')
const Pond = require('../models/pondModel')

module.exports = {
  sequelize,
  Transaction,
  Harvest,
  Feed, 
  Irrigation, 
  Mortality, 
  Pond
};

