const express = require('express');
const router = express.Router();

const {BlogPosts} = require('./models');

// we're going to add some items to BlogPosts
// so there's some data to look at. Note that 
// normally you wouldn't do this. Usually your
// server will simply expose the state of the
// underlying database.
BlogPosts.create('Blog post 1', 'This is the first blog post', 'By John');
BlogPosts.create('Blog post 2', 'This is the second blog post', 'By Joe');
BlogPosts.create('Blog post 3', 'This is the third blog post', 'By Jordan');

// when the root of this route is called with GET, return
// all current BlogPosts items by calling `BlogPosts.get()`
router.get('/', (req, res) => {
  Blog
  .find()
  .then(BlogPosts => {
    res.json({
      BlogPosts: BlogPosts.map(
        (Blog) => Blog.serialize())
      });
    })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
});
});

// can also request by ID
router.get('/:id', (req, res) => {
  Blog
    .findById(req.params.id)
    .then(Blog =>res.json(Blog.serialize()))
    .catch(err => {
      console.error(err);
        res.status(500).json({message: 'Internal server error'})
    });
});

//Query
router.get('/', (req, res) => {
  const filters = {};
  const queryableFields = ['title', 'author'];
  queryableFields.forEach(field => {
      if (req.query[field]) {
          filters[field] = req.query[field];
      }
  });
  Blog
      .find(filters)
      .then(blogPosts => res.json(
          blogPosts.map(Blog => blogPosts.serialize())
      ))
      .catch(err => {
          console.error(err);
          res.status(500).json({message: 'Internal server error'})
      });
});

//Post request
router.post('/', (req, res) => {
    // ensure `title` and `budget` are in request body
    const requiredFields = ['title', 'content','author'];
    for (let i=0; i<requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`
        console.error(message);
        return res.status(400).send(message);
      }
    }
  
    Blog
      .create({
      title: req.body.title, 
      content: req.body.content, 
      author: req.body.author
       })
       .then( 
    Blog => res.status(201).json(blog.serialize()));
  });

// when PUT request comes in with updated item, ensure has
// required fields. also ensure that item id in url path, and
// item id in updated item object match. if problems with any
// of that, log error and send back status code 400. otherwise
// call `BlogPosts.update` with updated item.
router.put('/:id', (req, res) => {
    const requiredFields = ['id','title', 'content','author', 'publishDate'];
    for (let i=0; i<requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`
        console.error(message);
        return res.status(400).send(message);
      }
    }
  
    if (req.params.id !== req.body.id) {
      const message = `Request path id (${
        req.params.id
      }) and request body id ``(${req.body.id}) must match`;
      console.error(message);
      return res.status(400).send(message);
    }
    console.log(`Updating blog post list item \`${req.params.id}\``);
    BlogPosts.update({
      id: req.params.id,
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      publishDate: req.body.publishDate
    });
    res.status(204).end();
  });

// when DELETE request comes in with an id in path,
// try to delete that item from BlogPosts.
  router.delete('/:id', (req, res) => {
    BlogPosts.delete(req.params.id);
    console.log(`Deleted blog post list item \`${req.params.id}\``);
    res.status(204).end();
  });
  
  module.exports = router;
