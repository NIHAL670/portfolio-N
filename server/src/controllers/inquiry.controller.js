import Inquiry from '../models/Inquiry.model.js';
import { sendInquiryNotification } from '../utils/sendEmail.js';

export const createInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.create(req.body);

    try {
      await sendInquiryNotification(inquiry);
    } catch (emailError) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Email send failed:', emailError.message);
      }
    }

    res.status(201).json({ message: 'Inquiry submitted successfully', inquiry });
  } catch (error) {
    next(error);
  }
};

export const getInquiries = async (req, res, next) => {
  try {
    const { status, industry, source } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (industry) filter.industry = industry;
    if (source) filter.source = source;

    const inquiries = await Inquiry.find(filter).sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    next(error);
  }
};

export const updateInquiryStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!inquiry) return res.status(404).json({ error: 'Inquiry not found' });
    res.json(inquiry);
  } catch (error) {
    next(error);
  }
};

export const deleteInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) return res.status(404).json({ error: 'Inquiry not found' });
    res.json({ message: 'Inquiry deleted' });
  } catch (error) {
    next(error);
  }
};
