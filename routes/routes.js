const express = require('express');
const router = express.Router();
const poststCont = require('../controllers/postsCont');

// Ruta para obtener todos los restaurantes
router.get('/getAllposts', poststCont.getAllposts);

// Ruta para obtener un restaurante por ID
router.get('/getpostById/:id', poststCont.getpostById);

// Ruta para agregar un nuevo restaurante
router.post('/addpost', poststCont.addpost);

// Ruta para actualizar un restaurante por ID
router.patch('/updatepostById/:id', poststCont.updatepostById);

// Ruta para eliminar un restaurante por ID
router.delete('/deletepostById/:id', poststCont.deletepostById);


module.exports = router;