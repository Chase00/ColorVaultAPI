module.exports = function(sequelize, DataTypes){
    return sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        passwordhash: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
}