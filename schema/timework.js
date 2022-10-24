const mongoose = require("mongoose");


const timework = new mongoose.Schema({
    userId: { type: String, require: true },
    guildId: { type: String, require: true },
    timein: { type: Number, require: true },
    timeout: { type: Number, require: true },
    time: { type: Number, require: true }
});

module.exports = mongoose.model(
    "Timework",
    timework,
    'Timework'
);
