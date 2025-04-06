export interface User {
  id: string;
  name: string;
  email: string;
  matricula: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}


export interface CreateUserData {
  name: string
  email: string
  matricula: string
  password: string
}

export interface UpdateUserData {
  name?: string
  email?: string
  matricula?: string
  password?: string
}
