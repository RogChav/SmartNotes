var express = require('express');
var router = express.Router();

var notesController = require('../controllers/notes-controller');

/* GET users listing. */
router.get('/', notesController.index);

//POST 
router.post('/', notesController.create);

//GET
router.get('/:id', notesController.show);

//PUT 
router.put('/:id', notesController.update);

//DELETE 
router.delete('/:id', notesController.destroy);

//DELETE KEYWORD
router.delete('/:id/keyword/:id2', notesController.destroyKeyword);
module.exports = router;
