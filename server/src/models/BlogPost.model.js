import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: { type: String },
  coverImage: { type: String },
  industry: { type: String },
  metaTitle: { type: String },
  metaDescription: { type: String },
  isPublished: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);
export default BlogPost;
