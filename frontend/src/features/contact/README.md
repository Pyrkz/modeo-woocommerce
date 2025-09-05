# Contact Form Feature

Secure contact form system with reCAPTCHA v3 protection and email delivery.

## Features

- ✅ reCAPTCHA v3 integration for bot protection
- ✅ Email delivery to `sklep@modeo.pl`
- ✅ Page source tracking (knows which page the message came from)
- ✅ Responsive design with mobile optimization
- ✅ Form validation with Polish error messages
- ✅ Multiple form variants (standard, responsive, optimized)

## Usage

### Basic Contact Form

```tsx
import { ContactForm } from '@/features/contact';

<ContactForm pageSource="Strona główna" />
```

### Contact Form with Team Member

```tsx
import { ContactSection } from '@/features/contact';
import { getTeamMemberByName } from '@/features/team';

const teamMember = getTeamMemberByName('Piotr Ziętal');

<ContactSection 
  teamMember={teamMember}
  pageSource="Strona o nas"
/>
```

### Product Inquiry Modal

```tsx
import { ContactModal } from '@/features/branding-products';

<ContactModal 
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  product={product}
/>
```

## Configuration

### Environment Variables

Add these to your `.env.local`:

```bash
# reCAPTCHA v3 Keys
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lcu5borAAAAAAfzwT6yPkKdYAWrh77Il_Th8MIy
RECAPTCHA_SECRET_KEY=6Lcu5borAAAAAHpybNiMCarp1LMOQwmJ6yLmg-ID
```

### WordPress Plugin

The contact form requires the `modeo-contact-form.php` plugin to be activated in WordPress for email delivery.

## Email Format

Emails are sent to `sklep@modeo.pl` with the following format:

```
Subject: [Modeo] Formularz kontaktowy - {pageSource}

Content:
- Źródło: {pageSource}
- Imię: {name}
- Email: {email}
- Telefon: {phone}
- Firma: {company}
- Temat: {subject}
- Wiadomość: {message}
- reCAPTCHA score: {score}
- Data: {timestamp}
```

## Security

- reCAPTCHA v3 validates all submissions
- Minimum score threshold: 0.5
- Server-side validation and sanitization
- CORS protection for API endpoints
- Rate limiting recommended for production

## Troubleshooting

### reCAPTCHA Not Loading
- Check if site key is configured in `.env.local`
- Verify domain is whitelisted in Google reCAPTCHA console

### Emails Not Sending
- Verify WordPress plugin is activated
- Check WordPress email configuration (SMTP recommended)
- Look for logs in Next.js console (fallback logging)

### CORS Errors
- Ensure `cors-for-nextjs.php` plugin is active in WordPress
- Check allowed origins match your domain

## Development

### Testing the API

```bash
# Check configuration
curl http://localhost:3000/api/contact/test

# Test submission (replace with actual reCAPTCHA token)
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message",
    "consent": true,
    "recaptchaToken": "test-token",
    "pageSource": "Test Page"
  }'
```

### Local Email Testing

For local development without SMTP:
1. Check Next.js console for logged submissions
2. WordPress debug.log will show email attempts
3. Use a service like MailHog for local email capture