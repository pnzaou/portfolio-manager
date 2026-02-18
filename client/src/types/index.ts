export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface Image {
  id: string;
  url: string;
  publicId: string;
  projectId: string;
  createdAt: string;
}

export interface Technology {
  id: string;
  name: string;
  projectId: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  images: Image[];
  technologies: Technology[];
}

export interface ProjectInput {
  name: string;
  description: string;
  technologies: string[];
  images?: FileList;
}