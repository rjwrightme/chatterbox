module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {

        name: DataTypes.STRING
    });

    User.associate = function (models) {
        // Associating User with Chats
        // When a User is deleted, also delete any associated Chats
        User.hasMany(models.Chat, {
            onDelete: "cascade"
        });
    };

    return User;
};
