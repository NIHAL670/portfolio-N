const { ADMIN_EMAIL } = process.env;

export const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user?.email === ADMIN_EMAIL) {
    return next();
  }
  return res.status(403).json({ error: 'Forbidden: Admin access only.' });
};
