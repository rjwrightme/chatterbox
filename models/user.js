module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {

        name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isonline: DataTypes.BOOLEAN,
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
