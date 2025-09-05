# 🤖 CLAUDE CODE AGENT PROMPT - Modeo E-commerce Stack

**Copy this entire prompt when starting work with new Claude Code agents on this project.**

---

## 🚨 POST-DEPLOYMENT UPDATE (September 4, 2025)

**CRITICAL: Read `DEPLOYMENT_LESSONS_LEARNED.md` for deployment pitfalls and solutions!**

### Known Issues Fixed:
- ✅ Image loading issues (wp-content volume mapping)
- ✅ Plugin activation errors (Docker volumes)
- ✅ Database import problems (wrong database name)
- ✅ Next.js image optimization (URL transformation)

### Current Production Status:
- **VPS**: 72.60.39.148 (Ubuntu 22.04)
- **Production**: https://modeo.pl - FULLY OPERATIONAL
- **All systems**: WordPress, Next.js, images, plugins - WORKING

---

## 📋 CONTEXT & MISSION

You are working on **Modeo.pl** - a production-ready headless e-commerce platform with DUAL-DOMAIN architecture built with Next.js frontend + WordPress WooCommerce backend, optimized for the Polish market with integrated payments (BLIK, Przelewy24) and shipping (Furgonetka).

**⚠️ CRITICAL: Before making ANY changes, read `CLAUDE_AGENT_BRIEFING.md` in the project root. This contains essential architecture knowledge that you MUST understand.**

## 🏗️ DUAL-DOMAIN ARCHITECTURE

### Production Domains
- **🔴 modeo.pl** → PRODUCTION (stable, live customers)
- **🧪 nextmodeo.sitefy.pl** → STAGING (testing, development)

### Environment Stack (SACRED - DO NOT MODIFY)
- **Frontend**: Next.js 15+ (TypeScript + Tailwind) on localhost:3000
- **Backend**: WordPress 6.8+ + WooCommerce 10+ on localhost:8080 (Docker)
- **Production**: modeo.pl with Caddy reverse proxy
- **Staging**: nextmodeo.sitefy.pl with Caddy reverse proxy
- **Database**: MariaDB in Docker (separate DBs per environment)
- **APIs**: WooCommerce Store API for cart/products

### Key Integrations (DO NOT REMOVE)
- **Autopay** - Polish payments (BLIK, cards, transfers)
- **Furgonetka** - Polish shipping couriers  
- **Flexible Shipping** - Advanced shipping methods
- **CORS Plugin** - API communication with dual-domain support (critical)
- **Store API Nonce Plugin** - Development cart functionality (critical)
- **Dual Domain Handler Plugin** - Automatic domain switching (NEW)

## 📁 PROJECT STRUCTURE
```
modeo-woocommerce/
├── frontend/src/
│   ├── app/                  # Next.js App Router
│   │   ├── sklep/page.tsx   # Product listing + API test
│   │   └── koszyk/page.tsx  # Shopping cart
│   └── lib/config.ts        # Dual-domain configuration (NEW)
├── backend/wp-content/plugins/
│   ├── cors-for-nextjs.php       # CORS (dual-domain ready)
│   ├── store-api-nonce.php       # Store API nonce handling
│   └── dual-domain-handler.php   # Domain switching (NEW)
├── .env.prod                      # Production environment (modeo.pl)
├── .env.staging                   # Staging environment (nextmodeo.sitefy.pl) (NEW)
├── docker-compose.prod.yml        # Production deployment (modeo.pl)
├── docker-compose.staging.yml     # Staging deployment (nextmodeo.sitefy.pl) (NEW)
├── Caddyfile.prod                 # Production Caddy (modeo.pl)
├── Caddyfile.staging              # Staging Caddy (nextmodeo.sitefy.pl) (NEW)
├── deploy.sh                      # Production deployment script
├── deploy-staging.sh              # Staging deployment script (NEW)
└── CLAUDE_AGENT_BRIEFING.md       # ← READ THIS FIRST!
```

## 🚨 CRITICAL RULES

### NEVER MODIFY:
1. **CORS configuration** in `wp-content/plugins/cors-for-nextjs.php` (dual-domain ready)
2. **Nonce bypass** in `wp-content/plugins/store-api-nonce.php`  
3. **Dual-domain handler** in `wp-content/plugins/dual-domain-handler.php` (NEW)
4. **Docker ports**: 3000 (Next.js), 8080 (WordPress)
5. **API endpoints**: WooCommerce Store API structure
6. **Plugin configuration**: Autopay, Furgonetka, WooCommerce settings
7. **Production files**: docker-compose.prod.yml, Caddyfile.prod, deploy.sh
8. **Environment configs**: .env.production, .env.staging templates (use .env.local for real data)

### ALWAYS DO:
1. **Test on staging** (nextmodeo.sitefy.pl) before production
2. **Use .env.local** for real credentials (NEVER commit .env.local)
3. **Use config.getApiUrl()** for dynamic API URLs
4. **Use WooCommerce Store API** for e-commerce functionality
5. **Maintain TypeScript** in React components
6. **Use Tailwind CSS** for styling
7. **Include credentials: 'include'** in API fetch calls
8. **Check cart flow** after API changes
9. **Run ./validate-env.sh** before deployment
10. **Test dual-domain switching** works correctly

## 🔧 DEVELOPMENT WORKFLOW

### Starting the Environment:
```bash
# Terminal 1: Start WordPress
cd backend && docker-compose up -d

# Terminal 2: Start Next.js  
cd frontend && npm run dev

# Verify: http://localhost:3000/sklep should show products
```

### Making Changes:
1. **Read `CLAUDE_AGENT_BRIEFING.md`** to understand current state
2. **Identify** if change is frontend (Next.js) or backend (WordPress)
3. **Test** API connections remain working
4. **Verify** cart flow: Add product → View cart → Checkout redirect

## 🛒 E-COMMERCE FLOW (PROTECT THIS)

Customer journey that MUST continue working:
1. Browse products (Next.js) → 2. Add to cart (API call) → 3. View cart (Next.js) → 4. Checkout (WordPress) → 5. Payment (Autopay) → 6. Shipping (Furgonetka)

### API Integration Points:
```javascript
import { config } from '@/lib/config';

// Product listing (auto-detects domain)
fetch(`${config.getApiUrl()}/wp-json/wc/store/products`)

// Add to cart (dual-domain ready)
fetch(`${config.getApiUrl()}/wp-json/wc/store/cart/add-item`, {
  method: 'POST',
  credentials: 'include', // CRITICAL for sessions
  body: JSON.stringify({id: productId, quantity: 1})
})

// Checkout redirect (environment-aware)
window.location.href = config.getCheckoutUrl();
```

## 🎯 COMMON TASKS & GUIDELINES

### Adding New Features:
- **Products/Categories** → Use WooCommerce admin or WP-CLI
- **Frontend pages** → Add to `frontend/src/app/`
- **Styling** → Use Tailwind classes
- **API calls** → Use existing WooCommerce Store API endpoints

### Troubleshooting:
- **CORS errors** → Check `cors-for-nextjs.php` is active
- **Cart not working** → Verify `store-api-nonce.php` is active
- **WordPress admin** → http://localhost:8080/wp-admin (admin/admin123)

### Don't Create Custom:
- ❌ Custom payment processors (use Autopay plugin)
- ❌ Custom shipping logic (use Furgonetka + Flexible Shipping)
- ❌ Custom product APIs (use WooCommerce Store API)
- ❌ Custom user authentication (use WooCommerce accounts)

## 📊 CURRENT STATUS

### What's Working:
✅ Next.js catalog with product display  
✅ Add to cart functionality via Store API
✅ Cart page showing WooCommerce data
✅ Checkout redirect to WordPress
✅ Polish payment methods (Autopay/BLIK)
✅ Polish shipping (Furgonetka)
✅ Production deployment ready

### Architecture Decisions Made:
- **Headless approach** for SEO/performance benefits
- **Dual-domain production** (modeo.pl + nextmodeo.sitefy.pl) for safe deployments
- **Staging-first workflow** for testing before production
- **WordPress handles** payments, shipping, accounts
- **Next.js handles** catalog, cart, SEO pages  
- **Docker containerization** for consistent environments
- **Environment-aware configuration** for seamless domain switching

## 🚀 DUAL-ENVIRONMENT CONTEXT

### STAGING Environment (nextmodeo.sitefy.pl)
- Testing and development environment
- More verbose logging and debugging
- Safe place to test new features
- Deploy with: `./deploy-staging.sh`

### PRODUCTION Environment (modeo.pl) 
- Live customer environment - BE CAREFUL!
- Optimized for performance and security
- Minimal logging, maximum reliability
- Deploy with: `./deploy.sh` (requires confirmation)

**Both environments include:**
- Caddy reverse proxy with auto-SSL
- Redis caching layer  
- MariaDB database (separate per environment)
- Polish payment/shipping integration
- Security headers and monitoring

---

## 🎯 YOUR MISSION

**Enhance and extend this headless e-commerce stack while preserving its core architecture and Polish market integrations.**

**⚠️ CRITICAL REMINDER: Read `CLAUDE_AGENT_BRIEFING.md` before making changes. It contains detailed technical context that could save hours of debugging.**

## 🔄 SECURE DEPLOYMENT WORKFLOW

### Recommended Flow:
1. **Develop locally** → localhost:3000 + localhost:8080
2. **Prepare credentials** → `cp .env.production .env.local` → fill with real data
3. **Validate environment** → `./validate-env.sh` → ensure security
4. **Test on staging** → `./deploy-staging.sh` → nextmodeo.sitefy.pl  
5. **Deploy to production** → `./deploy.sh` → modeo.pl (uses .env.local)

### Security Practices:
- ✅ **Never commit** .env.local, .env.staging.local to Git  
- ✅ **Always use** template files (.env.production, .env.staging) for commits
- ✅ **Validate environment** before deployment with validate-env.sh
- ✅ **Rotate credentials** after any security incident
- ✅ **Monitor logs** for security warnings in WordPress admin

### Environment Detection:
The system automatically detects the environment:
- **config.isProduction()** → modeo.pl
- **config.isStaging()** → nextmodeo.sitefy.pl  
- **config.isDevelopment()** → localhost

**When you understand this briefing, confirm by saying: "I've read the briefing and understand the Modeo secure dual-domain headless e-commerce architecture. Ready to work within these constraints."**