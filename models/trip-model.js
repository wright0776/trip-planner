const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const { Schema } = mongoose;

const tripSchema = new Schema({
    name: {
        required: true,
        type: String
    },

    startDate: {
        // required: true,
        type: Date
    },

    endDate: {
        type: Date
    },

    backgroundImg: "",

    users: [{
        type: Schema.Types.ObjectId,
        ref: "User", 
        required: true,
        autopopulate: true
    }]

},{timestamps: true});

tripSchema.plugin(autopopulate);

const TripModel = mongoose.model("Trip", tripSchema);
module.exports = TripModel;
