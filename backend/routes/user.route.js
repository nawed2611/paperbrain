const { Router } = require('express');
const router = Router();
const { addPaper, findAll, findOne, update } = require('../controllers/user.controller');

router.post('/addPaper', addPaper);
router.get('/', findAll);
router.get('/:email', findOne);
router.put('/:email', update);

module.exports = router;

