const mongoose = require("mongoose");
const User = require("./models/User");
const Transaction = require("./models/Transaction");
require("dotenv").config();

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "");

        // Clear existing data
        await User.deleteMany();
        await Transaction.deleteMany();

        // Seed users
        const users = [];
        for (let i = 0; i < 100; i++) {
            users.push({ name: `User${i}`, phoneNumber: `123456789${i % 10}` });
        }
        const insertedUsers = await User.insertMany(users);

        // Seed transactions
        const transactions = [];
        insertedUsers.forEach((user) => {
            for (let j = 0; j < 500; j++) {
                transactions.push({
                    status: ["success", "pending", "failed"][
                        Math.floor(Math.random() * 3)
                    ],
                    type: ["debit", "credit"][Math.floor(Math.random() * 2)],
                    transactionDate: new Date(),
                    amount: Math.floor(Math.random() * 1000),
                    userId: user._id,
                });
            }
        });
        await Transaction.insertMany(transactions);

        console.log("Database seeded successfully");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDatabase();
