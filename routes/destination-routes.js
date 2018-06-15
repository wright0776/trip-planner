const express = require("express");
const destinationRouter = express.Router();
const DestinationModel = require("../models/destination-model");

destinationRouter.route("/")
    .get((req, res) => {
        DestinationModel.find(req.query, (err, foundDestination) => {
            if (err) res.send(err);
            else res.status(200).send(foundDestination);
        })
    })
    .post((req, res) => {
        const newDestination = new DestinationModel(req.body);
        newDestination.save((err, addedDestination) => {
            if (err) res.send(err);
            else res.status(201).send(addedDestination);
        })
    });

destinationRouter.route("/:id")
    .get((req, res) => {
        DestinationModel.findOne({ _id: req.params.id }, (err, foundDestination) => {
            if (err) return res.send(err);
            if (!foundDestination) return res.status(404).send({ message: "Not found" });
            res.status(200).send(foundDestination);
        })
    })
    .delete((req, res) => {
        DestinationModel.findOneAndRemove({ _id: req.params.id }, (err, deletedDestination) => {
            if (err) return res.send(err);
            if (!deletedDestination) return res.status(404).send({ message: "Not found" });
            res.status(200).send(`${deletedDestination.name} was deleted.`);
        })
    })
    .put((req, res) => {
        DestinationModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, updatedDestination) => {
            if (err) return res.send(err);
            if (!updatedDestination) return res.status(404).send({ message: "Not found" });
            res.status(200).send(updatedDestination);
        });
    })

destinationRouter.route("/:id/add-reservation")
    .post((req, res) => {
        DestinationModel
            .findOneAndUpdate({ _id: req.params.id }, { $push: req.body }, { new: true })
            .exec((err, updatedDestination) => {
                if (err) return res.send(err);
                if (!updatedDestination) return res.status(404).send({ message: `Destination ID ${req.params.id} Not found` });
                res.status(200).send(updatedDestination);
        })
    })

destinationRouter.route("/:id/add-transportation")
    .post((req, res) => {
        DestinationModel
            .findOneAndUpdate({ _id: req.params.id }, { $push: req.body }, { new: true })
            .exec((err, updatedDestination) => {
                if (err) return res.send(err);
                if (!updatedDestination) return res.status(404).send({ message: `Destination ID ${req.params.id} Not found` });
                res.status(200).send(updatedDestination);
            })
    })

module.exports = destinationRouter;