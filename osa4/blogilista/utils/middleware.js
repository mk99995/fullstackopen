const logger = require("./logger");
const jwt = require("jsonwebtoken");

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const getTokenForm = (request, response, next) => {
  const authorization = request.get("authorization");
  console.log(authorization);
  const token =
    authorization && authorization.toLowerCase().startsWith("bearer ")
      ? authorization.substring(7)
      : null;

  if (!request.headers.authorization) {
    return response.status(401).json({ error: "Authorization required" });
  }
  if (token === "null") {
    return response.status(401).json({ error: "token missing" });
  }
  //verify
  const payload = jwt.verify(token, process.env.SECRET);
  if (!payload) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  console.log("1|| ", payload.id, " ||");
  console.log("1|| ", token, " ||");
  request.userId = payload.id;
  request.token = token;
  next();
};

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({
      error: "malformatted id",
    });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({
      error: error.message,
    });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token",
    });
  }

  logger.error(error.message);

  next(error);
};

module.exports = { errorHandler, getTokenForm };
