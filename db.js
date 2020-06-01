const Sequelize = require('sequelize');

// Connects with pgAdmin
const sequelize = new Sequelize(process.env.DATABASE_URL, {
   dialect: 'postgres' 
});

sequelize.authenticate()
    .then(() => console.log('*** POSTGRES DB IS CONNECTED! ***'))
    .catch(err => console.log(err));

let Palette = sequelize.import('./models/palette');
let Colors = sequelize.import('./models/color');

Colors.belongsTo(Palette);
Palette.hasMany(Colors);

module.exports = sequelize; 