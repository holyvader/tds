import type { ZodError } from 'zod';

export interface ApiErrorDefaultModel {
  kind: 'default';
  status: number;
  message: string;
}

type ApiErrorValidationModel = {
  kind: 'validation';
  result: ZodError;
};

export class ApiError<T extends ApiErrorDefaultModel = ApiErrorDefaultModel> {
  private storedError: T | ApiErrorValidationModel;

  constructor(error: T | ApiErrorValidationModel) {
    this.storedError = error;
  }

  get status(): number {
    if (this.storedError.kind === 'validation') {
      return 422;
    }
    return this.storedError.status;
  }

  get message(): string {
    if (this.storedError.kind === 'validation') {
      return this.storedError.result.message;
    }
    return this.storedError.message;
  }
}
