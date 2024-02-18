const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin')

const app = express();

const adminRoutes = require('./routes/admin');
const bookingRoutes = require('./routes/booking');

app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin',adminRoutes);
app.use(bookingRoutes);


app.listen(3000);

