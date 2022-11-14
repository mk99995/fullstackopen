const listHelper = require("../utils/list_helper");

describe("dummy", () => {
  test("dummy returns one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});

describe("favorite", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

  const listWhithFiveBlogs = [
    {
      _id: "5a422aaa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },

    {
      _id: "5a422aa71bs54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Ed Di",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 0,
      __v: 0,
    },
    {
      _id: "5a422aa71bd54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Ed Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 7,
      __v: 0,
    },
    {
      _id: "5a422aa71bf54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Asd",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 300,
      __v: 0,
    },
    {
      _id: "5a422aa71gb54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger C. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

  test("one blog", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual(listWithOneBlog[0]);
  });

  test("five blogs", () => {
    const result = listHelper.favoriteBlog(listWhithFiveBlogs);
    expect(result).toEqual(listWhithFiveBlogs[3]);
  });

  test("no blogs", () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toEqual(undefined);
  });
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
});
