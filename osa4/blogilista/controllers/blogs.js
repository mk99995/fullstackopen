const blogsRouter = require("express").Router();
const app = require("../app");
// const { collection } = require("../models/blog");
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
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
  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then((updatedBlog) => {
      response.json(updatedBlog);
    })
    .catch((error) => next(error));
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  console.log(blog.title === undefined);
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

  await blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = blogsRouter;
