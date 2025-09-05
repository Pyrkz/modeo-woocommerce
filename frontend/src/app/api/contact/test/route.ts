import { NextResponse } from 'next/server';
import { config } from '@/lib/config';

// Test endpoint to verify email configuration
export async function GET() {
  return NextResponse.json({
    message: 'Contact form API test endpoint',
    config: {
      recaptchaSiteKey: config.recaptcha.siteKey ? '✅ Configured' : '❌ Missing',
      recaptchaSecretKey: config.recaptcha.secretKey ? '✅ Configured' : '❌ Missing',
      wordpressUrl: config.getApiUrl(),
      emailRecipient: 'sklep@modeo.pl'
    },
    instructions: {
      test: 'Send a POST request to /api/contact with the following body:',
      body: {
        name: 'Test User',
        email: 'test@example.com',
        phone: '+48 123 456 789',
        subject: 'Test Subject',
        message: 'Test message',
        consent: true,
        recaptchaToken: 'test-token-from-recaptcha',
        pageSource: 'Test Page'
      }
    }
  });
}