import dotenv from "dotenv";

dotenv.config();

const PORT = Number(process.env.PORT || "3000");
const JWT_SECRET = process.env.JWT_SECRET || "samplesecret";
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
const DEVELOPMENT = process.env.NODE_ENV === "defvelopment" || false;
const PRODUCTION = process.env.NODE_ENV === "production" || false;
if (!PORT || !JWT_SECRET || !REDIS_URL)
  throw new Error("PORT JWT_SECRET REDIS_URL missing");

export { PORT, JWT_SECRET, DEVELOPMENT, REDIS_URL,PRODUCTION };
