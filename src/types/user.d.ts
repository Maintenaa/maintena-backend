export interface CreateUser {
  email: string;
  password: string;
  name: string;
  is_superadmin?: boolean;
}
