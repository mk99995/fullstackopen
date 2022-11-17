const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const { insertMany } = require("../models/blog");
const api = supertest(app);
const Blog = require("../models/blog");

console.log(Blog);

const initialBlogs = [
  {
    title: "asd",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Ed Di",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 0,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Ed Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Asd",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 300,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger C. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

describe("gets", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there is correct amount of blogs", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test("the first blog is about asd", async () => {
    const response = await api.get("/api/blogs");

    const contents = response.body.map((r) => r.title);

    expect(contents).toContain("asd");
  });
});

describe("posts", () => {
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "zxcl",
      author: "Ed Di",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 0,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    const titles = response.body.map((r) => r.title);

    expect(response.body).toHaveLength(initialBlogs.length + 1);
    expect(titles).toContain("zxcl");
  });

  test("blog without title is not added", async () => {
    const newBlog = {
      _id: "5a422aa71b54a676234d17f8",
      //title: "dasds",
      //author: "Edsger W. Dijkstra",
      //url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    };
    await api.post("/api/blogs").send(newBlog).expect(400);
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test("blog without likes has 0 likes", async () => {
    const newBlog = {
      _id: "5a422aa71b54a676234d17f8",
      title: "dasds",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      //likes: 5,
      __v: 0,
    };
    await api.post("/api/blogs").send(newBlog).expect(201);
    const response = await api.get("/api/blogs");
    expect(response.body[response.body.length - 1].likes).toBe(0);
  });
});

describe("put", () => {
  test("blog can be modified", async () => {
    const blogs = await Blog.find({});
    let blogsd = blogs.map((blog) => blog.toJSON());

    liked = blogsd[0];

    await api.put(`/api/blogs/${liked.id}`).expect(204);
  });
});

describe("delete", () => {
  test("blog can be deleted", async () => {
    const blogs = await Blog.find({});
    let blogsd = blogs.map((blog) => blog.toJSON());

    deleted = blogsd[0];

    await api.delete(`/api/blogs/${deleted.id}`).expect(204);
    blogsAfter = await Blog.find({});
    blogsAfter = blogsAfter.map((blog) => blog.toJSON());

    expect(blogsAfter).toHaveLength(blogsd.length - 1);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
