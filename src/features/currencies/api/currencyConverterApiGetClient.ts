import { baseGetClient } from '@core/api/baseGetClient';
import { dataType, modelSchema } from '@core/model';
import type {
  CurrencyAmountModel,
  CurrencyCodeModel,
} from '@features/currencies/currencyTypes';

const MODEL_SCHEMA = modelSchema({
  value: dataType.number(),
});

export function currencyConverterApiGetClient(
  payload: {
    from: CurrencyCodeModel;
    to: CurrencyCodeModel;
    amount: CurrencyAmountModel;
  },
  signal: AbortSignal,
) {
  return baseGetClient('/convert', MODEL_SCHEMA, {
    signal,
    urlSearchParams: payload,
  });
}
