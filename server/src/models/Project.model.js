import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  fullDescription: { type: String },
  industry: {
    type: String,
    required: true,
    enum: ['Cafe', 'Gym', 'Salon', 'Restaurant', 'Clinic', 'Retail', 'Education', 'Other'],
  },
  tags: [{ type: String }],
  thumbnail: { type: String, required: true },
  images: [{ type: String }],
  video: { type: String, default: null },
  liveUrl: { type: String, default: null },
  isCaseStudy: { type: Boolean, default: false },
  caseStudy: {
    problem: { type: String },
    solution: { type: String },
    result: { type: String },
  },
  isVisible: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
