import axios from 'axios';
import * as cheerio from 'cheerio';

export const runAudit = async (url) => {
  const results = {
    url,
    checks: {},
    score: 0,
    responseTime: 0,
  };

  let totalChecks = 0;
  let passedChecks = 0;

  // HTTPS check
  totalChecks++;
  const isHttps = url.startsWith('https://');
  results.checks.https = { passed: isHttps, label: 'HTTPS Enabled' };
  if (isHttps) passedChecks++;

  // Fetch the page
  const start = Date.now();
  let html = '';
  try {
    const response = await axios.get(url, { timeout: 10000, maxRedirects: 5 });
    html = response.data;
    results.responseTime = Date.now() - start;
  } catch (error) {
    results.responseTime = Date.now() - start;
    results.checks.reachable = { passed: false, label: 'Website Reachable' };
    results.score = 0;
    return results;
  }

  totalChecks++;
  results.checks.reachable = { passed: true, label: 'Website Reachable' };
  passedChecks++;

  const $ = cheerio.load(html);

  // Response time
  totalChecks++;
  const responseOk = results.responseTime < 3000;
  results.checks.responseTime = {
    passed: responseOk,
    value: results.responseTime,
    label: `Response Time: ${results.responseTime}ms`,
  };
  if (responseOk) passedChecks++;

  // Mobile viewport
  totalChecks++;
  const viewport = $('meta[name="viewport"]').attr('content');
  const hasViewport = !!viewport;
  results.checks.mobileViewport = { passed: hasViewport, label: 'Mobile Viewport Tag' };
  if (hasViewport) passedChecks++;

  // Title tag
  totalChecks++;
  const title = $('title').text().trim();
  const hasTitle = title.length > 0;
  const titleLengthOk = title.length >= 30 && title.length <= 65;
  results.checks.titleTag = {
    passed: hasTitle && titleLengthOk,
    value: title.length,
    label: `Title Tag (${title.length} chars)`,
  };
  if (hasTitle && titleLengthOk) passedChecks++;

  // Meta description
  totalChecks++;
  const metaDesc = $('meta[name="description"]').attr('content') || '';
  const hasMetaDesc = metaDesc.length > 0;
  results.checks.metaDescription = { passed: hasMetaDesc, label: 'Meta Description' };
  if (hasMetaDesc) passedChecks++;

  // Images without alt tags
  totalChecks++;
  const allImages = $('img').length;
  const imagesWithoutAlt = $('img:not([alt]), img[alt=""]').length;
  const allImagesHaveAlt = imagesWithoutAlt === 0;
  results.checks.imageAlts = {
    passed: allImagesHaveAlt,
    value: imagesWithoutAlt,
    total: allImages,
    label: `Images without alt tags: ${imagesWithoutAlt}`,
  };
  if (allImagesHaveAlt) passedChecks++;

  results.score = Math.round((passedChecks / totalChecks) * 100);
  return results;
};
