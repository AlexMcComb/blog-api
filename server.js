const express = require('express');
// we'll use morgan to log the HTTP layer
const morgan = require('morgan');
// we'll use body-parser's json() method to 
// parse JSON data sent in requests to this app
const bodyParser = require('body-parser');

// we import the BlogPosts model, which we'll
// interact with in our GET endpoint
const {BlogPosts} = require('./models');

const jsonParser = bodyParser.json();
const app = express();

// log the http layer
app.use(morgan('common'));

// we're going to add some items to ShoppingList
// so there's some data to look at. Note that 
// normally you wouldn't do this. Usually your
// server will simply expose the state of the
// underlying database.
BlogPosts.create('Blog post 1', 'This is the first blog post', 'By John');
BlogPosts.create('Blog post 2', 'This is the second blog post', 'By Joe');
BlogPosts.create('Blog post 3', 'This is the third blog post', 'By Jordan');

// when the root of this route is called with GET, return
// all current ShoppingList items by calling `ShoppingList.get()`
app.get('/blog-posts', (req, res) => {
  res.json(BlogPosts.get());
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});