import express from 'express';
import { getTransactionsByUserId, getTransactionsWithUserDetails } from '../controllers/transactionController';

const router = express.Router();

router.get('/user/:userId', getTransactionsByUserId);
router.get('/details', getTransactionsWithUserDetails);

export default router;
