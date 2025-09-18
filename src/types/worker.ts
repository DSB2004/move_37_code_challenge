export enum QUEUE_ENUM {
  EMAIL_QUEUE = "email_queue",
}

export interface SendMailDTO {
  email: string;
  content: string;
  subject: string;
}
