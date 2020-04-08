exports.createPostValidator = (req, res, next) => {
    //title Validation
    req.check('title', "Write a title").notEmpty();
    req.check('title', 'Title must be betweeen 4 and 150 characters').isLength({
        min: 4,
        max: 150
    });

    //body Validation
    req.check('body', "Write a body").notEmpty();
    req.check('body', 'Body must be betweeen 4 and 2000 characters').isLength({
        min: 4,
        max: 2000
    });

    //check for errors
    const errors = req.validationErrors();
    //if error, show the first one as they happen
    if(errors) {
        const firstError = errors.map((error) => error.msg)[0]; //Note the curly braces in function cannot be included here to index error message properly.
        return res.status(400).json({
            error: firstError
        });
    }
    // Proceed to next middleware
    next();
};