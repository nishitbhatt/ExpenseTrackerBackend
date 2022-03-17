const mongoose = require("mongoose");
const mongoUri = process.env.MONGOURI;
mongoose.connect(mongoUri).then((data) => {
    console.log('Connction successfull !');
}).catch((e) => {
    console.log("No Connection", e);
});