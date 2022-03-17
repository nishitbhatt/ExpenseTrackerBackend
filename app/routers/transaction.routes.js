const express = require('express')
const router = express.Router()
const transactionController = require('../controllers/Transaction.controller');


// Main Todo Route
router.get('/', transactionController.demoMethods)
// Create New Todo
router.post("/create", transactionController.createNewTransaction);
// Get All Todo
router.get("/get-all", transactionController.getAllTransactions);
// Find One Todo
router.get("/:transactionID", transactionController.findOne);
// Update Todo
router.put("/:transactionID", transactionController.update);
// Delete Todo
router.delete("/:transactionID", transactionController.delete);

module.exports = router