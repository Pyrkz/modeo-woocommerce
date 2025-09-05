import { NextRequest, NextResponse } from 'next/server';
import { config } from '@/lib/config';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  company?: string;
  consent: boolean;
  recaptchaToken: string;
  pageSource: string;
}

interface RecaptchaResponse {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  'error-codes'?: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message || !body.consent) {
      return NextResponse.json(
        { error: 'Wypełnij wszystkie wymagane pola' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA token
    if (!body.recaptchaToken) {
      return NextResponse.json(
        { error: 'Weryfikacja reCAPTCHA nie powiodła się' },
        { status: 400 }
      );
    }

    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${config.recaptcha.secretKey}&response=${body.recaptchaToken}`,
    });

    const recaptchaData: RecaptchaResponse = await recaptchaResponse.json();

    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      console.error('reCAPTCHA failed:', recaptchaData);
      return NextResponse.json(
        { error: 'Weryfikacja bezpieczeństwa nie powiodła się' },
        { status: 403 }
      );
    }

    // Format email content
    const emailContent = `
      <h2>Nowa wiadomość z formularza kontaktowego</h2>
      <p><strong>Źródło:</strong> ${body.pageSource}</p>
      <hr>
      <p><strong>Imię:</strong> ${body.name}</p>
      <p><strong>Email:</strong> ${body.email}</p>
      ${body.phone ? `<p><strong>Telefon:</strong> ${body.phone}</p>` : ''}
      ${body.company ? `<p><strong>Firma:</strong> ${body.company}</p>` : ''}
      ${body.subject ? `<p><strong>Temat:</strong> ${body.subject}</p>` : ''}
      <p><strong>Wiadomość:</strong></p>
      <p>${body.message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>reCAPTCHA score: ${recaptchaData.score}</small></p>
      <p><small>Data: ${new Date().toLocaleString('pl-PL')}</small></p>
    `;

    // Send email via WordPress REST API
    const wpResponse = await fetch(`${config.getApiUrl()}/wp-json/wp/v2/contact-form`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'sklep@modeo.pl',
        subject: `[Modeo] Formularz kontaktowy - ${body.pageSource}`,
        message: emailContent,
        headers: {
          'Reply-To': body.email,
          'Content-Type': 'text/html; charset=UTF-8',
        },
      }),
    });

    if (!wpResponse.ok) {
      // If WordPress email fails, log detailed information
      console.error('WordPress email API failed:', {
        status: wpResponse.status,
        statusText: wpResponse.statusText,
        url: `${config.getApiUrl()}/wp-json/wp/v2/contact-form`
      });
      
      // Log the submission for manual processing
      console.log('=== CONTACT FORM SUBMISSION (WordPress email failed) ===');
      console.log('TO: sklep@modeo.pl');
      console.log('FROM:', body.email);
      console.log('NAME:', body.name);
      console.log('PHONE:', body.phone || 'Not provided');
      console.log('COMPANY:', body.company || 'Not provided');
      console.log('SUBJECT:', body.subject || 'Not provided');
      console.log('PAGE SOURCE:', body.pageSource);
      console.log('MESSAGE:', body.message);
      console.log('RECAPTCHA SCORE:', recaptchaData.score);
      console.log('TIMESTAMP:', new Date().toISOString());
      console.log('=== END OF SUBMISSION ===');

      // In development, still return success
      // In production, you might want to use a fallback email service
      return NextResponse.json(
        { 
          success: true, 
          message: 'Wiadomość została odebrana i zostanie przetworzona',
          warning: 'Email notification may be delayed'
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Wiadomość została wysłana pomyślnie' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas wysyłania wiadomości' },
      { status: 500 }
    );
  }
}