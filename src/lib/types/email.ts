export interface EmailData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}