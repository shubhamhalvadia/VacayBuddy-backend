const express = require('express');
const path = require('path');
const rootDir = require('../util/path');
const { body } = require('express-validator');
const bodyParser = require('body-parser');

const bookingController = require('../controllers/booking');
const router = express.Router();

//router.get('/',bookingController);

module.exports = router;