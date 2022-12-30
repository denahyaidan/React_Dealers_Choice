const Sequelize = require('sequelize');
const {authenticate} = require('sequelize');

const db = new Sequelize('postgres://localhost/ReactDC', {
  logging: false, //doesn’t fill command line with bullshit
});

const syncAndSeed = async() => {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
        await db.sync({force:true});
        await Pokemon.create({name:"Pikachu", description:"Electric Mouse"})
        await Pokemon.create({name:"Electabuzz", description:"Electric Creature"})
        await Pokemon.create({name:"Garchomp", description:"Cool Dragon"})
        await Pokemon.create({name:"Houndoom", description:"Fire dog"})
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }  
}

const Pokemon = db.define('Pokemon', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
}
);

syncAndSeed();

module.exports = {
    db,
    Pokemon
}

