export const SIGNUP_VERIFICATION_EMAIL_TEMPLATE = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Verify Code</title>
    </head>
    <body>
      <div style="padding-bottom:64px;font-size:16px;font-family:'Montserrat',arial,sans-serif;text-align:center;color:#05192d;background-color:#f7f7fc">
        <h1 style="padding:64px;margin-bottom:64px;background-color:#05192d;color:white;font-size:24px;font-weight:bold;">Ten.Ma</h1>
        <div style="width:75%;padding: 32px;margin:auto;">
          <h2 style="margin-bottom:48px;font-size:40px;font-weight:bold;">Verify your code to get started</h2>
          <p style="text-align:left;">Hi there,</p>
          <p style="text-align:left;">You're almost there! To complete your sign up, please verify your email address.</p>
          <p style="font-weight:bold;font-size:24px;">Code: {verificationCode}</p>
          <p style="text-align:left;">See you shortly!</p>
        </div>
      </div>
    <body>
  </html>
`;
