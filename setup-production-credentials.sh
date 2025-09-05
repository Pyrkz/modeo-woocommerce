#!/bin/bash
# 🔒 Setup Production Credentials Helper
# Helps create secure .env.local file for production

set -e

echo "🔒 Production Credentials Setup Helper"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in production directory
if [[ ! -f ".env.production" ]]; then
    log_error "No .env.production found!"
    log_info "Run this script in the production directory"
    exit 1
fi

# Check if .env.local already exists
if [[ -f ".env.local" ]]; then
    log_warning ".env.local already exists!"
    read -p "Overwrite existing .env.local? (y/N): " confirm
    if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
        log_info "Cancelled by user"
        exit 0
    fi
fi

log_info "Creating .env.local from .env.production template..."

# Copy template
cp .env.production .env.local

log_success "✅ .env.local created"
echo ""

# Generate strong passwords
log_info "=== Password Generation ==="
echo ""

# Function to generate password
generate_password() {
    local length="$1"
    openssl rand -base64 $((length * 3/4)) | tr -d "=+/" | cut -c1-${length}
}

# Generate WordPress keys
log_info "Generating WordPress security keys..."
echo ""

# Generate 8 WordPress keys
WP_AUTH_KEY=$(generate_password 64)
WP_SECURE_AUTH_KEY=$(generate_password 64)
WP_LOGGED_IN_KEY=$(generate_password 64)
WP_NONCE_KEY=$(generate_password 64)
WP_AUTH_SALT=$(generate_password 64)
WP_SECURE_AUTH_SALT=$(generate_password 64)
WP_LOGGED_IN_SALT=$(generate_password 64)
WP_NONCE_SALT=$(generate_password 64)

# Generate database passwords
DB_PASSWORD=$(generate_password 24)
DB_ROOT_PASSWORD=$(generate_password 24)

log_success "✅ Generated strong passwords"
echo ""

# Apply passwords to .env.local
log_info "Updating .env.local with generated passwords..."

# Replace database passwords
sed -i.bak "s/DB_PASSWORD=REPLACE_WITH_STRONG_DB_PASSWORD/DB_PASSWORD=${DB_PASSWORD}/" .env.local
sed -i.bak "s/DB_ROOT_PASSWORD=REPLACE_WITH_STRONG_ROOT_PASSWORD/DB_ROOT_PASSWORD=${DB_ROOT_PASSWORD}/" .env.local

# Replace WordPress keys
sed -i.bak "s/WP_AUTH_KEY=REPLACE_WITH_64_CHAR_KEY/WP_AUTH_KEY=${WP_AUTH_KEY}/" .env.local
sed -i.bak "s/WP_SECURE_AUTH_KEY=REPLACE_WITH_64_CHAR_KEY/WP_SECURE_AUTH_KEY=${WP_SECURE_AUTH_KEY}/" .env.local
sed -i.bak "s/WP_LOGGED_IN_KEY=REPLACE_WITH_64_CHAR_KEY/WP_LOGGED_IN_KEY=${WP_LOGGED_IN_KEY}/" .env.local
sed -i.bak "s/WP_NONCE_KEY=REPLACE_WITH_64_CHAR_KEY/WP_NONCE_KEY=${WP_NONCE_KEY}/" .env.local
sed -i.bak "s/WP_AUTH_SALT=REPLACE_WITH_64_CHAR_KEY/WP_AUTH_SALT=${WP_AUTH_SALT}/" .env.local
sed -i.bak "s/WP_SECURE_AUTH_SALT=REPLACE_WITH_64_CHAR_KEY/WP_SECURE_AUTH_SALT=${WP_SECURE_AUTH_SALT}/" .env.local
sed -i.bak "s/WP_LOGGED_IN_SALT=REPLACE_WITH_64_CHAR_KEY/WP_LOGGED_IN_SALT=${WP_LOGGED_IN_SALT}/" .env.local
sed -i.bak "s/WP_NONCE_SALT=REPLACE_WITH_64_CHAR_KEY/WP_NONCE_SALT=${WP_NONCE_SALT}/" .env.local

# Clean up backup file
rm -f .env.local.bak

log_success "✅ Passwords applied to .env.local"
echo ""

# Show what still needs manual configuration
log_warning "⚠️ MANUAL CONFIGURATION NEEDED:"
echo ""
echo "Edit .env.local and configure:"
echo ""
echo "1. WordPress Admin Credentials:"
echo "   WORDPRESS_ADMIN_USER=admin"
echo "   WORDPRESS_ADMIN_PASSWORD=YourSecureAdminPassword!"
echo "   WORDPRESS_ADMIN_EMAIL=admin@modeo.pl"
echo ""
echo "2. Email/SMTP (if needed):"
echo "   SMTP_HOST=your-smtp-server.com"
echo "   SMTP_USER=your-email@domain.com"
echo "   SMTP_PASS=your-email-password"
echo ""
echo "3. reCAPTCHA (if needed):"
echo "   RECAPTCHA_KEY=your-recaptcha-site-key"
echo "   RECAPTCHA_SECRET_KEY=your-recaptcha-secret"
echo ""

# Validate configuration
log_info "Validating configuration..."
if [[ -f "./validate-env.sh" ]]; then
    if ./validate-env.sh; then
        log_success "✅ Configuration is valid!"
    else
        log_warning "⚠️ Some validation warnings - check and fix before production"
    fi
else
    log_warning "⚠️ No validate-env.sh found"
fi

echo ""
log_success "🎉 Production credentials setup completed!"
echo ""
echo -e "${YELLOW}📝 Next Steps:${NC}"
echo "1. nano .env.local    # Review and complete manual configuration"
echo "2. ./validate-env.sh  # Ensure all validations pass"
echo "3. NEVER commit .env.local to Git!"
echo "4. Ready for production deployment!"
echo ""
echo -e "${GREEN}🔒 Security Notes:${NC}"
echo "✅ Strong passwords generated (24+ chars)"
echo "✅ WordPress keys generated (64 chars)"
echo "✅ .env.local will NOT be committed to Git"
echo "🔐 Keep .env.local secure and backed up separately"