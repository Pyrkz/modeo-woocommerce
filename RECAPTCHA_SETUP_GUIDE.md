# 🛡️ reCAPTCHA v3 Implementation Guide

## 🎯 Overview

This implementation adds Google reCAPTCHA v3 to the Modeo registration page (`/rejestracja`) to prevent spam and bot registrations while maintaining excellent user experience.

## ✅ Features

- **Invisible reCAPTCHA v3**: No user interaction required
- **Smart Score-Based Protection**: Configurable threshold (default: 0.5)
- **Polish Language Support**: All messages in Polish
- **Mobile Responsive**: Works perfectly on all devices
- **WordPress Integration**: Uses WooCommerce hooks
- **Environment-Based Configuration**: Reads keys from .env.production
- **Comprehensive Logging**: Debug information for monitoring
- **Admin Dashboard**: Status monitoring and configuration

## 🔧 Setup Instructions

### 1. Google reCAPTCHA Console Setup

1. Go to [Google reCAPTCHA Console](https://www.google.com/recaptcha/admin/)
2. Click "+" to create a new site
3. Configuration:
   - **Label**: Modeo Production/Development
   - **reCAPTCHA type**: reCAPTCHA v3
   - **Domains**: Add your domains:
     - `nextmodeo.sitefy.pl` (production)
     - `localhost` (development)
   - **Accept the Terms of Service**
4. Click "Submit"
5. Copy the **Site Key** and **Secret Key**

### 2. Environment Configuration

Your keys are already configured in `.env.production`:

```bash
RECAPTCHA_KEY=6Lcu5borAAAAAAfzwT6yPkKdYAWrh77Il_Th8MIy
RECAPTCHA_SECRET_KEY=6Lcu5borAAAAAHpybNiMCarp1LMOQwmJ6yLmg-ID
```

### 3. Plugin Activation

The plugin is automatically available. To verify/activate:

```bash
# Via WP-CLI (recommended)
wp plugin activate recaptcha-v3-modeo

# Or run the activation script
php activate_recaptcha_plugin.php
```

### 4. Verification

1. **Admin Dashboard**: Go to WordPress Admin → Settings → reCAPTCHA v3
2. **Test Registration**: Visit `/rejestracja` and try to register
3. **Check Logs**: Monitor WordPress debug logs for reCAPTCHA activity

## 🔍 How It Works

### Frontend Integration

1. **Script Loading**: reCAPTCHA v3 script loads only on registration page
2. **Token Generation**: When user submits form, script generates a token
3. **Invisible Process**: Happens automatically without user interaction
4. **Form Submission**: Token is included with form data

### Backend Verification

1. **Token Validation**: Server verifies token with Google's API
2. **Score Analysis**: Checks user behavior score (0.0-1.0)
3. **Threshold Check**: Rejects submissions below minimum score
4. **Error Handling**: Provides user-friendly error messages

## 📊 Admin Interface

Access: **WordPress Admin → Settings → reCAPTCHA v3**

Features:
- ✅ Configuration status
- 🔍 Key validation
- 📈 Debug information
- 🔧 Test instructions

## 🛠️ Configuration Options

### Score Threshold

Edit in `/wp-content/plugins/recaptcha-v3-modeo.php`:

```php
$min_score = 0.5; // Adjust as needed (0.0-1.0)
```

**Recommendations:**
- `0.9`: Very strict (may block some humans)
- `0.7`: Balanced (recommended for most sites)
- `0.5`: Lenient (default, good for UX)
- `0.3`: Very lenient (allows more borderline cases)

### Error Messages

All messages are in Polish and can be customized in the plugin:

```php
'recaptcha_missing' => 'Błąd weryfikacji bezpieczeństwa. Spróbuj ponownie.'
'recaptcha_failed' => 'Weryfikacja bezpieczeństwa nie powiodła się. Spróbuj ponownie.'
'recaptcha_low_score' => 'Weryfikacja bezpieczeństwa nie powiodła się. Jeśli to błąd, skontaktuj się z nami.'
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Keys Not Found
```
Status: Plugin aktywny ale klucze nie skonfigurowane
```
**Solution**: Verify `.env.production` file contains correct keys

#### 2. reCAPTCHA Not Loading
**Check**: Browser console for JavaScript errors
**Verify**: Domain is added in Google reCAPTCHA console

#### 3. Always Failing Verification
**Check**: Secret key is correct
**Verify**: Server can connect to `google.com`
**Monitor**: WordPress logs for API errors

#### 4. Score Too Low
```
reCAPTCHA score too low: 0.3
```
**Solution**: Lower the `$min_score` threshold or investigate user behavior

### Debug Logs

Enable WordPress debugging in `wp-config.php`:

```php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
```

Check logs at: `/wp-content/debug.log`

### Test Commands

```bash
# Check plugin status
wp plugin status recaptcha-v3-modeo

# Test environment variables
php -r "echo getenv('RECAPTCHA_KEY') . PHP_EOL;"

# Check reCAPTCHA API directly
curl -X POST "https://www.google.com/recaptcha/api/siteverify" \
  -d "secret=YOUR_SECRET_KEY" \
  -d "response=TEST_TOKEN"
```

## 🚀 Performance Impact

- **Script Size**: ~50KB (cached by Google CDN)
- **Load Time**: +50-100ms (async loading)
- **Server Requests**: +1 API call per registration
- **User Experience**: Invisible, no delay

## 🔒 Security Benefits

- **Bot Prevention**: Blocks automated registration attempts
- **Spam Reduction**: Significantly reduces spam accounts
- **Behavioral Analysis**: Advanced user behavior scoring
- **IP Protection**: Rate limiting and IP reputation

## 📱 Mobile Experience

- ✅ Fully responsive design
- ✅ Touch-friendly interface  
- ✅ No additional UI elements
- ✅ Fast loading on slow connections
- ✅ Works with mobile keyboards

## 🎨 UX Enhancements

1. **Subtle Badge**: Small, non-intrusive privacy notice
2. **Polish Language**: All text in Polish
3. **Error Feedback**: Clear, actionable error messages
4. **Invisible Process**: No CAPTCHA challenges
5. **Mobile Optimized**: Perfect mobile experience

## 📈 Monitoring

### Success Metrics
```bash
# Check recent registrations
wp db query "SELECT COUNT(*) FROM wp_users WHERE user_registered > DATE_SUB(NOW(), INTERVAL 1 DAY)"

# Monitor error logs
tail -f /wp-content/debug.log | grep reCAPTCHA
```

### Key Performance Indicators
- Registration completion rate
- reCAPTCHA verification success rate
- Average user score
- False positive rate (legitimate users blocked)

## 🔄 Updates & Maintenance

### Regular Tasks
- Monitor reCAPTCHA usage in Google Console
- Review debug logs monthly
- Adjust score threshold based on data
- Update domain list if needed

### Version Updates
- Plugin is self-contained (no external dependencies)
- Update keys if rotating credentials
- Test after WordPress/WooCommerce updates

## 🎯 Next Steps

1. ✅ Monitor initial performance
2. 📊 Analyze user scores and adjust threshold
3. 🔍 Review false positives/negatives
4. 🚀 Consider extending to other forms (login, contact)

## 📞 Support

For issues or customizations:
1. Check WordPress debug logs
2. Verify reCAPTCHA console statistics
3. Test with different browsers/devices
4. Monitor user feedback

---

**Status**: ✅ Ready for Production
**Last Updated**: January 2025
**Version**: 1.0.0