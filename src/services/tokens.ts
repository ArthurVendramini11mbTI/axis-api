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

export function createAccessToken(email: string): string {
  return jwt.sign(
    {
      email: email
    },
    JWT_SECRET,
    {
      expiresIn: "15m",
    },
  );
}

export function validateAcessToken(token: string): boolean {
  try {
      jwt.verify(token, JWT_SECRET)
      return true
    } catch {
      return false
    }
}
