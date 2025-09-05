# 🏪 Modeo.pl E-commerce Stack

**Headless Next.js + WordPress WooCommerce** - kompletny sklep internetowy z polskimi płatnościami i wysyłką.

## 🚀 Quick Start (Produkcja)

```bash
# 1. Sklonuj na serwer
git clone <repo> /home/modeo/modeo-shop
cd /home/modeo/modeo-shop

# 2. Skonfiguruj środowisko
cp .env.prod .env
nano .env  # Wypełnij hasła i klucze

# 3. Wdróż jedną komendą
./deploy.sh
```

**Gotowe!** 🎉 Sklep dostępny na **https://modeo.pl**

## 📋 Co zawiera?

### Frontend (Next.js)
- ⚡ **Szybki katalog** - ISR, SEO-optimized
- 🛒 **Koszyk** - Store API integration
- 📱 **Responsive** - mobile-first design
- 🖼️ **Images** - Next.js Image optimization
- 🔍 **SEO** - structured data, sitemaps

### Backend (WordPress + WooCommerce)
- 💳 **Autopay** - BLIK, karty, przelewy24
- 📦 **Furgonetka** - tanie kurierzy PL
- 🚚 **Flexible Shipping** - zaawansowane metody
- 💰 **PLN** - polska waluta i podatki
- 📊 **Analytics** - WooCommerce tracking

### Infrastructure
- 🌐 **Caddy** - reverse proxy + auto SSL
- 🐳 **Docker** - konteneryzacja
- 💾 **Redis** - caching
- 🔒 **Security** - headers, firewalls
- 📈 **Monitoring** - health checks, logs

## 🏗️ Architektura

```
https://modeo.pl/              → Next.js (homepage, catalog)
https://modeo.pl/koszyk        → Next.js (cart management)  
https://modeo.pl/checkout      → WordPress (payment, shipping)
https://modeo.pl/moje-konto    → WordPress (customer account)
https://modeo.pl/wp-admin      → WordPress (admin panel)
```

## 📁 Struktura plików

```
modeo-shop/
├── frontend/                  # Next.js app
│   ├── src/app/               # App Router
│   ├── Dockerfile.prod        # Production build
│   └── next.config.prod.js    # Production config
├── backend/                   # WordPress w Docker
│   ├── wp-content/           # Custom plugins/themes
│   └── uploads/              # Media files
├── docker-compose.prod.yml    # Production services
├── Caddyfile.prod            # Reverse proxy config
├── deploy.sh                 # Deployment script
└── DEPLOYMENT.md             # Full deployment guide
```

## 🛠️ Development vs Production

| Aspect | Development | Production |
|--------|------------|------------|
| **Domains** | localhost:3000 + localhost:8080 | modeo.pl (jedna domena) |
| **SSL** | HTTP | HTTPS (auto Let's Encrypt) |
| **Database** | SQLite/basic MySQL | MariaDB + Redis cache |
| **Images** | Dev server | CDN-ready optimization |
| **Monitoring** | Console logs | Structured logs + health checks |
| **Performance** | Dev mode | Optimized builds + compression |

## 🔧 Zarządzanie

### Deployment
```bash
./deploy.sh                    # Full deployment
docker compose up -d --build   # Manual restart
```

### Monitoring
```bash
docker compose logs -f         # All logs
docker compose ps             # Service status
curl -I https://modeo.pl      # Health check
```

### Backup
```bash
# Database backup (automatic in deploy.sh)
docker compose exec -T db mysqldump -u root -p modeo_prod > backup.sql

# Files backup
rsync -av wp-content/ backups/wp-content/
rsync -av uploads/ backups/uploads/
```

## 📊 Performance & SEO

- **Core Web Vitals**: Optimized for Google rankings
- **Page Speed**: <3s load time on 3G
- **SEO**: Structured data, meta tags, sitemaps
- **Images**: WebP/AVIF, responsive, lazy loading
- **Caching**: Multi-layer (Redis, Caddy, ISR)

## 🛡️ Security

- **HTTPS**: Automatic SSL certificates
- **Headers**: Security headers (HSTS, CSP, etc.)
- **Firewall**: Docker networks isolation
- **Updates**: Automated WordPress security updates
- **Backup**: Regular automated backups

## 🌍 Skalowanie

- **CDN**: Ready for Cloudflare integration
- **Database**: MariaDB clustering support  
- **Caching**: Redis + edge caching
- **Horizontal**: Load balancer ready
- **Monitoring**: Prometheus/Grafana ready

## 📞 Support

- **Docs**: `DEPLOYMENT.md` - complete guide
- **Logs**: `docker compose logs service_name`
- **Debug**: Health checks in `deploy.sh`
- **Issues**: Check GitHub issues

---

**Made with ❤️ for Polish e-commerce**  
Next.js + WordPress + Polish payments & shipping = 🚀