import { useEffect, useReducer } from 'react';
import type { InferModel, ModelSchema } from '../model';
import type { ApiError, ApiErrorDefaultModel } from './apiError';
import { baseGetClient } from './baseGetClient';

type ApiGetClientOutput<
  MODEL extends ModelSchema,
  ERR_MODEL extends ApiErrorDefaultModel = ApiErrorDefaultModel,
> =
  | { loading: true; success: null }
  | { loading: false; success: true; data: InferModel<MODEL> }
  | { loading: false; success: false; error: ApiError<ERR_MODEL> };

export function useApiGetClient<
  MODEL extends ModelSchema,
  ERR_MODEL extends ApiErrorDefaultModel = ApiErrorDefaultModel,
>(
  ...[path, model, requestInit]: Parameters<
    typeof baseGetClient<MODEL, ERR_MODEL>
  >
): ApiGetClientOutput<MODEL, ERR_MODEL> {
  const [output, dispatch] = useReducer(
    (
      _: ApiGetClientOutput<MODEL, ERR_MODEL>,
      action: ApiGetClientOutput<MODEL, ERR_MODEL>,
    ) => action,
    {
      loading: true,
      success: null,
    },
  );

  useEffect(() => {
    const abortController = new AbortController();

    dispatch({
      loading: true,
      success: null,
    });

    baseGetClient<MODEL, ERR_MODEL>(path, model, {
      signal: abortController.signal,
      ...requestInit,
    }).then((data) => {
      if ('error' in data) {
        dispatch({
          error: data.error,
          success: false,
          loading: false,
        });
      } else {
        dispatch({
          data: data.data,
          success: true,
          loading: false,
        });
      }
    });

    return () => {
      abortController.abort('Unmount');
    };
  }, [path, model, requestInit]);

  return output;
}
