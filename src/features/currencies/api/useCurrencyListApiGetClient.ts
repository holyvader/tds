import { useApiGetClient } from '@core/api';
import { dataType, modelSchema } from '@core/model';
import { CURRENCY_MODEL_SCHEMA } from '@features/currencies/model/currencyModel';

const RESPONSE_MODEL = modelSchema({
  response: dataType.array(CURRENCY_MODEL_SCHEMA),
});

export function useCurrencyListApiGetClient() {
  return useApiGetClient('/currencies', RESPONSE_MODEL);
}
