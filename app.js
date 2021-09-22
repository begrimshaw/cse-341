const path = require('path');

const express = require('express');
const expressHbs = require('express-handlebars');

const app = express();

app.engine('hbs', // name of engine, and the engine we want to use.
expressHbs({
    layoutsDir: 'views/layouts/', 
    defaultLayout: 'main-layout', 
    extname: 'hbs'}));  
app.set('view engine', 'hbs');
app.set('views', 'views'); //sets the folder to fine the view engine. 

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page Not Found'});
});

app.listen(3000);
