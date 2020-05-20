module.exports = function(sequelize, DataTypes){
    return sequelize.define('color', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hex: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        owner: DataTypes.INTEGER,
    });
};