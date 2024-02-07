'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Entry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Entry.init({
    text: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    date: DataTypes.DATE,
    user_id:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Entry',
  });
  return Entry;
};