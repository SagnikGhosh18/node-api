import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  status: 'success' | 'pending' | 'failed';
  type: 'debit' | 'credit';
  transactionDate: Date;
  amount: number;
  userId: mongoose.Schema.Types.ObjectId;
}

const TransactionSchema: Schema = new Schema({
  status: { type: String, enum: ['success', 'pending', 'failed'], required: true },
  type: { type: String, enum: ['debit', 'credit'], required: true },
  transactionDate: { type: Date, required: true },
  amount: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
