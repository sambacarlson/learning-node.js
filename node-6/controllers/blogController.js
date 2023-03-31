const Blog = require('../models/blog');
// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete


const blog_index = (req, res) => {
  Blog.find().sort({createdAt: -1}) //sort by decending order
    .then(result => {
      res.render('blogs/index', {title: 'all blogs', blogs: result});
    })
    .catch(err => console.log(err.message))
}

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('blogs/details', {title: 'blog details', blog: result})
    })
    .catch(err => console.log(err.message))
}

const blog_create_get = (req, res) => {
  res.render('blogs/create', {title: 'create new blog'});
}
const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then(result => res.redirect('/blogs'))
    .catch(err => console.log(err.message))
}
const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({redirect: '/blogs'})
    })
    .catch(err => console.log(err.message))
}


module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete
}