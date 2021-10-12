const path = require('path');

const express = require('express');
const mongoose = require('mongoose');


const errorController = require('./controllers/error');
const User = require('./models/user')

const PORT = process.env.PORT || 3000

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('6161f1cba31a94899e1ef667')
     .then(user => {
     req.user = user;
     next();
    })
     .catch(err => console.log(err))
});


app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


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
    //these two break the code
    // useCreateIndex: true,
    // useFindAndModify: false,
    family: 4
  };
mongoose
    .connect(MONGODB_URL, options )
    .then(result => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'Max',
                    email: 'max@test.com',
                    cart: {
                        items: []
                    }
                });
                user.save();
            }
        });

        app.listen(PORT)
    })
    .catch(err => {
        console.log(err);
    });

