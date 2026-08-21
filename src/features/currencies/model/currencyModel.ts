import { dataType, type InferModel, modelSchema } from '@core/model';

export const CURRENCY_MODEL_SCHEMA = modelSchema({
  id: dataType.number(),
  name: dataType.string(),
  short_code: dataType.string(),
  code: dataType.string(),
  precision: dataType.number(),
  subunit: dataType.number(),
  symbol: dataType.string(),
  symbol_first: dataType.boolean(),
  decimal_mark: dataType.string(),
  thousands_separator: dataType.string(),
});

export type CurrencyModel = InferModel<typeof CURRENCY_MODEL_SCHEMA>;
