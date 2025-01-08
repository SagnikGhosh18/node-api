const express = require("express");
const router = express.Router();
const { getUserById } = require("../src/controllers/userController");

router.get("/:id", getUserById);

module.exports = async (req, res) => {
    const app = express();
    app.use("/users", router);
    return app(req, res);
};
