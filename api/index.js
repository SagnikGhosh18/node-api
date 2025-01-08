module.exports = async (req, res) => {
    res.status(200).json({
        message: "API is live and running!",
        endpoints: [
            { method: "GET", path: "/api/users", description: "Get user details by ID" },
            {
                method: "GET",
                path: "/api/transactions",
                description: "Get transactions by filters or user ID",
            },
            {
                method: "GET",
                path: "/api/transactions/details",
                description: "Get transactions with user details by filters",
            },
        ],
    });
};
