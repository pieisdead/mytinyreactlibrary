const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

var corsOptions = {
    origin: ['localhost', 'localhost:9000'],
    methods: ["ACCEPT", "GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Accept", "Content-Type", "Set-Cookie"],
    maxAge: 3600,
    credentials: true,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
port = process.env.PORT || 9000;

app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/appRoute');
routes(app);