const path = require('path');


const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin'); //imports admin.js where we have exported routes and the products array

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log(adminData.products);
  res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;
