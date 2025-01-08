const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');
require('dotenv').config();

module.exports = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const { userId, status, type, from, to, page = 1, limit = 10 } = req.query;

        let filters = {};
        if (userId) filters.userId = userId;
        if (status) filters.status = status;
        if (type) filters.type = type;
        if (from || to) {
            filters.transactionDate = {};
            if (from) filters.transactionDate.$gte = new Date(from);
            if (to) filters.transactionDate.$lte = new Date(to);
        }

        const transactions = await Transaction.aggregate([
            { $match: filters },
            { $skip: (Number(page) - 1) * Number(limit) },
            { $limit: Number(limit) },
        ]);

        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};
