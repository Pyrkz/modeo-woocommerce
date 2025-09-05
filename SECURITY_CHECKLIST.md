# 🔒 Security Checklist - Modeo.pl Deployment

Checklist bezpieczeństwa przed każdym deploymentem.

## ✅ Pre-Deployment Security Checklist

### 🛡️ Environment Variables Security

- [ ] **Sprawdzone .env.local** - Wszystkie `REPLACE_WITH_*` zamienione na prawdziwe wartości
- [ ] **Silne hasła bazy** - Min. 12 znaków, cyfry, litery, znaki specjalne
- [ ] **Unikalne WordPress keys** - Wygenerowane z https://api.wordpress.org/secret-key/1.1/salt/
- [ ] **Nowe reCAPTCHA keys** - Po incydencie bezpieczeństwa
- [ ] **Bezpieczny SMTP** - Aktywne hasło aplikacyjne, nie główne hasło email
- [ ] **Walidacja przeszła** - `./validate-env.sh` bez błędów

### 🔐 Git Repository Security

- [ ] **.env.local NOT committed** - `git status` nie pokazuje .env.local
- [ ] **Tylko template files** - .env.production, .env.staging to tylko szablony
- [ ] **.gitignore aktualny** - Wszystkie wrażliwe pliki ignorowane
- [ ] **Secrets rotated** - Po każdym przypadkowym commit-cie secrets

### 🖥️ Production Server Security

- [ ] **SSH keys only** - Hasła SSH wyłączone
- [ ] **Firewall configured** - Tylko porty 22, 80, 443 otwarte
- [ ] **Docker security** - Kontenery bez uprawnień root
- [ ] **SSL certificates** - Caddy automatyczne SSL działające
- [ ] **Backup strategy** - Automatyczne backupy bazy danych

### 🔍 WordPress Security

- [ ] **Admin password** - Silne hasło administratora
- [ ] **Plugin updates** - Wszystkie pluginy aktualne
- [ ] **WordPress updated** - Najnowsza wersja WordPress
- [ ] **File permissions** - Właściwe uprawnienia wp-content
- [ ] **Database prefix** - Zmieniony prefix tabel (nie wp_)

## 🚨 Security Incident Response

### Jeśli credentials wyciekły do Git:

1. **NATYCHMIAST** zmień wszystkie hasła:
   ```bash
   # 1. Hasła bazy danych
   # 2. Hasła email SMTP  
   # 3. WordPress auth keys/salts
   # 4. reCAPTCHA keys
   ```

2. **Usuń z historii Git** (jeśli to możliwe):
   ```bash
   git filter-branch --force --index-filter \
   "git rm --cached --ignore-unmatch .env.production" \
   --prune-empty --tag-name-filter cat -- --all
   ```

3. **Wymuś push** (OSTROŻNIE!):
   ```bash
   git push origin --force --all
   git push origin --force --tags
   ```

## 🔧 Security Monitoring

### Daily Checks
- [ ] WordPress admin ostrzeżenia
- [ ] Failed login attempts (logs)
- [ ] Database size anomalies
- [ ] SSL certificate expiry (Caddy auto-handles)

### Weekly Checks  
- [ ] Plugin/theme updates
- [ ] Backup integrity tests
- [ ] Server resource usage
- [ ] Security scan (external tools)

### Monthly Checks
- [ ] Password rotation (optional)
- [ ] Access log review
- [ ] Dependency updates
- [ ] Security policy review

## 🎯 Production Deployment Flow

```bash
# 1. PRE-DEPLOYMENT
./validate-env.sh                    # ✅ Must pass
git status                          # ✅ No .env.local
grep -r "REPLACE_WITH" .env.local   # ❌ Must be empty

# 2. STAGING TEST  
./deploy-staging.sh                 # ✅ Test environment
# Manual testing on nextmodeo.sitefy.pl

# 3. PRODUCTION DEPLOYMENT
./deploy.sh                         # ⚠️ Requires "yes"
# Monitor for first 2 hours

# 4. POST-DEPLOYMENT
curl -I https://modeo.pl            # ✅ 200 OK
# Check WordPress admin for warnings
# Verify cart flow works
```

## 📞 Emergency Contacts

### Incident Response Team
- **Technical Lead**: [Your contact]
- **Server Admin**: [Your contact]  
- **Security Officer**: [Your contact]

### Service Providers
- **Domain**: home.pl / OVH
- **VPS Provider**: [Your provider]
- **Email Provider**: Hostinger
- **Payment**: Autopay/Blue Media

## 🔗 Security Resources

### Tools
- **GitGuardian**: Secret scanning
- **Validate Script**: `./validate-env.sh`
- **WordPress Security**: Wordfence (optional)
- **SSL Test**: https://www.ssllabs.com/ssltest/

### References  
- **WordPress Security**: https://wordpress.org/support/article/hardening-wordpress/
- **Docker Security**: https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html
- **Environment Security**: SECURITY.md in project root

---

**🔒 Remember: Security is everyone's responsibility. When in doubt, ask!**