export interface CreateUser {
  email: string;
  password: string;
  name: string;
  is_superadmin?: boolean;
}

export interface UpdateUser extends Omit<CreateUser, "is_superadmin"> {
  id: number;
}

export interface UpdateProfile extends Omit<CreateUser, "is_superadmin"> {
  id: number;
  password_confirmation: string;
}

export interface RegisterUser extends Omit<CreateUser, "is_superadmin"> {
  password_confirmation: string;
}
