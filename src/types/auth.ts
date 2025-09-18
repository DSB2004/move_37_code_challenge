import { Request } from "express";

export enum TokenType {
  ACCESS = "access",
  REFRESH = "refresh",
  VERIFICATION = "verification",
  PASSWORD = "password",
}

export interface DecodedToken {
  email: string;
  id: string;
  action: TokenType;
}

export interface UserRequest extends Request {
  user: DecodedToken;
}

export function AccountVerificationEmail({
  url,
  email,
}: {
  url: string;
  email: string;
}) {
  return {
    content: `Welcome!

Please verify your account by clicking the link below:
${url}

This verification link will expire in 15 minutes.

If you did not create an account, you can safely ignore this email.`,
    email,
    subject: "Verify Your Account",
  };
}

export function PasswordChangeEmail({
  url,
  email,
}: {
  url: string;
  email: string;
}) {
  return {
    content: `We received a request to reset your password.

You can set a new password by clicking the link below:
${url}

This link is valid for the next 5 minutes.

If you did not request a password reset, please ignore this email.`,
    email,
    subject: "Reset Your Password",
  };
}
