const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');



const errorController = require('./controllers/error');
const User = require('./models/user')

const MONGODB_URI = 'mongodb+srv://brennenAccess:123pssWord@cluster0.j3jll.mongodb.net/shop';

const app = express();
const store = new MongoDbStore({
    uri: MONGODB_URI,
    collection: 'sessions',
});
const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'my secret', 
    resave: false, 
    saveUninitialized: false,
    store: store
}));

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }

    User.findById(req.session.user._id)
    .then(user => {
        req.user = user;
        next();
   })
    .catch(err => console.log(err))
});

//these two fields will be set for every request executed
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
})


app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

//Take out string maybe?
const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://brennenAccess:123pssWord@cluster0.j3jll.mongodb.net/shop?retryWrites=true&w=majority";

  //Team activity paste
  const cors = require('cors') // Place this with other requires (like 'path' and 'express')
  const corsOptions = {
      origin: "https://ecommerce37.herokuapp.com/",
      optionsSuccessStatus: 200
  };
  app.use(cors(corsOptions));
  
  const options = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      family: 4
  };
mongoose
    .connect(MONGODB_URL, options )
    .then(result => {
        app.listen(PORT)
    })
    .catch(err => {
        console.log(err);
    });

