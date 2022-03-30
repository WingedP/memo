import PostMessage from '../models/postMessage.js';
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 8;
        // get the index of the 1st page for every page; eg. 0-> 8 => index === 0; 9 -> 17 => index === 9;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex); // id to sort newest first
        res.status(200).json({ posts: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// query: /posts?page=1
// params: /posts/123 // to get specific things
export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query; // send both or either search OR tags

    try {
        const title = new RegExp(searchQuery, "i"); // i means lowercase => remove all uppercases

        // mongoose way of writing: get posts with matched title or tags 
        const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });
        res.status(200).json(posts); // ? why not just .json(posts)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    const post = req.body;
    // const newPost = new PostMessage(post);
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() }); // why do we need createdAt here?

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updatePost = async (req, res) => { // why no try catch
    const { id: _id } = req.params; // destructuring and renaming property?
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that ID.');
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
    res.json(updatedPost);
};

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No post with that ID.');
    }

    await PostMessage.findByIdAndRemove(id);
    res.json({ message: 'Post deleted successfully.' });
};

export const likePost = async (req, res) => {
    const { id } = req.params;

    // if user is not authenticated
    if (!req.userId) return res.json({ message: 'Unauthenticated' });

    // check if the post that user liked exists
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No post with that ID.');
    }

    const post = await PostMessage.findById(id);

    // check if user already like or not. Can use .some()
    const index = post.likes.findIndex((id) => { return id === String(req.userId); }); // String() => same as .toString();
    if (index === -1) {
        post.likes.push(req.userId); // like
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId)); // unlike
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.json(updatedPost);
};
