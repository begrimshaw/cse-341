const path = require('path');
const PORT = process.env.PORT || 5000;
const express = require('express');

const app = express();
  
app.set('view engine', 'ejs');
app.set('views', 'views'); //sets the folder to fine the view engine. 

const adminData = require('./routes/admin'); // getting routes and products. 
const shopRoutes = require('./routes/shop');

app.use(express.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page Not Found'});
});

app.listen(PORT);   
