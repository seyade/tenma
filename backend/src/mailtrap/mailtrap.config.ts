import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
import { SIGNUP_VERIFICATION_EMAIL_TEMPLATE } from "./templates/signup-verification-email";

dotenv.config();

export const mailtrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN as string,
});

export const emailSender = {
  email: "hello@demomailtrap.co",
  name: "Ten.Ma",
};

// Uncomment for testing if template works
// mailtrapClient.send({
//   from: emailSender,
//   to: [{ email: process.env.MY_EMAIL }],
//   subject: "Verify your account",
//   html: SIGNUP_VERIFICATION_EMAIL_TEMPLATE.replace(
//     "{verificationCode}",
//     "235987"
//   ),
//   category: "Signup Verification Email",
// });

// console.log("Verification email sent");
