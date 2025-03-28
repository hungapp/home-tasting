/**
 * Helper function to send emails
 */
export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    const response = await fetch('/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        subject,
        html,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to send email: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

/**
 * Generate HTML for reservation confirmation email
 */
export function generateReservationEmail({
  name,
  date,
  time,
  guests,
}: {
  name: string;
  date: string;
  time: string;
  guests: number;
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
        }
        .header {
          background-color: #5D0C1D;
          color: white;
          padding: 20px;
          text-align: center;
        }
        .content {
          padding: 20px;
        }
        .reservation-details {
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 15px;
          margin: 20px 0;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }
        .detail-row:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }
        .footer {
          font-size: 12px;
          color: #666;
          text-align: center;
          margin-top: 30px;
          padding-top: 10px;
          border-top: 1px solid #eee;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Hanoi Phoria</h1>
        <p>Home Tasting Experience</p>
      </div>
      
      <div class="content">
        <h2>Reservation Confirmation</h2>
        <p>Dear ${name},</p>
        <p>Thank you for reserving a spot at our home tasting experience. We're excited to have you join us!</p>
        
        <div class="reservation-details">
          <h3>Your Reservation Details:</h3>
          <div class="detail-row">
            <strong>Date:</strong> <span>${date}</span>
          </div>
          <div class="detail-row">
            <strong>Time:</strong> <span>${time}</span>
          </div>
          <div class="detail-row">
            <strong>Number of Guests:</strong> <span>${guests} ${guests === 1 ? 'person' : 'people'}</span>
          </div>
          <div class="detail-row">
            <strong>Location:</strong> <span>123 Main Street, Boston, MA 02115</span>
          </div>
        </div>
        
        <h3>What to Expect:</h3>
        <p>During this tasting experience, you'll enjoy authentic Hanoi-style pho and learn about the culinary traditions behind this iconic Vietnamese dish.</p>
        
        <p>If you need to cancel or modify your reservation, please contact us at least 24 hours in advance at <a href="mailto:contact@hanoiphoria.com">contact@hanoiphoria.com</a>.</p>
        
        <p>We look forward to hosting you!</p>
        
        <p>Best regards,<br>The Hanoi Phoria Team</p>
      </div>
      
      <div class="footer">
        <p>© 2025 Hanoi Phoria. All rights reserved.</p>
        <p>This email was sent to confirm your reservation. Please do not reply to this email.</p>
      </div>
    </body>
    </html>
  `;
}
