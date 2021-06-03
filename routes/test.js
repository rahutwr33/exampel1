var express = require('express');
const {demo} = require('../controller/test');
var router = express.Router(); //create instance

router.post('/', demo); 

module.exports = router;
