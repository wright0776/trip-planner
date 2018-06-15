const express = require("express");
const tripRouter = express.Router();
const TripModel = require("../models/trip-model");

tripRouter.route("/")
    .get((req, res) => {
        // Include filtering criteria to the find so that it only finds 
        // trips with a 'user' property with the current user's id.
        TripModel
        .find({ users: {$eq: req.user._id} })
        .exec((err, foundTrip) => {
            if (err) return res.status(500).send(err);
            else res.status(200).send(foundTrip);
        })
    })
    .post((req, res) => {
        const newTrip = new TripModel(req.body);

        // Set the user property of a trip to req.user._id (logged-in user's `_id` property)
        newTrip.users.push(req.user._id);

        newTrip.save((err, addedTrip) => {
            if (err) return res.status(500).send(err);
            else res.status(201).send(addedTrip);
        })
    });

tripRouter.route("/:id")
    .get((req, res) => {
        // Include the search criteria for users
        TripModel.findOne({ _id: req.params.id, users: {$eq: req.user._id} }, (err, foundTrip) => {
            if (err) return res.status(500).send(err);
            if (!foundTrip) return res.status(404).send({ message: "Not found" });
            res.status(200).send(foundTrip);
        })
    })
    .delete((req, res) => {
        // Include the search criteria for users
        TripModel.findOneAndRemove({ _id: req.params.id, users: {$eq: req.user._id} }, (err, deletedTrip) => {
            if (err) return res.status(500).send(err);
            if (!deletedTrip) return res.status(404).send({ message: "Not found" });
            res.status(200).send(`${deletedTrip.name} was deleted.`);
        })
    })
    .put((req, res) => {
        // Include the query for users
        TripModel.findOneAndUpdate({ _id: req.params.id, users: {$eq: req.user._id}  }, req.body, { returnNewDocument: true }, (err, updatedTrip) => {
            if (err) return res.status(500).send(err);
            if (!updatedTrip) return res.status(404).send({ message: "Not found" });
            res.status(200).send(updatedTrip);
        });
    })
tripRouter.route("/:id/add-destination")
    .post((req, res) => {
        TripModel
        .findOneAndUpdate({ _id: req.params.id }, { $push: req.body }, { new: true })
        .populate("destinations")
        .exec((err, updatedTrip) => {
            if (err) return res.status(500).send(err);
            if (!updatedTrip) return res.status(404).send({ message: `${req.params.id} Not found`});
            res.status(200).send(updatedTrip);
        })
    })


module.exports = tripRouter;