import { userPreferencesUtil } from '@core/util/userPreferencesUtil';
import type {
  CurrencyAmountModel,
  CurrencyCodeModel,
} from '@features/currencies/currencyTypes';

export function currencyAmountFromatter(
  amount: CurrencyAmountModel | number,
  currencyCode: CurrencyCodeModel,
) {
  return new Intl.NumberFormat(userPreferencesUtil.lang, {
    style: 'decimal',
    currency: currencyCode,
  }).format(typeof amount === 'number' ? amount : parseFloat(amount));
}
