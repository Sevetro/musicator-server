import nodemailer from "nodemailer";

import { localhostServerUrl } from "../constants/urls.ts";
import { musicatorEmail, musicatorEmailPass } from "../constants/envs.ts";

console.log(`musicatorEmail`, musicatorEmail);
console.log(`musicatorEmailPass`, musicatorEmailPass);

const transporter = nodemailer.createTransport({
  host: "smtp.wp.pl",
  port: 465,
  secure: true,
  auth: {
    user: musicatorEmail,
    pass: musicatorEmailPass,
  },
});

export const sendConfirmationEmail = async (
  email: string,
  confirmationToken: string
) => {
  const url = `${localhostServerUrl}/confirmEmail/${confirmationToken}`;

  await transporter.sendMail({
    from: musicatorEmail,
    to: email,
    subject: "Confirm Email",
    html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`,
  });
};
