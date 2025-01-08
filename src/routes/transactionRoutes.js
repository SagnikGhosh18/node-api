const express = require('express');
const { getTransactionsByUserId, getTransactionsWithUserDetails } = require('../controllers/transactionController');

const router = express.Router();

router.get('/user/:userId', getTransactionsByUserId);
router.get('/details', getTransactionsWithUserDetails);

module.exports = router;