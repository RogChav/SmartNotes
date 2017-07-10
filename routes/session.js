var express = require('express');
var router = express.Router();

var sessionController = require('../controllers/session-controller');

/* GET users listing. */
router.get('/', sessionController.index);

//POST 
router.post('/', sessionController.create);

//GET
router.get('/:id', sessionController.show);

//PUT NAME
router.put('/name/:id', sessionController.updateName); 

//PUT RESULTS
router.put('/:id', sessionController.update);

//DELETE 
router.delete('/:id', sessionController.destroy);

module.exports = router;
