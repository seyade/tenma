export const generateVerificationCode = () =>
  Math.floor(Math.random() * 900000).toString();

const verifCode = generateVerificationCode();

console.log("Verifcation code test:::", verifCode);
