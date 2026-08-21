import type { CurrencyModel as OriginalCurrencyModel } from '@features/currencies/model/currencyModel';

export type CurrencyModel = OriginalCurrencyModel;
export type CurrencyAmountModel = string;
export type CurrencyCodeModel = CurrencyModel['short_code'];
