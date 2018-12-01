const express = require('express');
// we'll use morgan to log the HTTP layer
const morgan = require('morgan');

//Express router to modularize routes
const blogPostsRouter = require('./blogPostsRouter');
const app = express();



app.use(morgan('common'));

app.use(express.json());

// when requests come into `/blog-posts`, we'll route them to the express
// router instances we've imported. Remember,
// these router instances act as modular, mini-express apps.
app.use('/blog-posts', blogPostsRouter);


app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});