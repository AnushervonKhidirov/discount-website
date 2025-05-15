export type Token = {
  accessToken: string;
  refreshToken: string;
};

export type LogInData = {
  username: string;
  password: string;
};

export type SignUpData = {
  username: string;
  password: string;
  repeat_password: string;
};
