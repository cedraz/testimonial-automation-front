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
