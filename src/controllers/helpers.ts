import { HttpResponse } from "./protocols";

const createResponse = <T>(statusCode: number, body: T): HttpResponse<T> => ({
  statusCode,
  body
});

export const badRequest = (message: string): HttpResponse<string> => 
  createResponse(400, message);

export const serverError = (): HttpResponse<string> => 
  createResponse(500, 'Something went wrong');

export const ok = <T>(data: T): HttpResponse<T> => 
  createResponse(200, data);

export const created = <T>(data: T): HttpResponse<T> => 
  createResponse(201, data);
