const TransactionModel = require('../models/transaction.model');

// Demo Method
exports.demoMethods = async (req, res) => {
    res.send('Transaction Home Page')
}

// Create New Transaction
exports.createNewTransaction = async (req, res) => {
    let status, message, data = [];
    if (req.body.value) {
        try {
            const newTransaction = new TransactionModel({
                "value": req.body.value
            });
            const transInserted = await newTransaction.save();
            if(transInserted){
                status = 200;
                message = "Recored Created!";
                data = transInserted;
            }
        } catch (error) {
            status = 404;
            message = 'Error : ' + error;
        }
    } else {
        status = 404;
        message = "No title given";
    }
    res.status(status).json({ status, message, data });
}

// Get All Transactions
exports.getAllTransactions = async (req, res) => {
    console.log('||||||||||||||||')
    let status, message, data;
    try {
        const allTransaction = await TransactionModel.find();
        if (allTransaction) {
            status = 200;
            message = "Recored Found!";
            data = allTransaction;
        }
    } catch (error) {
        console.log('catch')
        status = 404;
        message = "Error : " + error;
        data = null;
    }
    res.status(status).json({ status, message, data });
}


// Find Single Transaction
exports.findOne = async (req, res) => {
    let status, message, data;
    TransactionModel.findById(req.params.transactionID)
        .then((TransactionRecord) => {
            if (TransactionRecord) {
                status = 200;
                message = "Transaction found";
                data = TransactionRecord;
            } else {
                status = 404;
                message = "Transaction not found with id " + req.params.transactionID;
            }
            res.status(status).json({ status, message, data });
        })
        .catch((err) => {
            if (err.kind === "ObjectId") {
                status = 404;
                message = "Transaction not found with id " + req.params.transactionID;
            } else {
                status = 500;
                message = "Error retrieving Transaction with id " + req.params.transactionID;
            }
            res.status(status).json({ status, message, data });
        });
}

// Update Transaction
exports.update = async (req, res) => {
    let status, message, data;
    TransactionModel.findByIdAndUpdate(req.params.transactionID,
        {
            value: req.body.value
        },
        { new: true }
    ).then((TransactionRecord) => {
        if (TransactionRecord) {
            status = 200;
            message = "Transaction updated " + req.params.transactionID;
            data = TransactionRecord;
        } else {
            status = 404;
            message = "Transaction not found with id " + req.params.transactionID;
        }
        res.status(status).json({ status, message, data });
    }).catch((err) => {
        if (err.kind === "ObjectId") {
            status = 404;
            message = "Transaction not found with id " + req.params.transactionID;
        } else {
            status = 500;
            message = "Error updating Task with id " + req.params.transactionID;
        }
        res.status(status).json({ status, message, data });
    });
}

// Delete Transaction
exports.delete = async (req, res) => {
    let status, message, data;
    TransactionModel.findByIdAndRemove(req.params.transactionID)
        .then((TransactionRecord) => {
            if (TransactionRecord) {
                status = 200;
                message = "Task deleted " + req.params.transactionID;
            } else {
                status = 404;
                message = "Task not found with id " + req.params.transactionID;
                data = TransactionRecord;
            }
            res.status(status).json({ status, message, data });
        })
        .catch((err) => {
            if (err.kind === "ObjectId" || err.name === "NotFound") {
                status = 404;
                message = "Task not found with id " + req.params.transactionID;
            } else {
                status = 500;
                message = "Task not found with id " + req.params.transactionID;
            }
            res.status(status).json({ status, message, data });
        });
}