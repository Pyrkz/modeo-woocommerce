# Production Authentication Setup - Modeo E-commerce

## 📋 Overview

This document describes the production-ready authentication system implemented for Modeo.pl that integrates WordPress login with Next.js user display.

## 🏗️ Architecture

### Production Flow (modeo.pl)
```
User clicks "Zaloguj się" → Redirects to https://modeo.pl/wp-login.php
User logs in via WordPress → WordPress sets authentication cookies  
User returns to Next.js → Next.js reads authentication status via API
Next.js displays logged-in user → User can access account features
```

### Development Flow (localhost)  
```
User clicks "Zaloguj się" → Redirects to http://localhost:8080/wp-login.php
User logs in via WordPress → WordPress sets authentication cookies
User returns to Next.js → Next.js reads authentication status via API  
Next.js displays logged-in user → DEV menu available for testing
```

## 🔌 Components Implemented

### 1. WordPress Authentication Plugin
**File**: `backend/wp-content/plugins/nextjs-auth-helper.php`

- ✅ Secure REST API endpoint: `/wp-json/nextjs/v1/auth/status`
- ✅ CORS headers for Next.js communication
- ✅ WordPress cookie-based authentication detection
- ✅ User profile data transformation for frontend
- ✅ Authentication status cookies for quick detection

### 2. Updated Auth API  
**File**: `frontend/src/features/auth/api/auth.api.ts`

- ✅ Uses new WordPress authentication endpoint
- ✅ Proper error handling and fallbacks
- ✅ Compatible with existing frontend code
- ✅ Removes development-only token authentication

### 3. Production-Ready User Menu
**File**: `frontend/src/features/auth/components/UserMenu.tsx`

- ✅ Clean production interface without dev features
- ✅ WordPress login/logout redirects
- ✅ User profile display with avatar support
- ✅ Account management links (orders, addresses)
- ✅ Development mode still has debugging tools

### 4. Reverse Proxy Configuration
**File**: `Caddyfile.prod`

- ✅ Routes authentication paths to WordPress
- ✅ Handles `/wp-login*`, `/moje-konto*`, `/wp-json*`
- ✅ Cookie sharing between Next.js and WordPress
- ✅ HTTPS and security headers

## 🚀 Production Deployment

### Authentication Endpoints
```
GET https://modeo.pl/wp-json/nextjs/v1/auth/status
→ Returns user authentication status and profile

GET https://modeo.pl/wp-login.php?redirect_to=https://modeo.pl/
→ WordPress login form with return URL

GET https://modeo.pl/wp-admin/admin-ajax.php?action=logout&redirect_to=https://modeo.pl/
→ WordPress logout with return URL
```

### User Experience Flow

1. **Login Process**:
   - User clicks "Zaloguj się" in header
   - Redirects to WordPress login form
   - After login, returns to Next.js homepage
   - Header shows user's name and avatar

2. **Account Management**:
   - User dropdown shows "Moje konto", "Moje zamówienia", "Adresy"
   - All links redirect to WordPress account pages
   - Maintains session across domain

3. **Logout Process**:
   - User clicks "Wyloguj się"
   - Clears WordPress session
   - Returns to Next.js homepage
   - Header shows "Zaloguj się" again

## 🔧 Development Features

### In Development Mode Only:
- **DEV Menu**: Provides quick links to WordPress admin
- **WordPress Login**: Direct link to wp-login.php  
- **WP Admin Panel**: Direct link to wp-admin

### Removed from Production:
- ❌ Mock user login functionality
- ❌ API-based login buttons  
- ❌ Development user simulation
- ❌ Orange dev styling and indicators

## 🛡️ Security Features

### WordPress Plugin Security:
- CORS headers restricted to allowed origins
- HttpOnly cookies for authentication status
- Proper permission callbacks on endpoints
- Input sanitization and validation

### Frontend Security:
- Credentials included in API calls for cookie sharing
- Secure redirect URL building
- Error handling without sensitive data exposure
- Production environment detection

## 📊 Testing Checklist

### ✅ Completed Tests:
- [x] WordPress plugin activation and endpoint accessibility
- [x] CORS headers working between localhost:3000 and localhost:8080
- [x] Authentication status API returning proper responses
- [x] User menu displays clean interface without dev features
- [x] Development environment shows DEV menu for debugging

### 🔄 Ready for Production:
- [x] Authentication plugin ready for deployment
- [x] Next.js build will use production endpoints  
- [x] Caddy reverse proxy configured for auth routing
- [x] Security headers and HTTPS handling ready
- [x] Cookie sharing configured for modeo.pl domain

## 🎯 Next Steps for Production

1. **Deploy to modeo.pl**:
   ```bash
   ./deploy.sh
   ```

2. **Verify authentication flow**:
   - Test login at https://modeo.pl/wp-login.php
   - Confirm user display in Next.js header
   - Test logout functionality
   - Verify account page redirects work

3. **Monitor authentication**:
   - Check Caddy logs for auth routing
   - Monitor WordPress auth endpoint usage
   - Verify cookie sharing across subdomains

## 🔍 Troubleshooting

### Common Issues:

**"Authentication check failed"**:
- Verify WordPress plugin is active
- Check CORS configuration
- Ensure cookies are being set by WordPress

**User not displaying in header**:
- Check `/wp-json/nextjs/v1/auth/status` endpoint
- Verify WordPress session is active
- Check browser cookies for authentication

**Login redirect not working**:  
- Verify Caddyfile routing for `/wp-login*`
- Check redirect URL encoding
- Ensure WordPress permalinks are set correctly

---

**🎉 Authentication system is now production-ready for modeo.pl deployment!**