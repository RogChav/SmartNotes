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

//PUT DURATION
router.put('/duration/:id', sessionController.updateDuration); 

//PUT RESULTS ANSWER
router.put('/:id/answer/:id2', sessionController.updateAnswer);

//PUT RESULTS PREPOPULATE
router.put('/:id', sessionController.update);

//DELETE 
router.delete('/:id', sessionController.destroy);

module.exports = router;
