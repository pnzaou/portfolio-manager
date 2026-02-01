import { Request } from 'express';

export interface AuthRequest extends Request {
  userId?: string;
}

export interface ProjectInput {
  name: string;
  description: string;
  technologies: string[];
}

export interface UserPayload {
  userId: string;
  email: string;
}