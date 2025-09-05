# 🖼️ Next.js Image Loading Fix Guide

## Problem Description
Next.js Image component fails to load WordPress images in production due to:
1. Circular references (Next.js → Caddy → WordPress → Next.js)
2. Missing image domain configuration
3. Docker network isolation

## Solution Components

### 1. Image URL Transformation (`frontend/src/utils/imageUrl.ts`)
```typescript
// Transforms public URLs to internal Docker network URLs
// https://modeo.pl → http://wordpress (inside Docker)
export function transformImageUrl(url: string): string {
  if (!url) return url;
  
  if (config.isProduction() || config.isStaging()) {
    return url
      .replace('https://modeo.pl', 'http://wordpress')
      .replace('https://nextmodeo.sitefy.pl', 'http://wordpress');
  }
  
  return url;
}
```

### 2. Next.js Configuration (`frontend/next.config.prod.js`)
```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'modeo.pl',
      pathname: '/wp-content/uploads/**',
    },
    {
      protocol: 'http',
      hostname: 'wordpress',  // Internal Docker hostname
      pathname: '/wp-content/uploads/**',
    },
  ],
}
```

### 3. API Integration Updates
Update shop API to transform image URLs:
- `frontend/src/features/shop/api/shop.api.ts`
- `frontend/src/app/sklep/[slug]/page.tsx`

### 4. Docker Volume Configuration
```yaml
wordpress:
  volumes:
    - ./backend/wp-content:/var/www/html/wp-content
    # NOT separate volumes for uploads!
```

### 5. Caddy Configuration
```
@wp_assets path /wp-content/* /wp-includes/*
handle @wp_assets {
    reverse_proxy wordpress:80 {
        header_up Host {host}
        header_up X-Real-IP {remote_host}
        header_up X-Forwarded-For {remote_host}
        header_up X-Forwarded-Proto {scheme}
    }
}
```

## Deployment Steps

1. **Copy image transformation utility**
   ```bash
   scp frontend/src/utils/imageUrl.ts root@VPS:/path/to/frontend/src/utils/
   ```

2. **Update API files**
   ```bash
   scp frontend/src/features/shop/api/shop.api.ts root@VPS:/path/to/frontend/src/features/shop/api/
   scp frontend/src/app/sklep/[slug]/page.tsx root@VPS:/path/to/frontend/src/app/sklep/[slug]/
   ```

3. **Update configurations**
   ```bash
   scp frontend/next.config.prod.js root@VPS:/path/to/frontend/
   scp Caddyfile.prod root@VPS:/path/to/
   ```

4. **Rebuild and restart**
   ```bash
   docker compose build nextjs
   docker compose up -d
   ```

## Verification

1. Check direct image access:
   ```bash
   curl -I https://modeo.pl/wp-content/uploads/2025/09/[image].jpg
   ```
   Should return `HTTP/2 200`

2. Check Next.js logs:
   ```bash
   docker compose logs nextjs | grep -i image
   ```
   Should NOT show "upstream image response failed"

3. Test in browser:
   - Open https://modeo.pl/sklep
   - Images should load immediately
   - Check Network tab in DevTools

## Troubleshooting

### Images still not loading?

1. **Clear Next.js cache:**
   ```bash
   docker compose exec nextjs rm -rf .next/cache
   docker compose restart nextjs
   ```

2. **Verify uploads exist:**
   ```bash
   docker exec production-wordpress-1 ls /var/www/html/wp-content/uploads/2025/09/
   ```

3. **Check permissions:**
   ```bash
   sudo chown -R www-data:www-data backend/wp-content/uploads/
   sudo chmod -R 755 backend/wp-content/uploads/
   ```

4. **Test without Next.js optimization:**
   Use regular `<img>` tag instead of Next.js `<Image>` component as temporary test

### Common Mistakes

❌ Using `--delete` with rsync
❌ Separate Docker volumes for uploads
❌ Missing internal Docker hostname in next.config
❌ Not rebuilding Next.js after config changes
❌ Forgetting to restart containers

### Quick Fix Script

```bash
#!/bin/bash
# Emergency image fix
cd ~/production
docker compose down
sudo chown -R www-data:www-data backend/wp-content/uploads/
docker compose build nextjs
docker compose up -d
```