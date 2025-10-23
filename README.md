# Fastify with Scalar on Vercel

This example demonstrates how to deploy a Fastify server with [Scalar API Reference](https://scalar.com/) integration on [Vercel](https://vercel.com/).

## Problem

By default, Vercel does not bundle the required JavaScript file from the Scalar package (`standalone.js`). This can cause runtime errors when deploying your Fastify server with Scalar on Vercel.

## Solution

To fix this, add the following configuration to your [`vercel.json`](vercel.json):

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/api/index.js"
    }
  ],
  "functions": {
    "api/**/*.js": {
      "includeFiles": "node_modules/@scalar/fastify-api-reference/dist/js/standalone.js"
    }
  }
}
```

This ensures that Vercel includes the necessary Scalar file when bundling your serverless function.
