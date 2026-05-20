/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV !== "production";

const ContentSecurityPolicy = `
  default-src 'self';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';

  img-src 'self' data: blob: https://cdn.sanity.io;
  font-src 'self' data:;

  script-src 'self' ${isDev ? "'unsafe-inline' 'unsafe-eval'" : ""};

  style-src 'self' 'unsafe-inline';

  connect-src 'self'
    https://cdn.sanity.io
    https://api.resend.com
    ${isDev ? "ws: wss:" : ""};

  object-src 'none';
  upgrade-insecure-requests;
`
    .replace(/\n/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy,
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;