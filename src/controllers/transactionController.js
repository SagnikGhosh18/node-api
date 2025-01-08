const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');

exports.getTransactionsByUserId = async (req, res) => {
    const { userId } = req.params;
    const { status, type, from, to, page = 1, limit = 10 } = req.query;

    try {
        const filters = { userId: new mongoose.Types.ObjectId(userId) };
        if (status) {
            filters.status = status;
        }
        if (type) {
            filters.type = type;
        }
        if (from || to) {
            filters.transactionDate = {};
            if (from) filters.transactionDate.$gte = new Date(from);
            if (to) filters.transactionDate.$lte = new Date(to);
        }

        const transactions = await Transaction.aggregate([
            { $match: filters },
            { $sort: { transactionDate: -1 } },
            { $skip: (Number(page) - 1) * Number(limit) },
            { $limit: Number(limit) },
        ]);

        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

exports.getTransactionsWithUserDetails = async (req, res) => {
    const { status, type, from, to, page = 1, limit = 10 } = req.query;

    try {
        const filters = {};
        if (status) filters.status = status;
        if (type) filters.type = type;
        if (from || to) {
            filters.transactionDate = {};
            if (from) filters.transactionDate.$gte = new Date(from);
            if (to) filters.transactionDate.$lte = new Date(to);
        }

        const transactions = await Transaction.aggregate([
            { $match: filters },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userDetails',
                },
            },
            { $unwind: '$userDetails' },
            { $sort: { transactionDate: -1 } },
            { $skip: (Number(page) - 1) * Number(limit) },
            { $limit: Number(limit) },
        ]);

        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};