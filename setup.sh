#!/bin/bash

# Modeo E-commerce Setup Script
# Konfiguruje Next.js (lokalnie) + WordPress (Docker) w VS Code

set -e

echo "🚀 Modeo E-commerce Setup - Next.js + WordPress"

# Sprawdź wymagania
check_requirements() {
    echo "📋 Sprawdzam wymagania..."
    
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js nie jest zainstalowany. Pobierz z https://nodejs.org/"
        exit 1
    fi
    
    if ! command -v docker &> /dev/null; then
        echo "❌ Docker nie jest zainstalowany. Pobierz Docker Desktop"
        exit 1
    fi
    
    echo "✅ Node.js: $(node --version)"
    echo "✅ Docker: $(docker --version)"
}

# 1. Struktura folderów
create_structure() {
    echo "📁 Tworzę strukturę folderów..."
    
    mkdir -p frontend
    mkdir -p backend/wp-content/themes
    mkdir -p backend/wp-content/plugins
    mkdir -p backend/uploads
}

# 2. Next.js setup (lokalnie)
setup_nextjs() {
    echo "⚛️ Konfiguruję Next.js..."
    
    cd frontend
    
    # Utwórz Next.js app
    npx create-next-app@latest . \
        --typescript \
        --tailwind \
        --eslint \
        --app \
        --src-dir=false \
        --import-alias="@/*" \
        --use-npm \
        --no-git
        
    cd ..
}

# 3. WordPress Docker setup
setup_wordpress() {
    echo "🐳 Konfiguruję WordPress w Docker..."
    
    cat > backend/docker-compose.yml << 'EOF'
version: '3.8'

services:
  db:
    image: mysql:8.0
    restart: unless-stopped
    environment:
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress
      MYSQL_ROOT_PASSWORD: rootpassword
    volumes:
      - db_data:/var/lib/mysql
    ports:
      - "3307:3306"

  wordpress:
    image: wordpress:latest
    restart: unless-stopped
    depends_on:
      - db
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress
      WORDPRESS_DB_NAME: wordpress
      WORDPRESS_DEBUG: 1
    volumes:
      - ./wp-content:/var/www/html/wp-content
      - ./uploads:/var/www/html/wp-content/uploads
    ports:
      - "8080:80"

  wpcli:
    image: wordpress:cli
    depends_on:
      - db
      - wordpress
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress
      WORDPRESS_DB_NAME: wordpress
    volumes:
      - ./wp-content:/var/www/html/wp-content
      - ./uploads:/var/www/html/wp-content/uploads
    working_dir: /var/www/html

volumes:
  db_data:
EOF
}

# 4. Konfiguracja połączenia Next.js <-> WordPress
setup_connection() {
    echo "🔗 Konfiguruję połączenie Next.js <-> WordPress..."
    
    # Next.js config dla obrazków z WordPress
    cat > frontend/next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  async rewrites() {
    return [
      // Proxy do WordPress API
      {
        source: '/wp-json/:path*',
        destination: 'http://localhost:8080/wp-json/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
EOF

    # Dodaj przykładową stronę z połączeniem do WP
    cat > frontend/app/test-wp/page.tsx << 'EOF'
'use client';

import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: string;
  images: Array<{src: string}>;
}

export default function TestWP() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/wp-json/wc/store/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Błąd połączenia z WordPress:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Ładowanie produktów...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test połączenia WordPress</h1>
      
      {products.length === 0 ? (
        <p>Brak produktów. Dodaj produkty w WordPress Admin.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map(product => (
            <div key={product.id} className="border p-4 rounded">
              <h3 className="font-bold">{product.name}</h3>
              <p>{product.price}</p>
              {product.images?.[0] && (
                <img src={product.images[0].src} alt={product.name} className="w-full h-48 object-cover" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
EOF
}

# 5. Pliki konfiguracyjne
create_config_files() {
    echo "⚙️ Tworzę pliki konfiguracyjne..."
    
    # .env
    cat > .env << 'EOF'
# Development URLs
NEXT_PUBLIC_WORDPRESS_URL=http://localhost:8080
WORDPRESS_DB_URL=mysql://wordpress:wordpress@localhost:3307/wordpress

# WordPress Admin
WP_ADMIN_URL=http://localhost:8080/wp-admin
WP_ADMIN_USER=admin
WP_ADMIN_PASS=admin123
WP_ADMIN_EMAIL=admin@modeo.local
EOF

    # .gitignore
    cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.pnp
.pnp.js

# Production builds
.next/
out/

# Environment variables
.env*.local
.env

# Database
backend/mysql_data/

# WordPress uploads
backend/uploads/
backend/wp-content/uploads/

# Logs
*.log
npm-debug.log*

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
EOF

    # VS Code workspace
    cat > modeo-workspace.code-workspace << 'EOF'
{
  "folders": [
    {
      "name": "Frontend (Next.js)",
      "path": "./frontend"
    },
    {
      "name": "Backend (WordPress)",
      "path": "./backend"
    }
  ],
  "settings": {
    "typescript.preferences.importModuleSpecifier": "relative",
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    },
    "files.exclude": {
      "**/node_modules": true,
      "**/.next": true
    }
  },
  "extensions": {
    "recommendations": [
      "ms-vscode.vscode-typescript-next",
      "esbenp.prettier-vscode",
      "ms-vscode.vscode-json",
      "bradlc.vscode-tailwindcss",
      "formulahendry.auto-rename-tag"
    ]
  }
}
EOF
}

# 6. README z instrukcjami
create_readme() {
    echo "📖 Tworzę README z instrukcjami..."
    
    cat > README.md << 'EOF'
# Modeo E-commerce - Next.js + WordPress

## Szybki start

### 1. Uruchom WordPress (w tle)
```bash
cd backend
docker-compose up -d
```

### 2. Uruchom Next.js (development)
```bash
cd frontend
npm run dev
```

### 3. Otwórz w przeglądarce
- **Frontend**: http://localhost:3000
- **WordPress Admin**: http://localhost:8080/wp-admin
- **Test połączenia**: http://localhost:3000/test-wp

## Struktura
```
modeo-woocommerce/
├── frontend/          # Next.js - development serwer
├── backend/           # WordPress w Docker
└── modeo-workspace.code-workspace  # VS Code workspace
```

## Workflow developmentu

1. **Edycja frontendu**: Pracuj w `frontend/` - zmiany widoczne od razu
2. **Zarządzanie produktami**: WordPress Admin na porcie 8080
3. **API**: Next.js proxy automatycznie przekierowuje `/wp-json/*` do WordPress

## Przydatne komendy

```bash
# WordPress
cd backend
docker-compose logs wordpress  # logi
docker-compose restart         # restart
docker-compose down            # zatrzymaj

# Next.js
cd frontend
npm run build    # build produkcyjny
npm run lint     # sprawdź kod
```

## Co dalej?

1. Zainstaluj WooCommerce w WordPress Admin
2. Dodaj przykładowe produkty
3. Sprawdź połączenie na `/test-wp`
4. Zbuduj prawdziwy sklep!
EOF
}

# Uruchom wszystko
main() {
    check_requirements
    create_structure
    setup_nextjs
    setup_wordpress
    setup_connection
    create_config_files
    create_readme
    
    echo "✅ Setup zakończony!"
    echo ""
    echo "🚀 Następne kroki:"
    echo "1. cd backend && docker-compose up -d"
    echo "2. cd frontend && npm run dev"
    echo "3. Otwórz VS Code: code modeo-workspace.code-workspace"
    echo "4. WordPress Admin: http://localhost:8080/wp-admin"
    echo "5. Frontend: http://localhost:3000"
}

main "$@"