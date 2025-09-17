import { SignJWT, jwtVerify } from "jose";
import { JWT_SECRET } from "../config";

const secret = new TextEncoder().encode(JWT_SECRET);
const alg = "HS256";

export const createJWT = async ({
  payload,
  expireIn,
}: {
  payload: any;
  expireIn: string | number;
}) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime(expireIn)
    .sign(secret);
};

export async function verifyJWT<T>(token: string): Promise<T | null> {
  try {
    const { payload } = await jwtVerify<T>(token, secret);
    return payload;
  } catch (e) {
    console.error("JWT verification failed:", e);
    return null;
  }
}
