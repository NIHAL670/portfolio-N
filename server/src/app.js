import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import session from 'express-session';
import passport from './config/passport.js';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.routes.js';
import projectRoutes from './routes/project.routes.js';
import inquiryRoutes from './routes/inquiry.routes.js';
import blogRoutes from './routes/blog.routes.js';
import auditRoutes from './routes/audit.routes.js';
import errorHandler from './middlewares/errorHandler.js';

import Project from './models/Project.model.js';
import BlogPost from './models/BlogPost.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === 'production',
  },
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/audit', auditRoutes);

// robots.txt
app.get('/robots.txt', (_req, res) => {
  res.type('text/plain').send(
    `User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: ${process.env.CLIENT_URL}/sitemap.xml`
  );
});

// sitemap.xml
app.get('/sitemap.xml', async (_req, res) => {
  try {
    const baseUrl = process.env.CLIENT_URL;
    const projects = await Project.find({ isVisible: true }).select('slug');
    const posts = await BlogPost.find({ isPublished: true }).select('slug');

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    const staticPages = ['', '/portfolio', '/about', '/contact', '/blog', '/audit',
      '/gym-websites', '/cafe-websites', '/salon-websites', '/restaurant-websites', '/clinic-websites'];

    staticPages.forEach((page) => {
      xml += `  <url><loc>${baseUrl}${page}</loc></url>\n`;
    });

    projects.forEach((p) => {
      xml += `  <url><loc>${baseUrl}/case-study/${p.slug}</loc></url>\n`;
    });

    posts.forEach((p) => {
      xml += `  <url><loc>${baseUrl}/blog/${p.slug}</loc></url>\n`;
    });

    xml += '</urlset>';
    res.type('application/xml').send(xml);
  } catch (error) {
    res.status(500).send('Error generating sitemap');
  }
});

// Error handler
app.use(errorHandler);

export default app;
