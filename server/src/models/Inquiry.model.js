import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  businessName: { type: String },
  industry: { type: String },
  message: { type: String, required: true },
  budget: { type: String },
  source: {
    type: String,
    enum: ['quote_form', 'contact_form', 'chatbot'],
    default: 'contact_form',
  },
  status: {
    type: String,
    enum: ['new', 'in_progress', 'closed'],
    default: 'new',
  },
  createdAt: { type: Date, default: Date.now },
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);
export default Inquiry;
