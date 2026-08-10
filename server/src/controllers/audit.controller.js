import { runAudit } from '../utils/auditHelpers.js';

export const auditWebsite = async (req, res, next) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    let normalizedUrl = url.trim();
    if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    const results = await runAudit(normalizedUrl);
    res.json(results);
  } catch (error) {
    next(error);
  }
};
