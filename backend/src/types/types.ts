export interface UserDetails {
  fullName: string;
  email: string;
  password?: string;
  google?: boolean;
  is_active?: boolean;
}

export interface CustomRequest extends Request {
  user?: UserDetails;
}
