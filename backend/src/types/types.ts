export interface User {
  fullName: string;
  email: string;
  // Add other user properties as needed
}

export interface CustomRequest extends Request {
  user?: User;
}
