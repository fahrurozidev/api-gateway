var express = require("express");
var router = express.Router();
const { APP_NAME } = process.env;

const mentorsHandler = require('./handler/mentors');

router.get('/', mentorsHandler.getAll);
router.get('/:id', mentorsHandler.get);
router.post('/', mentorsHandler.create);
router.put('/:id', mentorsHandler.update);
router.delete('/:id', mentorsHandler.destroy);

module.exports = router;
