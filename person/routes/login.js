var express = require('express');
var router = express.Router();

var selectUser = require('../controller/loginserver');
/* GET users listing. */
router.post('/', function(req, res, next) {
    selectUser(req,res);
});

module.exports = router;
