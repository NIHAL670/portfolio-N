import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
  ADMIN_EMAIL,
} = process.env;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      const email = profile.emails?.[0]?.value;
      if (email === ADMIN_EMAIL) {
        const user = {
          id: profile.id,
          email,
          name: profile.displayName,
          photo: profile.photos?.[0]?.value || null,
        };
        return done(null, user);
      }
      return done(null, false, { message: 'Unauthorized email' });
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

export default passport;
