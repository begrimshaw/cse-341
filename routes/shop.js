const path = require('path');


const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin'); //imports admin.js where we have exported routes and the products array

const router = express.Router();

router.get('/', (req, res, next) => {
  const products = adminData.products; //take products out of adminData
  res.render('shop',
   {prods: products, 
    pageTitle: 'Shop', 
    path: '/', 
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true}); //don't need shop.pug because pug is "view engine"- 'pug'
                                          // products is being passed in with the key of prods
                                        
});

module.exports = router;
