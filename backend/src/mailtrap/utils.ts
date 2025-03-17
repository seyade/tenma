import { verifyToken } from "../express/middlewares";
import { mailtrapClient, emailSender } from "./mailtrap.config";
import { SIGNUP_VERIFICATION_EMAIL_TEMPLATE } from "./templates/signup-verification-email";

export const sendSignupVerificationEmail = async (
  email: string,
  verificationCode: string
) => {
  const recipients = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: emailSender,
      to: recipients,
      subject: "Verify your account",
      html: SIGNUP_VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationCode
      ),
      category: "Signup Verification Email",
    });

    console.log(`Email sent successfully.`, response);
  } catch (error) {
    console.error("ERR_SENDING_VERIFICATION_EMAIL::: ", error);
    throw new Error(`ERR_SENDING_VERIFICATION_EMAIL::: ${error}`);
  }
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  const recipients = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: emailSender,
      to: recipients,
      subject: "Verify your account",
      template_uuid: "3f6e89e4-d3c1-4497-9f95-dda032329343",
      template_variables: {
        company_info_name: "Ten.Ma",
        name,
      },
      category: "Welcome Email",
    });

    console.log("Email sent successfully.", response);
  } catch (error) {
    console.error("ERR_SENDING_WELCOME_EMAIL::: ", error);
    throw new Error(`ERR_SENDING_WELCOME_EMAIL::: ${error}`);
  }
};
