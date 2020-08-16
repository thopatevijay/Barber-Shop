const cors = require('cors');
const express = require('express');
const bodyparser = require('body-parser');
const { connect } = require('mongoose');
const { success, error } = require('consola');
const passport = require('passport');

//  Bring the config 
const { DB, PORT } = require('./config');

// Intitialize the application
const app = express();

// Middlewares
app.use(cors());
app.use(bodyparser.json());
app.use(passport.initialize());

require("./middlewares/passport")(passport);

// Middlewares :  User Router
app.use('/', require('./routes/usersRoutes'));
// Customer Router
app.use('/', require('./routes/customerRoutes'));


const startApplication = async () => {
    try {
        // DB connection
        await connect(DB, {
            useFindAndModify: true,
            useUnifiedTopology : true,
            useNewUrlParser: true
        });

        success({ 
            message: `DB connected`,
            badge: true
        });
        // Listening PORT
        app.listen(PORT, () => 
        success({ message: `Server running on PORT ${PORT}`, badge: true})
        );
    } catch(err) {
    error({
        message: `Unable to connect with DB ${err}`,
        badge: true
    });
    startApplication()
    }
};
   
startApplication();