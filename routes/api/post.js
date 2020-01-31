const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
const { check, validationResult } = require('express-validator');
const request = require('request');
const config = require('config');

// @route  POST api/post
// @dest   Create a post
// @access Private
router.post('/', [auth, [
    check('text', 'Text is required')
    .not()
    .isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

   try {
    const user = await User.findById(req.user.id).select('-password'); // minus password from user object

    const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
    });

    const post = await newPost.save();

    res.json(post);
   } catch (error) {
    console.error(error.message);
    res.status(500).json({msg: 'Server Error'});
   }
});

// @route  GET api/post
// @dest   Get all posts
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({date: -1});

        res.json(posts);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg: 'Server Error'});
    }
});

// @route  GET api/post/:id
// @dest   Get post by ID
// @access Private
router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({msg: 'Post not found'});
        }

        res.json(post);
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({msg: 'Post not found'});
        }
        res.status(500).json({msg: 'Server Error'});
    }
});

// @route  DELETE api/post/:id
// @dest   Delete post by ID
// @access Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({msg: 'Post not found'});
        }

        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'User not authorized'});
        }

        await post.remove();
        res.json({msg: 'Post removed'});
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({msg: 'Post not found'});
        }
        res.status(500).json({msg: 'Server Error'});
    }
});

// @route  PUT api/post/like/:id
// @dest   Like post
// @access Private
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({msg: 'Post not found'});
        }

        // Check if the post has already been liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(404).json({msg: 'Post already liked'});
        }

        post.likes.push({user: req.user.id });
        
        await post.save();

        res.json(post.likes);
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({msg: 'Post not found'});
        }
        res.status(500).json({msg: 'Server Error'});
    }
});

// @route  PUT api/post/unlike/:id
// @dest   Unlike post
// @access Private
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({msg: 'Post not found'});
        }

        // Check if the post has already been liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(404).json({msg: 'Post has not been liked yet'});
        }

        // Get remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);
        
        await post.save();

        res.json(post.likes);
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({msg: 'Post not found'});
        }
        res.status(500).json({msg: 'Server Error'});
    }
});

// @route  POST api/post/comment/:id
// @dest   Comment on a post
// @access Private
router.post('/comment/:id', [auth, [
    check('text', 'Text is required')
    .not()
    .isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

   try {
    const user = await User.findById(req.user.id).select('-password'); // minus password from user object
    const post = await Post.findById(req.params.id);

    const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
    };

    post.comments.push(newComment);

    await post.save();

    res.json(post.comments);
   } catch (error) {
    console.error(error.message);
    res.status(500).json({msg: 'Server Error'});
   }
});

// @route  DELETE api/post/comment/:id/:comment_id
// @dest   Delete comment on a post
// @access Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);

        if (!comment) {
            return res.status(404).json({msg: 'Comment not found'});
        }

        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'User not authorized'});
        }

        // Get remove index
        const removeIndex = post.comments
            .map(comment => comment._id.toString())
            .indexOf(req.params.comment_id);
        
        post.comments.splice(removeIndex, 1);
        
        await post.save();
        
        res.json(post.comments);
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({msg: 'Post not found'});
        }
        res.status(500).json({msg: 'Server Error'});
    }
});
module.exports = router;