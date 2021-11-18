import Iron from "@hapi/iron";
import { MAX_AGE, setTokenCookie, getTokenCookie } from "./auth-cookies";
import crypto from "crypto";

import type { NextApiRequest, NextApiResponse } from "next";

const TOKEN_SECRET = process.env.TOKEN_SECRET;

type Session = {
  userId: Number;
  email: string;
  iv: string;
  createdAt: Number;
  maxAge: Number;
};

export async function setLoginSession(res: NextApiResponse, session: Session) {
  const createdAt = Date.now();
  // Create a session object with a max age that we can validate later
  const obj = { ...session, createdAt, maxAge: MAX_AGE };
  const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults);

  setTokenCookie(res, token);
}

export async function getLoginSession(req: NextApiRequest): Promise<Session> {
  const token = getTokenCookie(req);

  if (!token) return;

  const session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults);
  const expiresAt = session.createdAt + session.maxAge * 1000;

  // Validate the expiration date of the session
  if (Date.now() > expiresAt) {
    throw new Error("Session expired");
  }

  // console.log("session", session);

  return session;
}
