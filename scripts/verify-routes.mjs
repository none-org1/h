// ============================================================
// PF Claim Decoder — HTTP Route Verifier
// ============================================================

import http from 'http';

const routes = [
  '/',
  '/input',
  '/decode',
  '/verify',
  '/action',
  '/document',
  '/handoff',
];

function checkRoute(path) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          path,
          status: res.statusCode,
          ok: res.statusCode === 200,
          bytes: data.length,
        });
      });
    });

    req.on('error', (err) => {
      resolve({
        path,
        status: 'ERROR',
        ok: false,
        error: err.message,
      });
    });

    req.setTimeout(5000, () => {
      req.destroy();
      resolve({
        path,
        status: 'TIMEOUT',
        ok: false,
      });
    });
  });
}

console.log('\n--- Verifying All Application Routes on http://localhost:3000 ---');
for (const r of routes) {
  const result = await checkRoute(r);
  if (result.ok) {
    console.log(`  ✓ [HTTP ${result.status}] Route: ${result.path} (${result.bytes} bytes rendered)`);
  } else {
    console.log(`  ✗ [${result.status}] Route: ${result.path} - ${result.error || ''}`);
  }
}
console.log('-----------------------------------------------------------------\n');
