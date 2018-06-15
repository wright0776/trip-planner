const express = require("express");
const User = require("../models/user-model");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

//post a new user to user collection (signing up)
authRouter.post("/signup", (req, res) => {
    // try to find a user with the provided username. (If it already exists, we want to tell them
    // that the username is already taken.)
    User.findOne({ username: req.body.username }, (err, existingUser) => {
        if (err) return res.status(500).send({ success: false, err });

        // If the db doesn't return "null" it means there's already a user with that username.
        if (existingUser !== null) {
            return res.status(400).send({ success: false, err: "That username already exists!" });
        }

        // If the function reaches this point and hasn't returned already, we're safe
        // to create the new user in the database.
        const newUser = new User(req.body);
        newUser.save((err, user) => {
            if (err) return res.status(500).send({ success: false, err });

            // If the user signs up, we might as well give them a token right now
            // So they don't then immediately have to log in as well
            const token = jwt.sign(user.toObject(), process.env.SECRET);
            return res.status(201).send({ success: true, user: user.toObject(), token });
        });
    });
});

authRouter.post("/login", (req, res) => { 
    // try to find the user with the submitted username (lowercased) 
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
        if (err) return res.status(500).send(err);

        // if the user isn't found in the database or the password is wrong
        if (!user) {
            res.status(401).send({ success: false, message: "User with the provided username was not found" })
        } else {
            user.checkPassword(req.body.password, (err, match) => {
                if (err) throw (err);
                if (!match) return res.status(401).send({ success: false, message: "Incorrect password" });

                // if username and password both match an entry in the database,
                // create a JWT! Add the user object as the payload and pass in the secret.
                const token = jwt.sign(user.toObject(), process.env.SECRET);
                
                // send the token back to the client app
                return res.send({user: user.withoutPassword(),token: token, success: true, message: "Here's your token!"});  
            });
        }
    });
})

module.exports = authRouter;
