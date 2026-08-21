import type { SelectOption } from '@designSystem/component';
import type { CurrencyCodeModel } from '@features/currencies/currencyTypes';
import type { CurrencyModel } from '../model/currencyModel';

export type CurrencySelectOption = SelectOption<CurrencyCodeModel>;

export function currencyToSelectOptionMapper(
  currency: CurrencyModel,
): CurrencySelectOption {
  return {
    label: `(${currency.short_code}) ${currency.name}`,
    value: currency.short_code,
  };
}
