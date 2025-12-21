---
origin: web
category: dev
url: https://www.netlify.com/
description: Modern web hosting and deployment platform
use_state: active
rating: 5
sidebar_custom_props:
    image: /images/netlify.png
---

# Netlify

**[Netlify](https://www.netlify.com/)** is a cloud platform for deploying and hosting modern web applications. It pioneered the Jamstack approach: static sites, serverless functions, and edge computing. Connect a Git repository, and Netlify handles builds, deploys, previews, and CDN distribution automatically.

## Core concept

Traditional hosting: upload files, configure web server, manage scaling.

Netlify model:
1. Push code to Git
2. Netlify builds automatically
3. Deploys to global CDN
4. Every branch gets a preview URL
5. Merge to main → production deploys

No server management. No infrastructure configuration.

## What Netlify provides

| Feature | Description |
|---------|-------------|
| **Continuous Deployment** | Auto-build on git push |
| **Preview Deploys** | Unique URL per pull request |
| **Global CDN** | Edge distribution worldwide |
| **Serverless Functions** | Backend logic without servers |
| **Edge Functions** | Logic at CDN edge (Deno-based) |
| **Forms** | Handle submissions without backend |
| **Identity** | User authentication service |
| **Split Testing** | A/B test different branches |

## Getting started

### Connect Git repository
1. Sign up at [netlify.com](https://www.netlify.com/)
2. "Add new site" → "Import an existing project"
3. Choose Git provider
4. Configure build settings
5. Deploy

### CLI
```powershell
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

## Build configuration (netlify.toml)

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

## Serverless Functions

```javascript
// netlify/functions/hello.js
export async function handler(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello!" }),
    headers: { "Content-Type": "application/json" }
  };
}
```

Access at `/.netlify/functions/hello`

## Edge Functions

Run at CDN edge for low latency:

```typescript
// netlify/edge-functions/geo.ts
export default async (request: Request, context: Context) => {
  return new Response(`Visiting from ${context.geo.country}`);
};

export const config = { path: "/geo" };
```

Benefits: runs on node closest to user, fast cold starts with Deno runtime.

## Forms (no backend needed)

```html
<form name="contact" netlify>
  <input name="email" type="email" required />
  <textarea name="message"></textarea>
  <button type="submit">Send</button>
</form>
```

Submissions appear in dashboard with notification options.

## Framework support

Auto-detected configuration:

| Framework | Publish Dir |
|-----------|-------------|
| Next.js | `.next` |
| Vite (React/Vue) | `dist` |
| Astro | `dist` |
| SvelteKit | `build` |

## Common workflows

### Preview deploys
Every PR gets unique URL: `deploy-preview-42--your-site.netlify.app`

### Deploy hooks
Trigger builds from external services:
```powershell
curl -X POST https://api.netlify.com/build_hooks/your-hook-id
```

## Additional features

- **AI Gateway**: Call AI models from Functions without managing API keys
- **Observability**: Monitor requests, bandwidth, and function performance
- React Router 7 apps can deploy to Edge Functions by default

## Comparison with Vercel

| Aspect | Netlify | Vercel |
|--------|---------|--------|
| Focus | General Jamstack | Next.js optimized |
| Edge Functions | Deno-based | Node/Edge runtime |
| Forms | Built-in | Third-party |

## Summary

Netlify simplifies web deployment: push code, get production site on global CDN. Preview deploys, serverless functions, and edge computing are built in. Ideal for Jamstack sites and frontend applications needing lightweight backend logic.
