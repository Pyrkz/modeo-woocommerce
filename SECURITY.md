# 🔒 Security Guide - Modeo E-commerce Platform

## 🚨 Immediate Actions Required

**GitGuardian detected exposed secrets. Follow these steps immediately:**

### 1. Rotate All Exposed Credentials

**Database Passwords:**
- Change `DB_PASSWORD` and `DB_ROOT_PASSWORD` in production
- Update docker-compose.yml with new credentials

**WordPress Security Keys:**
- Generate new keys at: https://api.wordpress.org/secret-key/1.1/salt/
- Update production WordPress installation

**SMTP Credentials:**
- Change email password at Hostinger
- Update `SMTP_PASS` in production environment

**reCAPTCHA Keys:**
- Generate new keys at: https://www.google.com/recaptcha/admin
- Update both site key and secret key

### 2. Environment Variable Security

#### ✅ Secure Practice
```bash
# Create local environment file (never commit)
cp .env.production .env.local

# Edit with real values
nano .env.local

# Use in deployment
docker-compose --env-file .env.local up -d
```

#### ❌ Never Do This
```bash
# Don't commit real credentials
git add .env.production  # ← Contains secrets

# Don't hardcode in files
const apiKey = "6Lcu5borAAAAAAfzwT6yPkKdYAWrh77Il_Th8MIy"
```

## 🛡️ Security Best Practices

### Environment Files
- `.env.production` → Template only (safe to commit)
- `.env.local` → Real credentials (NEVER commit)
- `.env.staging` → Staging-only credentials

### File Structure
```
modeo-woocommerce/
├── .env.production     # ✅ Template (placeholder values)
├── .env.staging        # ✅ Template (placeholder values) 
├── .env.local          # ❌ Real credentials (gitignored)
├── .gitignore          # ✅ Protects sensitive files
└── SECURITY.md         # ✅ This guide
```

### Deployment Security
```bash
# Production deployment with secure environment
cp .env.production .env.local
# Edit .env.local with real values
./deploy.sh  # Uses .env.local

# Staging deployment
cp .env.staging .env.local
# Edit .env.local with staging values
./deploy-staging.sh
```

## 🔐 WordPress Security

### Security Keys & Salts
- **Generate new keys** after any exposure
- **Use WordPress.org generator**: https://api.wordpress.org/secret-key/1.1/salt/
- **Update immediately** in production

### Database Security
- **Complex passwords**: 16+ characters with symbols
- **Regular rotation**: Change every 90 days
- **Limited access**: Only necessary services

## 📧 Email Security

### SMTP Configuration
```env
# Secure SMTP setup
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587                    # Use TLS
SMTP_USER=sklep@modeo.pl
SMTP_PASS=complex_secure_password
```

### Email Best Practices
- **App passwords** instead of account passwords
- **TLS encryption** (port 587)
- **Regular password rotation**

## 🔍 reCAPTCHA Security

### Key Management
```env
# Site key (public) - still rotate after exposure
RECAPTCHA_KEY=6Ld...
# Secret key (private) - critical to rotate
RECAPTCHA_SECRET_KEY=6Ld...
```

### reCAPTCHA Setup
1. Go to https://www.google.com/recaptcha/admin
2. Create new site for modeo.pl
3. Use v2 "I'm not a robot" checkbox
4. Add both modeo.pl and localhost for testing

## 🚨 Incident Response

### If Secrets Are Exposed:
1. **Immediately rotate** all exposed credentials
2. **Check access logs** for unauthorized usage
3. **Update GitGuardian** status (mark as resolved)
4. **Monitor systems** for 48 hours post-incident

### Security Monitoring
- **GitGuardian**: Continuous secret scanning
- **WordPress security plugins**: Wordfence
- **Regular updates**: WordPress, plugins, dependencies

## 🔒 Future Prevention

### Pre-commit Hooks
```bash
# Install git-secrets
git secrets --install
git secrets --register-aws

# Scan for secrets before commit
git secrets --scan
```

### Environment Validation
```bash
# Check for placeholder values before deployment
grep -r "REPLACE_WITH" .env.local && echo "❌ Placeholder values found"
```

### Security Checklist
- [ ] All .env files use templates with placeholders
- [ ] Real credentials in .env.local only
- [ ] .gitignore blocks all sensitive files
- [ ] Regular security key rotation (90 days)
- [ ] GitGuardian monitoring active
- [ ] WordPress security plugins installed

## 📞 Emergency Contacts

**If you discover a security breach:**
1. **Immediately** change all passwords
2. **Check** server logs for unauthorized access
3. **Contact hosting provider** if needed
4. **Document** the incident for future prevention

---

**Remember: Security is not optional for e-commerce platforms. Customer trust depends on it.**