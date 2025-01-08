const express = require('express');
const { getTransactionsByUserId, getTransactionsWithUserDetails } = require('../controllers/transactionController');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json('Welcome, Transaction Route is working well');
});
router.get('/user/:userId', getTransactionsByUserId);
router.get('/details', getTransactionsWithUserDetails);

module.exports = router;