// Simple proxy for Vercel: forwards requests to the real backend to avoid CORS
// Place this at /api/proxy/<...path> and call it from the frontend as /api/proxy
const BACKEND = 'https://himalayan-vista-backend.onrender.com';

function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (c) => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
}

export default async function handler(req, res) {
  try {
    // build target URL
    const pathParts = req.query.path || [];
    const path = Array.isArray(pathParts) ? pathParts.join('/') : String(pathParts);
    const targetUrl = `${BACKEND}/${path}${req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : ''}`;

    // collect body for non-GET
    let body;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      body = await streamToBuffer(req);
    }

    // forward headers but avoid host
    const headers = { ...req.headers };
    delete headers.host;
    // perform fetch
    const resp = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: body && body.length ? body : undefined,
      redirect: 'manual',
    });

    // copy response headers (skip hop-by-hop)
    const hopByHop = ['transfer-encoding', 'connection', 'keep-alive', 'proxy-authenticate', 'proxy-authorization', 'te', 'trailers', 'upgrade'];
    resp.headers.forEach((val, key) => {
      if (hopByHop.includes(key.toLowerCase())) return;
      res.setHeader(key, val);
    });

    res.statusCode = resp.status;
    const arrayBuffer = await resp.arrayBuffer();
    res.end(Buffer.from(arrayBuffer));
  } catch (err) {
    console.error('Proxy error:', err);
    res.statusCode = 502;
    res.end(JSON.stringify({ error: 'Bad gateway', details: String(err) }));
  }
}
