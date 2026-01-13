const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./routes");
const { notFound, errorHandler } = require("./middleware/error.middleware");

const app = express();

// Core middleware
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

// Health
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Routes
app.use("/api", routes);

// 404 + Error middleware (order matters)
app.use(notFound);
app.use(errorHandler);

module.exports = { app };
