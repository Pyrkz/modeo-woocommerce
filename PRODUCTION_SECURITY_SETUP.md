# 🔒 Production Security Setup - Modeo E-commerce

**IMPORTANT:** This guide shows how to enable proper nonce security for production deployment.

## 🔧 Security Configuration

### Development vs Production

#### Development Mode (`WP_ENV = 'development'`)
- ✅ **Nonce check disabled** for easy testing
- ✅ **CORS enabled** for localhost:3000
- ✅ **Session management** via cookies
- ⚠️ **Lower security** for development convenience

#### Production Mode (`WP_ENV = 'production'`)
- 🔒 **Nonce validation required** for all Store API calls
- 🔒 **Proper authentication** enforced
- 🔒 **Security logging** enabled
- ✅ **Full CORS protection**

## 🚀 Switching to Production

### 1. Update Docker Compose
Use `docker-compose.prod.yml` instead of `docker-compose.yml`:

```bash
# Development
docker-compose up -d

# Production  
docker-compose -f docker-compose.prod.yml up -d
```

### 2. Environment Variables
The key difference is the `WP_ENV` variable:

```yaml
# Development
WORDPRESS_CONFIG_EXTRA: |
  define('WP_ENV', 'development');

# Production
WORDPRESS_CONFIG_EXTRA: |
  define('WP_ENV', 'production');
```

### 3. Frontend Configuration
The Next.js frontend automatically handles nonce authentication:

```typescript
// Development: No nonce required
// Production: Automatic nonce fetching and validation

import { makeAuthenticatedRequest } from '@/utils/nonce';

// This works in both dev and production
const response = await makeAuthenticatedRequest('/wp-json/wc/store/cart');
```

## 🔐 Security Features

### Nonce Management
- **Auto-generated nonces** with 12-hour cache
- **Automatic retry** on nonce expiration  
- **Fallback handling** for network issues
- **Development bypass** for easier testing

### CORS Protection
```php
$allowed_origins = [
    'http://localhost:3000',        // Dev Next.js
    'https://nextmodeo.sitefy.pl',  // Staging
    'https://modeo.pl',             // Production
    'https://www.modeo.pl'          // WWW variant
];
```

### Request Authentication
```typescript
// Automatic nonce headers in production
headers: {
  'X-WC-Store-API-Nonce': nonce,
  'Nonce': nonce,
  'Content-Type': 'application/json'
}
```

## 🧪 Testing Security

### Test Development Mode
```bash
curl -X POST "http://localhost:8080/wp-json/wc/store/cart/add-item" \
  -H "Content-Type: application/json" \
  -d '{"id": 123, "quantity": 1}' \
  --cookie-jar cookies.txt \
  --cookie cookies.txt
# Should work WITHOUT nonce
```

### Test Production Mode
```bash
# Get nonce first
NONCE=$(curl -s "http://localhost:8080/wp-json/wc/store/nonce" --cookie cookies.txt | jq -r '.nonce')

# Use nonce in request
curl -X POST "http://localhost:8080/wp-json/wc/store/cart/add-item" \
  -H "Content-Type: application/json" \
  -H "X-WC-Store-API-Nonce: $NONCE" \
  -d '{"id": 123, "quantity": 1}' \
  --cookie-jar cookies.txt \
  --cookie cookies.txt
# Should work WITH nonce
```

## 🚨 Security Monitoring

### Log Files
Production mode enables security logging:

```bash
# Check WordPress logs
docker-compose logs wordpress | grep "WC Store API"

# Check for cart updates
tail -f /var/log/wordpress/debug.log | grep "Cart item updated"
```

### Key Security Events
- Cart item additions/updates
- Failed nonce validation
- Unauthorized API access attempts
- Cross-origin request blocking

## ⚠️ Important Notes

1. **Never disable nonce in production** - Only development mode bypasses nonce validation
2. **CORS is always enforced** - Only allowed origins can access the API
3. **Session cookies required** - All requests need proper WooCommerce session
4. **Nonce expiry handled** - Frontend automatically refreshes expired nonces

## 🔄 Deployment Workflow

```bash
# 1. Test in development
docker-compose up -d
npm run dev

# 2. Switch to production mode for testing  
docker-compose down
docker-compose -f docker-compose.prod.yml up -d

# 3. Test production security
# (run security tests)

# 4. Deploy to live server with production config
```

## ✅ Security Checklist

- [ ] `WP_ENV = 'production'` set in live environment
- [ ] CORS origins match your actual domains  
- [ ] Nonce authentication working in frontend
- [ ] Cart operations work with nonce
- [ ] Security logging enabled
- [ ] SSL/HTTPS enabled for production domain
- [ ] Session cookies secure and httpOnly

## 🆘 Troubleshooting

### Cart API 403 Error
- Check nonce is being sent: `X-WC-Store-API-Nonce` header
- Verify nonce is valid: GET `/wp-json/wc/store/nonce`
- Clear nonce cache: Frontend handles this automatically

### CORS Errors  
- Verify origin is in `$allowed_origins` array
- Check browser console for blocked requests
- Ensure credentials: 'include' in fetch calls

### Session Issues
- Verify WooCommerce session cookies are set
- Check cookie domain and path settings
- Ensure same-origin requests for session management