import jwt, { type JwtPayload } from "jsonwebtoken";
import { AuthenticatedUser } from "../types/userTypes";

function getRequiredEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
      throw new Error(`A variável ${name} não foi configurada.`);
    }

    return value;
  }

const JWT_SECRET = getRequiredEnv('JWT_SECRET')

export function createAccessToken(userData: AuthenticatedUser): string {
  return jwt.sign(
    {
      email: userData.email,
      role: userData.role,
    },
    JWT_SECRET,
    {
      subject: String(userData.id),
      expiresIn: "15m",
      algorithm: "HS256",
      issuer: "study-app-api",
      audience: "study-app-web",
    },
  );
}