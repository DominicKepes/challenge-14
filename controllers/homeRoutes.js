const router = require('express').Router();
const { Post, Comment, User } = require('../models/');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User, attributes: ['username'] }],
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        // console.log("----------------------------------------------------------------------------------------------------")
        // console.log(posts[0].createdAt)                           //troubleshooting
        posts.forEach(elm => {
            // console.log(elm.createdAt)
            elm.createdAt = String(elm.createdAt).split(/(?:[01]?[0-9]|2[0-4]):/)[0].trim()
            // elm.createdAt = t[0]
        });
        // console.log("----------------------------------------------------------------------------------------------------")

        res.render('home', { posts });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
