const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
require("express-async-errors");
const middleware = require("./utils/middleware");
app.use(middleware.getTokenForm);

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

const mongoUrl = process.env.MONGODB_URI;
console.log(process.env.PORT);
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/login", loginRouter);

app.use(middleware.errorHandler);

module.exports = app;
