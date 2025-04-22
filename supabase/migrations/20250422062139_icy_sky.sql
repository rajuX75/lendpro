/*
  # Email Templates Configuration
  
  This migration sets up custom email templates for authentication.
*/

-- Configure Email Templates
BEGIN;

-- Magic Link Template
SELECT auth.set_email_template(
  'magiclink',
  'Your LendTracker Login Link',
  '<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body style="background-color: #f9fafb; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h2 style="color: #1e40af; margin-bottom: 20px; text-align: center;">Welcome to LendTracker</h2>
        <p style="color: #374151; font-size: 16px; line-height: 24px;">Hello {{ .email }},</p>
        <p style="color: #374151; font-size: 16px; line-height: 24px;">Click the button below to sign in to your LendTracker account. This link will expire in 24 hours.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="{{ .link }}" style="background-color: #3b82f6; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; font-weight: bold;">Sign In to LendTracker</a>
        </div>
        <p style="color: #6b7280; font-size: 14px;">If you did not request this email, please ignore it.</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <p style="color: #6b7280; font-size: 12px; text-align: center;">© 2025 LendTracker. All rights reserved.</p>
      </div>
    </body>
  </html>'
);

COMMIT;