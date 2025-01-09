import nodemailer from "nodemailer";

import { musicatorAppUrl } from "../constants/urls.ts";
import { MUSICATOR_EMAIL, MUSICATOR_EMAIL_PASS } from "../constants/envs.ts";

const transporter = nodemailer.createTransport({
  host: "smtp.wp.pl",
  port: 465,
  secure: true,
  auth: {
    user: MUSICATOR_EMAIL,
    pass: MUSICATOR_EMAIL_PASS,
  },
});

export const sendConfirmationEmail = async (
  email: string,
  confirmationToken: string
) => {
  const url = `${musicatorAppUrl}/confirm_email/${confirmationToken}`;

  await transporter.sendMail({
    from: MUSICATOR_EMAIL,
    to: email,
    subject: "Confirm Email",
    html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`,
  });
};
