'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Participant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Participant.belongsTo(models.Meeting, {
        foreignKey: "meetingId",
        as: "meeting",
      });
    }
  }
  Participant.init({
    name: DataTypes.STRING,
    meetingId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Participant',
  });
  return Participant;
};