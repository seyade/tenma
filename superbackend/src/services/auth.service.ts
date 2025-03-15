type CreateAccount = {
  username: string;
  email: string;
  password: string;
  userAgent?: string;
};

export const createAccount = async (data: CreateAccount) => {
  // check user doesn't exist
  // create user
  // create verification code
  // send verification email
  // create session?
  // jwt: sign access token and refresh token
  // return user and access token
};
