import { BadRequestException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

const sendEmail = async ({ to, subject, html }) => {
  try {
    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: 'localhost',
      port: 465,
      secure: true,
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send the email
    await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      html,
    });

    console.log('Email sent successfully');
  } catch (error) {
    throw new BadRequestException(`Error sending email, ${error}`);
  }
};

export default sendEmail;
