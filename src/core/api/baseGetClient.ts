import type { InferModel, ModelSchema } from '../model';
import { ApiError, type ApiErrorDefaultModel } from './apiError';

const API_URL = process.env.API_URL;

export type ApiPath = `/${string}`;

// for internal usage only, only json type supported
// ApiErrorDefaultModel can be overrided
// baseGetClient always succeeds
export async function baseGetClient<
  MODEL extends ModelSchema,
  ERR_MODEL extends ApiErrorDefaultModel = ApiErrorDefaultModel,
>(
  path: ApiPath,
  model: MODEL,
  requestInit?: Omit<RequestInit, 'method'> & {
    urlSearchParams?: Record<string, string | number>;
  },
): Promise<
  | {
      data: InferModel<MODEL>;
    }
  | { error: ApiError<ERR_MODEL> }
> {
  try {
    const searchParams = Object.entries(
      saniziteObject(requestInit?.urlSearchParams),
    ).reduce<URLSearchParams>((searchParams, [name, value]) => {
      searchParams.append(name, `${value}`);
      return searchParams;
    }, new URLSearchParams());

    const response = await fetch(
      `${API_URL}${path}${searchParams.size > 0 ? `?${searchParams.toString()}` : ``}`,
      {
        headers: {
          Accept: 'application/json',
        },
        ...requestInit,
      },
    );
    if (response.ok) {
      const data = (await response.json()) as unknown;
      const parseResult = model.safeParse(data);

      if (!parseResult.success) {
        return {
          error: new ApiError<ERR_MODEL>({
            kind: 'validation',
            result: parseResult.error,
          }),
        };
      } else {
        return {
          data: parseResult.data,
        };
      }
    }
    return {
      error: new ApiError({
        kind: 'default',
        status: response.status,
        message: response.statusText,
      } as ERR_MODEL),
    };
  } catch {
    return {
      error: new ApiError({
        status: 500,
        kind: 'default',
        message: 'Internal Server Error',
      } as ERR_MODEL),
    };
  }
}

// TBD remove empty values
function saniziteObject<T extends Record<string, string | number>>(
  obj: T | undefined,
): T | Record<string, never> {
  return obj ?? {};
}
