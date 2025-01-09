const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./src/routes/userRoutes');
const transactionRoutes = require('./src/routes/transactionRoutes');

dotenv.config();



const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);

app.get('/', (req, res) => {
    res.status(200).json('Welcome, your app is working well');
});

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || '');
        return 'Connected to MongoDB';
    } catch (error) {
        return error;
    }
};

connectToDB();


// app.get('/db', async (req, res) => {
//     // const result = await connectToDB();
//     res.status(200).json(result);
// });

app.listen(PORT, async () => {
    // await connectToDB();
    console.log('Connected to MongoDB');
    console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;
