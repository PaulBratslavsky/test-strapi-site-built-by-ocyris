
const url = "https://cinnamyl-lonny-decompressive.ngrok-free.dev/api/tags?status=published&pagination[limit]=1";
const headers = {};
(async () => {
  try {
    const res = await fetch(url, { headers });
    const text = await res.text();
    // Strip long string values to keep structure but save context
    const parsed = JSON.parse(text);
    const strip = (obj) => {
      if (Array.isArray(obj)) return obj.map(strip);
      if (obj && typeof obj === 'object') {
        const r = {};
        for (const [k, v] of Object.entries(obj)) {
          r[k] = strip(v);
        }
        return r;
      }
      if (typeof obj === 'string' && obj.length > 200) {
        return obj.substring(0, 200) + '...[truncated]';
      }
      return obj;
    };
    process.stdout.write(JSON.stringify({ status: res.status, body: JSON.stringify(strip(parsed)) }));
  } catch (e) {
    process.stdout.write(JSON.stringify({ status: 0, body: e.message }));
  }
})();
