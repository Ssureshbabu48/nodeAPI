//This file will contain only the routes access. The actual content will be delivered through the controllers directory.
//The routes file becomes middleware in the application.

const express = require('express');
const validator = require('../validators'); //Note: index files are default selected by name and don't need to be noted in path

// Old version of below line: const postController = require('../controllers/post');
const {getPosts, createPost} = require('../controllers/post');

const router = express.Router();

/*Old version of requests: 
router.get('/', postController.getPosts);
router.post('/post', validator.createPostValidator, postController.createPost);
//createPostValidator comes from the validator folder and checks the post requirements before creating the post.
*/

//New version of requests:
router.get('/', getPosts);
router.post('/post', validator.createPostValidator, createPost);

module.exports = router;

