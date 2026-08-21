import { Alert } from '@designSystem/component';
import {
  currencyConverterApiGetClient,
  useCurrencyListApiGetClient,
} from '@features/currencies/api';
import { currencyToSelectOptionMapper } from '@features/currencies/mapper/currencyToSelectOptionMapper';
import { useRef } from 'react';
import {
  CurrencyConverter,
  type CurrencyConverterProps,
} from './CurrencyConverter';

export function CurrencyConverterDataProvider() {
  const abortControllerRef = useRef<AbortController>(null);
  const currencyList = useCurrencyListApiGetClient();

  const currencyOptions = currencyList.success
    ? currencyList.data.response.map(currencyToSelectOptionMapper)
    : [];

  const handleConvertRequest: CurrencyConverterProps['onConvertRequest'] =
    async (model) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();
      const data = await currencyConverterApiGetClient(
        {
          from: model.fromCurrency,
          to: model.toCurrency,
          amount: model.fromAmount ?? 0,
        },
        abortControllerRef.current.signal,
      );
      if ('data' in data) {
        return data.data.value;
      }
      return Promise.resolve(0);
    };

  return (
    <>
      {currencyList.success === false && (
        <Alert mb="xl" color="red">
          [{currencyList.error.status}]: {currencyList.error.message}
        </Alert>
      )}

      <CurrencyConverter
        currencyOptionList={currencyOptions}
        loading={currencyList.loading}
        onConvertRequest={handleConvertRequest}
        disabled={currencyList.success === false}
      />
    </>
  );
}
