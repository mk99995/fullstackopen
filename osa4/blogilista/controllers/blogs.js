const blogsRouter = require("express").Router();
const app = require("../app");
// const { collection } = require("../models/blog");
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { request } = require("../app");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("author", {
    username: 1,
    name: 1,
  });
  response.json(blogs);

  //   Blog.find({}).then((blogs) => {
  //     response.json(blogs);
  //   });
});

blogsRouter.delete(`/:id`, async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", (request, response, next) => {
  const body = request.body;
  const blog = {
    likes: body.likes,
  };

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then((updatedBlog) => {
      response.json(updatedBlog);
    })
    .catch((error) => next(error));
});

const getTokenForm = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const token = getTokenForm(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: user._id,
    url: body.url,
    likes: body.likes,
  });

  // console.log(blog.title === undefined);
  if (
    blog.title === undefined ||
    blog.author === undefined ||
    blog.url === undefined
  ) {
    return response.status(400).json({ error: "content missing" });
  }

  if (blog.likes === undefined) {
    blog.likes = 0;
  }

  savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.json(savedBlog.toJSON());

  // await blog.save().then((result) => {
  //   response.status(201).json(result);
  // });
});

module.exports = blogsRouter;
