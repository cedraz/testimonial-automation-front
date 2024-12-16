export type BadRequestErrorResponseType = {
  message: [{ property: string; message: string }];
  error: string;
  statusCode: number;
};

export type ErrorResponse = {
  message: string;
  error: string;
  statusCode: number;
};

export type TAdmin = {
  id: string;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  image: string;
  email_verified_at: Date;
  company_name: string;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  stripe_price_id: string;
  stripe_subscription_status: string;
};

export enum VerificationType {
  EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
  PASSWORD_RESET = 'PASSWORD_RESET'
}

export type TVerificationRequest = {
  id: string;
  identifier: string;
  type: VerificationType;
  expires: Date;
  created_at: Date;
  updated_at: Date;
};
