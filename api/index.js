module.exports = (req, res) => {
    res.status(200).json({
        message: "API is running successfully!",
        endpoints: [
            { method: "GET", path: "/api/users/:id", description: "Get user details by ID" },
            { method: "GET", path: "/api/transactions/user/:userId", description: "Get user transactions by filters" },
            { method: "GET", path: "/api/transactions/details", description: "Get transactions with user details" },
        ],
    });
};
