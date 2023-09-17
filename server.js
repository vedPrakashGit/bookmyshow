const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;

// app.get("/", (req, res) => {
//     res.send('Hello World!');
// });

require('dotenv').config();
const dbConfig = require('./config/dbConfig');
const userRoute = require('./routes/userRoute');
const movieRoute = require('./routes/movieRoute');
const theatreRoute = require('./routes/theatreRoute');
const showRoute = require('./routes/showRoute');
const bookingRoute = require('./routes/bookingRoute');
app.use(cors());
app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.use(express.static('./public'));
app.use('/api/users', userRoute);
app.use('/api/movies', movieRoute);
app.use('/api/theatres', theatreRoute);
app.use('/api/shows', showRoute);
app.use('/api/bookings', bookingRoute);

app.listen(port, (req, res) => {
    console.log(`Server is listening at ${port}`);
})
