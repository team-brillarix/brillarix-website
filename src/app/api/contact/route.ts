import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export async function POST(request: NextRequest) {
    try {
        if (!process.env.SENDGRID_API_KEY) {
            console.error('SENDGRID_API_KEY is not configured');
            return NextResponse.json(
                { error: 'Email service is not configured' },
                { status: 500 }
            );
        }

        const body = await request.json();
        const { name, email, areaOfInterest, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        const toEmail = process.env.CONTACT_EMAIL || 'contact@brillarix.com';
        const fromEmail = process.env.SENDGRID_FROM_EMAIL || 'noreply@brillarix.com';

        const emailContent = {
            to: toEmail,
            from: fromEmail,
            subject: `New Contact Form Submission - ${areaOfInterest || 'General Inquiry'}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${areaOfInterest ? `<p style="margin: 10px 0;"><strong>Area of Interest:</strong> ${areaOfInterest}</p>` : ''}
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 10px;">Message:</h3>
            <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #4F46E5; border-radius: 4px;">
              <p style="white-space: pre-wrap; color: #555; line-height: 1.6;">${message}</p>
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
            <p>This email was sent from the Brillarix website contact form.</p>
            <p>You can reply directly to this email to respond to ${name}.</p>
          </div>
        </div>
      `,
            text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${areaOfInterest ? `Area of Interest: ${areaOfInterest}` : ''}

Message:
${message}

---
This email was sent from the Brillarix website contact form.
      `.trim(),
            replyTo: email,
        };

        await sgMail.send(emailContent);

        return NextResponse.json(
            { message: 'Email sent successfully' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error sending email:', error);

        if (error.response) {
            console.error('SendGrid error details:', error.response.body);
            return NextResponse.json(
                { error: 'Failed to send email. Please try again later.' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}

