const mongoose = require('mongoose');
const mongoTenant = require('mongo-tenant');
const schema = mongoose.Schema;

const roomSchema = new schema ({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true,
        unique: false
    },
    recommendedCapacity: {
        type: Number,
        required: true,
        unique: false
    },
    createdBy: {
        type: schema.Types.ObjectId,
        required: true,
        unique: false
    }
});

roomSchema.plugin(mongoTenant);
const Room = mongoose.model('room', roomSchema);
module.exports = Room;