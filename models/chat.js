module.exports = function (sequelize, DataTypes) {
    var Chat = sequelize.define("Chat", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        }
    });

    Chat.associate = function (models) {
        // We're saying that a Chat should belong to a particular User
        // A Chat can't be created without a User due to the foreign key constraint
        Chat.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Chat;
};
