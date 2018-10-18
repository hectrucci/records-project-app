const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const passport = require('passport');

const app = express();
// const router = express.Router();

require('./passport/passport')(passport);

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors());


// Include controllers
fs.readdirSync('./src/controllers').forEach(function (file) {
    if (file.substr(-3) === '.js') {
        const route = require('./controllers/' + file);
        route.controller(app)
    }
});

const port = process.env.API_PORT || 8081;

app.listen(port, function () {
    console.log(`api running on port ${port}`);
});