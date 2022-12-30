const router = require('express').Router()
const Sequelize = require('sequelize')
const {db, Pokemon} = require('./db')

router.get('/pokemon', async (req, res, next) => {
    try {const pokemonData = await Pokemon.findAll()
    res.send(pokemonData);
    }
    catch (e) {
        console.log(e)
    }
})    

router.get('/pokemon/:pokemonId', async (req, res, next) => {
    try {const pokemonData2 = await Pokemon.findByPk(req.params.pokemonId)
    res.json(pokemonData2);
    }
    catch (e) {
        console.log(e)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        console.log("In the route", req.params.id)
        const toDestroy = await Pokemon.findByPk(req.params.id);
        await toDestroy.destroy();
    } catch (error) {
      next(error);
    }
  });

router.post('/post', async (req, res, next) => {
    try {
        const name = req.body.name;
        const description = req.body.description;
        Pokemon.create({name: name, description: description})
        res.redirect('/')
    } catch (error) {
      next(error);
    }
  });


module.exports = router;