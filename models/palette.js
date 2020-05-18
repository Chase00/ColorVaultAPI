module.exports = function(sequelize, DataTypes){
    return sequelize.define('palette', {
        name: DataTypes.STRING,
        colors: DataTypes.ARRAY(DataTypes.STRING),
        owner: DataTypes.INTEGER,
    });
};