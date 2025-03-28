import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { to, subject, html } = data;

    // Validate the request
    if (!to || !subject || !html) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // In a real application, you would use a service like SendGrid, AWS SES, or Nodemailer
    // For now, we'll just log the email details and return a success response
    console.log("Email would be sent with the following details:");
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`HTML Content: ${html}`);

    // In production, you would add code like this:
    /*
    // Using AWS SES (requires aws-sdk)
    const AWS = require('aws-sdk');
    const ses = new AWS.SES({ region: 'us-east-1' });
    
    await ses.sendEmail({
      Source: 'noreply@hanoiphoria.com',
      Destination: { ToAddresses: [to] },
      Message: {
        Subject: { Data: subject },
        Body: { Html: { Data: html } }
      }
    }).promise();
    */

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
