# 🤖 Claude Code Agent - Modeo E-commerce Stack Briefing

**CRITICAL: Read this entire document before making ANY changes to the codebase.**

## 🎯 Project Mission Statement

**Modeo.pl** - Modern headless e-commerce built with Next.js frontend + WordPress WooCommerce backend optimized for Polish market with full payment integration (BLIK, Przelewy24) and shipping (Furgonetka, Flexible Shipping).

**DO NOT deviate from this architecture. DO NOT suggest alternative frameworks.**

---

## 🏗️ Architecture Overview (SACRED - DO NOT CHANGE)

### Production Architecture (modeo.pl)
```
https://modeo.pl/              → Next.js (ISR catalog, homepage)
https://modeo.pl/koszyk        → Next.js (cart management)
https://modeo.pl/checkout      → WordPress WooCommerce (payments + shipping)
https://modeo.pl/moje-konto    → WordPress WooCommerce (customer account)
https://modeo.pl/wp-admin      → WordPress (admin panel)
```

### Development Architecture (current)
```
http://localhost:3000/         → Next.js dev server
http://localhost:3000/cart     → Next.js cart page
http://localhost:3000/test-wp  → API connection test
http://localhost:8080/         → WordPress + WooCommerce (Docker)
http://localhost:8080/wp-admin → WordPress admin (admin/admin123)
```

**⚠️ CRITICAL: Never suggest changing ports, domains, or this routing structure.**

---

## 📁 File Structure (DO NOT REORGANIZE)

```
modeo-woocommerce/
├── frontend/                           # Next.js App Router (TypeScript + Tailwind)
│   ├── src/app/                       # App Router structure
│   │   ├── test-wp/page.tsx           # API test + product listing
│   │   ├── cart/page.tsx              # Shopping cart
│   │   └── layout.tsx                 # Root layout
│   ├── next.config.js                 # Dev config with proxy rewrites
│   ├── next.config.prod.js            # Production config
│   ├── Dockerfile.prod                # Production Docker build
│   └── package.json                   # Dependencies
├── backend/                           # WordPress Docker environment
│   ├── docker-compose.yml             # Development containers
│   ├── wp-content/                    # WordPress custom content
│   │   ├── plugins/                   # Custom plugins directory
│   │   │   ├── cors-for-nextjs.php    # CORS headers for API
│   │   │   └── store-api-nonce.php    # Disables nonce for dev
│   │   └── themes/                    # Custom themes directory
│   └── uploads/                       # Media files
├── docker-compose.prod.yml            # Production containers
├── Caddyfile.prod                     # Production reverse proxy
├── deploy.sh                          # Production deployment script
├── DEPLOYMENT.md                      # Complete deployment guide
└── README.prod.md                     # Production documentation
```

---

## 🔧 Tech Stack (IMMUTABLE)

### Frontend Stack
- **Next.js 15.5+** with App Router (TypeScript)
- **Tailwind CSS** for styling
- **React 18+** with hooks
- **Vercel deployment** ready (production)

### Backend Stack
- **WordPress 6.8+** latest
- **WooCommerce 10.1+** latest
- **MariaDB 10.6** database
- **Docker + Docker Compose** containerization

### Polish E-commerce Integrations
- **Autopay (Blue Media)** - BLIK, cards, Przelewy24 
- **Furgonetka** - cheap shipping via couriers
- **Flexible Shipping** - advanced shipping methods
- **PLN currency** - Polish złoty

### Production Infrastructure
- **Caddy 2** - reverse proxy with auto-SSL
- **Redis** - caching layer
- **Docker networking** - security isolation

---

## 🔌 API Integration (CRITICAL CONFIGURATION)

### WordPress REST API Endpoints Used:
```
GET  /wp-json/wc/store/products        # Product listings
POST /wp-json/wc/store/cart/add-item   # Add to cart  
GET  /wp-json/wc/store/cart            # Get cart contents
POST /wp-json/wc/store/cart/remove-item # Remove from cart
```

### CORS Configuration (NEVER REMOVE):
- **Plugin**: `wp-content/plugins/cors-for-nextjs.php`
- **Purpose**: Allows Next.js (localhost:3000) to call WordPress API (localhost:8080)
- **Production**: Auto-adjusts to https://modeo.pl

### Development Nonce Bypass (ESSENTIAL):
- **Plugin**: `wp-content/plugins/store-api-nonce.php` 
- **Purpose**: Disables WooCommerce nonce verification for development
- **WARNING**: This is DEV ONLY - production uses proper nonce handling

---

## 🛒 E-commerce Flow (DO NOT BREAK)

### Customer Journey:
1. **Browse products** → Next.js pages (fast, SEO-optimized)
2. **Add to cart** → WooCommerce Store API calls
3. **View cart** → Next.js cart page with WC API data
4. **Checkout** → Redirects to WordPress WooCommerce
5. **Payment** → Autopay (BLIK/cards/bank transfers)
6. **Shipping** → Furgonetka courier selection
7. **Confirmation** → WordPress order confirmation

### Critical Integration Points:
- **Cart persistence** via WooCommerce session cookies
- **Product data** fetched from WC Store API  
- **Checkout redirect** from Next.js to WordPress
- **Payment processing** handled by WordPress plugins

---

## 🚨 ABSOLUTELY DO NOT TOUCH

### Files that are mission-critical:
1. **cors-for-nextjs.php** - API communication depends on this
2. **store-api-nonce.php** - Cart functionality will break without it
3. **next.config.js** - Proxy rewrites for API calls
4. **docker-compose.yml** - Exact container configuration
5. **WooCommerce settings** - Currency (PLN), plugins, shipping zones

### Plugins that MUST stay active:
- **woocommerce** - Core e-commerce functionality
- **flexible-shipping** - Polish shipping methods
- **platnosci-online-blue-media** - Autopay payments
- **furgonetka** - Courier shipping
- **cors-for-nextjs** - API communication
- **store-api-nonce** - Development cart functionality

---

## 🎯 Development Guidelines

### When Adding Features:
1. **Frontend features** → Add to Next.js in `frontend/src/app/`
2. **E-commerce logic** → Use WooCommerce Store API, never custom backend
3. **Payment features** → Configure in WordPress admin, don't code custom
4. **Shipping features** → Use Flexible Shipping + Furgonetka plugins

### Code Style:
- **TypeScript** for all new React components
- **Tailwind classes** for styling (no CSS modules)
- **API calls** use native fetch with credentials: 'include'
- **Error handling** with console.log for debugging

### Testing Workflow:
1. Start backend: `cd backend && docker-compose up -d`
2. Start frontend: `cd frontend && npm run dev`
3. Test API: http://localhost:3000/test-wp
4. Test cart: Add product → View cart → Go to checkout
5. Verify: WordPress checkout at localhost:8080/checkout

---

## 🔄 Common Tasks & Solutions

### Adding New Product Features:
```typescript
// CORRECT: Use WooCommerce Store API
const response = await fetch('http://localhost:8080/wp-json/wc/store/products', {
  credentials: 'include'
});

// WRONG: Don't create custom product endpoints
```

### Adding Payment Methods:
```php
// CORRECT: Install WordPress plugin via wp-cli
docker-compose run --rm wpcli wp plugin install payment-plugin --activate

// WRONG: Don't code custom payment processors
```

### Fixing CORS Issues:
1. Check `cors-for-nextjs.php` is active
2. Verify `credentials: 'include'` in fetch calls
3. Never disable WordPress security without replacing it

### Database Issues:
```bash
# CORRECT: Use wp-cli for WordPress operations
docker-compose run --rm wpcli wp option update woocommerce_currency PLN

# WRONG: Don't directly edit MySQL unless absolutely necessary
```

---

## 🚀 Deployment Context

### Current State:
- **Development** environment running on localhost
- **Production** files ready in root directory
- **Deployment script** `deploy.sh` tested and ready

### Production Readiness:
- **SSL certificates** via Caddy auto-HTTPS
- **Domain routing** configured for modeo.pl
- **Security headers** implemented
- **Polish payment integration** configured
- **Performance optimization** with ISR and caching

---

## 📞 When You Need Help

### Debug Commands:
```bash
# Check Docker containers
cd backend && docker-compose ps

# View WordPress logs  
docker-compose logs wordpress

# Test API endpoints
curl http://localhost:8080/wp-json/wc/store/products

# WordPress CLI access
docker-compose run --rm wpcli wp --info
```

### Common Issues & Solutions:
- **"Failed to fetch"** → Check CORS plugin is active
- **"Missing nonce"** → Verify store-api-nonce.php is active  
- **Cart not working** → Check WooCommerce is installed and active
- **Checkout 404** → Verify WordPress permalinks are set to "Post name"

---

## ⚠️ FINAL WARNING

**This stack represents weeks of careful integration work. The WordPress + Next.js headless architecture with Polish payment systems is complex and fragile. Any changes to core files, plugin configuration, or API structure could break the entire e-commerce flow.**

**Before making changes:**
1. **Read** this briefing completely
2. **Test** your changes locally first  
3. **Verify** cart and checkout flow still works
4. **Check** that Polish payment plugins remain functional
5. **Ensure** production deployment files remain intact

**When in doubt, ask specific questions about the architecture rather than making assumptions.**

---

**🎯 Your mission: Enhance and extend this stack while preserving its core architecture and Polish e-commerce functionality.**