var express = require('express');
var router = express.Router();

var addUser = require('../controller/registerserver');
/* GET users listing. */
router.post('/', function(req, res, next) {
    addUser(req,res);
});

module.exports = router;
