const Post = require('../models/post');
exports.getPosts = (req, res) => {
    
    // The following next few lines are for manual responses for get requests made to localhost:8080
    /* res.json({
        posts: [
            {title: 'First post'},
            {title: "Second post"}
        ]
    }); */

    //Next line gets all the posts from the database using capital Post module and find method and then returns them when a get request is made to localhost:8080.
    //const posts = Post.find().then((posts) => {
    
    //Next line replaces previous comment on line 12 and filters the fields desired from the database.
    const posts = Post.find().select("_id title body").then((posts) => {   
    
        // res.status(200).json({posts: posts});
       //Replace above line without 200 because express framework gives 200 by default if successful.
        res.json({posts: posts}); //Note res.json({posts}); also works when key and value have same name.
    }).catch(err => console.log(err));
};

exports.createPost = (req, res) => {
    const post = new Post(req.body);
 
    // console.log("Creating Post: ", req.body);
    /* post.save((err, result) => {
         if(err) {
            return res.status(400).json({
                error: err
            });
        } 

        //No longer need to confirm error here because of postValidator in index.js to handle errors.
        res.status(200).json({
            post: result
        });
       }) */

    post.save().then(result => {
        res.json({
            post: result
        });   
    });
};