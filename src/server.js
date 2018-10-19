'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const passport = require('passport');

const app = express();

require('./passport/passport')(passport);

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(expressSanitizer());
app.use(passport.initialize());
app.use(cors());

// Include controllers
fs.readdirSync('./src/controllers').forEach(file => {
    if (file.substr(-3) === '.js') {
        const route = require('./controllers/' + file);
        route.controller(app)
    }
});

const port = process.env.PORT || 8081;

app.listen(port, () => {
    console.log(`api running on port ${port}`);
});