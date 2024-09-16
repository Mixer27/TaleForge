import 'express-session';
import mongoose from 'mongoose';

declare module 'express' {
  interface Request {
    session: session.Session & Partial<session.SessionData>;
  }
}