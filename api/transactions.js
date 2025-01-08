const express = require("express");
const router = express.Router();
const {
    getTransactionsByUserId,
    getTransactionsWithUserDetails,
} = require("../src/controllers/transactionController");

router.get("/user/:userId", getTransactionsByUserId);
router.get("/details", getTransactionsWithUserDetails);

module.exports = async (req, res) => {
    const app = express();
    app.use("/transactions", router);
    return app(req, res);
};
