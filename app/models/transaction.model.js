const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    value: Number
});

const TransactionSchemaModel = new mongoose.model("transactions", TransactionSchema);
module.exports = TransactionSchemaModel;