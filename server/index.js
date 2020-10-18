const express = require('express');
const cors = require('cors');

// DB
const db = require('./config/database');

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use('/', require('./routes/routes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
})