module.exports = function(sequelize, DataTypes){
    return sequelize.define('palette', {
        name: DataTypes.STRING,
        owner: DataTypes.INTEGER,
    });
};