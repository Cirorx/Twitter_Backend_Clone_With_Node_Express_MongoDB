// importing the module on a constant
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectToDatabase = function (url) {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

// we allow the module to be imported from another file
module.exports = connectToDatabase;