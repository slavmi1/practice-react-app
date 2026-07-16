import fs from "node:fs";
import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export type DbUser = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: "user" | "admin";
};

type DbShape = {
  users: DbUser[];
};

type SessionUser = Omit<DbUser, "password">;

type JwtPayload = {
  userId: string;
};

const dbUrl = new URL("./db.json", import.meta.url);
const JWT_SECRET = "barbertime-secret";

function readDb(): DbShape {
  const fileContent = fs.readFileSync(dbUrl, "utf8");
  return JSON.parse(fileContent) as DbShape;
}

function writeDb(db: DbShape) {
  fs.writeFileSync(dbUrl, `${JSON.stringify(db, null, 2)}\n`, "utf8");
}

export function sanitizeUser(user: DbUser): SessionUser {
  const { password, ...sessionUser } = user;

  return sessionUser;
}

export function findUserByEmail(email: string) {
  return (
    readDb().users.find((user) => user.email === email.trim().toLowerCase()) ??
    null
  );
}

export async function createUser(
  name: string,
  email: string,
  phone: string,
  password: string,
) {
  const db = readDb();

  const normalizedEmail = email.trim().toLowerCase();

  if (db.users.some((user) => user.email === normalizedEmail)) {
    return {
      ok: false as const,
      error: "User already exists",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser: DbUser = {
    _id: crypto.randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    phone: phone.trim(),
    password: hashedPassword,
    role: "user",
  };

  db.users.push(newUser);
  writeDb(db);

  return {
    ok: true as const,
    user: newUser,
  };
}

export function sendJson(
  res: import("node:http").ServerResponse,
  statusCode: number,
  payload: unknown,
) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

export async function readJsonBody<T>(
  req: import("node:http").IncomingMessage,
) {
  const chunks: Buffer[] = [];

  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const rawBody = Buffer.concat(chunks).toString("utf8").trim();
  if (!rawBody) {
    return {} as T;
  }

  return JSON.parse(rawBody) as T;
}

export function createTokenForUser(user: DbUser) {
  return jwt.sign(
    {
      userId: user._id,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

export function findUserById(userId: string) {
  return readDb().users.find((user) => user._id === userId) ?? null;
}

export function getCookie(
  cookieHeader: string | undefined,
  cookieName: string,
) {
  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(";");

  for (const cookie of cookies) {
    const [name, ...valueParts] = cookie.trim().split("=");

    if (name === cookieName) {
      return valueParts.join("=") || null;
    }
  }

  return null;
}
