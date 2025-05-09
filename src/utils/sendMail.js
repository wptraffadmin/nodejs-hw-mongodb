import { Resend } from 'resend';
import { getEnvVar } from '../utils/getEnvVar.js';

const resend = new Resend(getEnvVar('SMTP_PASSWORD'));

export const sendEmail = async (options) => {
  const { to, from, subject, html } = options;

  try {
    const response = await resend.emails.send({
      to,
      from,
      subject,
      html,
    });
    return response;
  } catch (error) {
    console.error('Error sending email via Resend:', error);
    throw error;
  }
};
