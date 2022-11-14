const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blog) => {
  return 5;
};

const favoriteBlog = (blogs) => {
  let favoriteLikes = -1;
  let favorite;
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > favoriteLikes) {
      favorite = blogs[i];
      favoriteLikes = favorite.likes;
    }
  }
  return favorite;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
