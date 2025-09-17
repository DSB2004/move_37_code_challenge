import dotenv from "dotenv";

dotenv.config();

const PORT = Number(process.env.PORT || "3000");
const JWT_SECRET = process.env.JWT_SECRET || "samplesecret";

if (!PORT || !JWT_SECRET) throw new Error("PORT ,JWT_SECRET missing");

export { PORT, JWT_SECRET };
