const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const { Schema } = mongoose;

const destinationSchema = new Schema({
    name: {
        required: true,
        type: String
    },

    startDate: {
        type: Date
    },

    endDate: {
        type: Date
    },

    climate: String,

    type: String,

    reservations: [{
            resName: {
                required: true,
                type: String
            },
            departDate: {
                type: Date
            },
            arriveDate: {
                type: Date,
            },
            departTime: {
                type: String
            },
            arriveTime: {
                type: String
            },
            reservationMade: {
                type: Boolean
            },
            modeSelector: {
                type: String,
            },
            cost: {
                type: Number
            },
        }],

    transportations: [{
        transName: {
            required: true,
            type: String
        },
        departDate: {
            type: Date
        },
        arriveDate: {
            type: Date,
        },
        departTime: {
            type: String
        },
        arriveTime: {
            type: String
        },
        reservationMade: {
            type: Boolean
        },
        modeSelector: {
            type: String,
        },
        cost: {
            type: Number
        },
        confirmationNumber: {
            type: Number
        },
        howEarly: {
            type: String
        },
        seatNumber: {
            type: String
        },
        phone: {
            type: Number
        },
        address: {
            type: String
        }
    }],

    tripID: {
        type: Schema.Types.ObjectId,
        ref: "Trip",
    },

}, { timestamps: true });

destinationSchema.plugin(autopopulate);

const DestinationModel = mongoose.model("Destination", destinationSchema);
module.exports = DestinationModel;
