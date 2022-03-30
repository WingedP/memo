import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    user: String,
    creator: String,
    selectedFile: String,
    visited: Boolean,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const PostMessage = mongoose.model('PostMessage', postSchema);
export default PostMessage;