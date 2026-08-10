import User from '../models/User.model.js';

const { CLIENT_URL } = process.env;

export const googleAuth = (passport) => passport.authenticate('google', { scope: ['profile', 'email'] });

export const googleCallback = (passport) =>
  passport.authenticate('google', {
    failureRedirect: `${CLIENT_URL}/admin/login?error=unauthorized`,
  });

export const googleCallbackRedirect = (req, res) => {
  res.redirect(`${CLIENT_URL}/admin/dashboard`);
};

export const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.redirect(CLIENT_URL || '/');
    });
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.validatePassword(password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Passport's req.login to establish session
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Login failed' });
      }
      return res.json({ user, isAdmin: true });
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getMe = (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ user: req.user, isAdmin: true });
  }
  return res.json({ user: null, isAdmin: false });
};
