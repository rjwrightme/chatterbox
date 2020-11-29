module.exports = function (sequelize, DataTypes) {
  var Chat = sequelize.define("Chat", {
    // eslint-disable-next-line camelcase
    chat_message: DataTypes.STRING,
    username: DataTypes.STRING,
    room: DataTypes.STRING,
  });
  return Chat;
};
