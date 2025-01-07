import { Request, Response } from 'express';
import Transaction from '../models/Transaction';
import mongoose from 'mongoose';

export const getTransactionsByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { status, type, from, to, page = 1, limit = 10 } = req.query;

  try {
    const filters: any = { userId: new mongoose.Types.ObjectId(userId) };
    if (status) filters.status = status;
    if (type) filters.type = type;
    if (from || to) {
      filters.transactionDate = {};
      if (from) filters.transactionDate.$gte = new Date(from as string);
      if (to) filters.transactionDate.$lte = new Date(to as string);
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

export const getTransactionsWithUserDetails = async (req: Request, res: Response) => {
  const { status, type, from, to, page = 1, limit = 10 } = req.query;

  try {
    const filters: any = {};
    if (status) filters.status = status;
    if (type) filters.type = type;
    if (from || to) {
      filters.transactionDate = {};
      if (from) filters.transactionDate.$gte = new Date(from as string);
      if (to) filters.transactionDate.$lte = new Date(to as string);
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
