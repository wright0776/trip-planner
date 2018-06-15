const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const expressJwt = require("express-jwt");

const logger = require("./middleware/logger");
const tripRouter = require("./routes/trip-routes");
const destinationRouter = require("./routes/destination-routes");
// const transportationRouter = require("./routes/transportation-routes");
// const reservationRouter = require("./routes/reservation-routes");
const authRouter = require("./routes/auth-routes");
const profileRouter = require("./routes/profile-routes");

// for deploying to Heroku
const path = require("path");

const app = express();
const port = process.env.PORT || 8080;

//middleware
app.use(bodyParser.json());
app.use("/", logger);

// for deploying to Heroku
app.use(express.static(path.join(__dirname, "client", "build")));

//routes
app.use("/auth", authRouter);

// Make the app use the express-jwt authentication middleware on anything starting with "/api"
app.use("/api", expressJwt({secret: process.env.SECRET}));

app.use("/api/trips", tripRouter);
app.use("/api/destinations", destinationRouter);
// app.use("/api/transportations", transportationRouter);
// app.use("/api/reservations", reservationRouter);
app.use("/api/profile", profileRouter);

// database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/organizer", err => {
    if(err) throw (err);
    console.log(`Connected to MongoDB via Mongoose on port 27017.`)
});

    // for deploying to Heroku
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
})

app.listen(port, () => console.log(`Server running on port ${port}`));
