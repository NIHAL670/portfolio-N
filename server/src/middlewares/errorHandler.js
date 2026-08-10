const errorHandler = (err, _req, res, _next) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ error: 'Validation failed', details: messages });
  }

  if (err.code === 11000) {
    return res.status(409).json({ error: 'Duplicate entry. This record already exists.' });
  }

  if (err.name === 'MulterError') {
    return res.status(400).json({ error: err.message });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({ error: message });
};

export default errorHandler;
