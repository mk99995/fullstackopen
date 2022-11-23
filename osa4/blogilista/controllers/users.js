const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  console.log(request.body);

  const existingUser = await User.findOne({ username });

  if (password.length < 4) {
    console.log("here");
    return response.status(400).json({
      error: "password must be at least 3 letters long",
    });
  }
  if (existingUser) {
    return response.status(400).json({
      error: "username must be unique",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });
  console.log(user);

  const savedUser = await user.save();
  console.log(savedUser);

  response.status(201).json(savedUser);
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    url: 1,
    likes: 1,
  });
  console.log(users);
  response.json(users);
});

module.exports = usersRouter;
