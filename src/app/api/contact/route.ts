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

        const toEmail = process.env.CONTACT_EMAIL;
        const fromEmail = process.env.SENDGRID_FROM_EMAIL;

        if (!toEmail) {
            console.error('CONTACT_EMAIL is not configured');
            return NextResponse.json(
                { error: 'Email service configuration error: CONTACT_EMAIL environment variable is required' },
                { status: 500 }
            );
        }

        if (!fromEmail) {
            console.error('SENDGRID_FROM_EMAIL is not configured');
            return NextResponse.json(
                { error: 'Email service configuration error: SENDGRID_FROM_EMAIL environment variable is required' },
                { status: 500 }
            );
        }

        const emailContent = {
            to: toEmail,
            from: fromEmail,
            subject: `New Contact Form Submission - ${areaOfInterest || 'General Inquiry'}`,
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #08090A; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #08090A;">
            <!-- Header -->
            <div style="margin-bottom: 32px; text-align: left;">
              <h1 style="color: #F1F1F1; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 24px; font-weight: 600; margin: 0 0 8px 0; letter-spacing: -0.5px;">
                New Contact Form Submission
              </h1>
              <div style="width: 60px; height: 2px; background-color: #F1F1F1; margin-top: 12px;"></div>
            </div>
            
            <!-- Contact Information Card -->
            <div style="background-color: #08090A; border: 1px solid #F1F1F1; border-radius: 16px; padding: 24px; margin-bottom: 24px;">
              <div style="margin-bottom: 16px;">
                <p style="margin: 0 0 8px 0; color: #F1F1F1; font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">NAME</p>
                <p style="margin: 0; color: #F1F1F1; font-size: 16px; font-weight: 500;">${name}</p>
              </div>
              
              <div style="margin-bottom: 16px;">
                <p style="margin: 0 0 8px 0; color: #F1F1F1; font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">EMAIL</p>
                <p style="margin: 0;">
                  <a href="mailto:${email}" style="color: #F1F1F1; text-decoration: underline; font-size: 16px; font-weight: 500;">${email}</a>
                </p>
              </div>
              
              ${areaOfInterest ? `
              <div style="margin-bottom: 0;">
                <p style="margin: 0 0 8px 0; color: #F1F1F1; font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">AREA OF INTEREST</p>
                <p style="margin: 0; color: #F1F1F1; font-size: 16px; font-weight: 500;">${areaOfInterest}</p>
              </div>
              ` : ''}
            </div>
            
            <!-- Message Card -->
            <div style="margin-bottom: 32px;">
              <h3 style="color: #F1F1F1; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 18px; font-weight: 600; margin: 0 0 16px 0; letter-spacing: -0.3px;">
                Message
              </h3>
              <div style="background-color: #08090A; border: 1px solid #F1F1F1; border-left: 3px solid #F1F1F1; border-radius: 12px; padding: 20px;">
                <p style="white-space: pre-wrap; color: #F1F1F1; line-height: 1.7; font-size: 15px; margin: 0;">${message}</p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="padding-top: 24px; border-top: 1px solid #F1F1F1; margin-top: 32px;">
              <p style="color: #F1F1F1; font-size: 13px; line-height: 1.6; margin: 0 0 8px 0;">
                This email was sent from the Brillarix website contact form.
              </p>
              <p style="color: #F1F1F1; font-size: 13px; line-height: 1.6; margin: 0;">
                You can reply directly to this email to respond to <span style="font-weight: 500;">${name}</span>.
              </p>
            </div>
          </div>
        </body>
        </html>
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
            const errorBody = error.response.body;
            console.error('SendGrid error details:', errorBody);

            if (error.response.statusCode === 403 && errorBody?.errors) {
                const senderError = errorBody.errors.find((e: any) => e.field === 'from');
                if (senderError) {
                    return NextResponse.json(
                        {
                            error: 'Email configuration error: The sender email address is not verified in SendGrid. Please verify your sender identity in the SendGrid dashboard.',
                            details: senderError.message
                        },
                        { status: 500 }
                    );
                }
            }

            return NextResponse.json(
                {
                    error: 'Failed to send email. Please try again later.',
                    details: errorBody?.errors?.[0]?.message || 'Unknown SendGrid error'
                },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}

