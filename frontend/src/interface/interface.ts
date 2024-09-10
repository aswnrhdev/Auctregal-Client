export interface verifySignup {
    name: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
    otp: string;
    isGoogle?: boolean;
    image?: string | null;
  }