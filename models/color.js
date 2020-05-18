module.exports = function(sequelize, DataTypes){
    return sequelize.define('color', {
        name: DataTypes.STRING,
        hex: DataTypes.STRING,
        owner: DataTypes.INTEGER,
    });
};