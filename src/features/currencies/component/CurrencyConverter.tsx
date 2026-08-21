import { dataType, type InferModel, modelSchema } from '@core/model';
import { useDebounce } from '@core/util/useDebounce';
import { Grid, IconButton, Input, Select } from '@designSystem/component';
import { currencyAmountFromatter } from '@features/currencies/formatter/currencyAmountFromatter';
import type { CurrencySelectOption } from '@features/currencies/mapper/currencyToSelectOptionMapper';
import { useReducer } from 'react';

const LOCAL_MODEL_SCHEMA_BASE = modelSchema({
  fromCurrency: dataType.string(),
  toCurrency: dataType.string(),
});

const LOCAL_MODEL_FROM_AMOUNT_SCHEMA = LOCAL_MODEL_SCHEMA_BASE.extend({
  fromAmount: dataType.string().min(0),
});

const LOCAL_MODEL_TO_AMOUNT_SCHEMA = LOCAL_MODEL_SCHEMA_BASE.extend({
  toAmount: dataType.string().min(0),
});

type LocalModel = Partial<
  InferModel<
    typeof LOCAL_MODEL_FROM_AMOUNT_SCHEMA & typeof LOCAL_MODEL_TO_AMOUNT_SCHEMA
  >
>;

export interface CurrencyConverterProps {
  currencyOptionList: CurrencySelectOption[];
  loading?: boolean;
  disabled?: boolean;
  onConvertRequest(
    model: InferModel<typeof LOCAL_MODEL_FROM_AMOUNT_SCHEMA>,
  ): Promise<number>;
}

export function CurrencyConverter({
  currencyOptionList,
  loading,
  disabled,
  onConvertRequest,
}: CurrencyConverterProps) {
  const [localModel, updateLocalModel] = useReducer(
    (state: LocalModel, nextState: LocalModel) => ({ ...state, ...nextState }),
    {},
  );

  const convertIfApplicable = useDebounce(
    (origin: 'from' | 'to', model: LocalModel) => {
      const result =
        origin === 'from'
          ? LOCAL_MODEL_FROM_AMOUNT_SCHEMA.safeParse(model)
          : LOCAL_MODEL_TO_AMOUNT_SCHEMA.safeParse(model);

      if (result.success) {
        const model =
          origin === 'from'
            ? {
                fromCurrency: result.data.fromCurrency,
                toCurrency: result.data.toCurrency,
                fromAmount:
                  'fromAmount' in result.data ? result.data.fromAmount : '0',
              }
            : {
                fromCurrency: result.data.toCurrency,
                toCurrency: result.data.fromCurrency,
                fromAmount:
                  'toAmount' in result.data ? result.data.toAmount : '0',
              };

        onConvertRequest(model).then((result) => {
          updateLocalModel({
            [origin === 'from' ? 'toAmount' : 'fromAmount']:
              currencyAmountFromatter(result, model.toCurrency),
          });
        });
      }
    },
    200,
  );

  const handleAmountChange = (target: 'from' | 'to', value: string) => {
    const nextModel = {
      ...localModel,
      [target === 'from' ? 'fromAmount' : 'toAmount']: value,
    };
    updateLocalModel(nextModel);
    convertIfApplicable(target, nextModel);
  };

  const handleCurrencyChange = (
    target: 'from' | 'to',
    value: string | null,
  ) => {
    const nextModel = {
      ...localModel,
      [target === 'from' ? 'fromCurrency' : 'toCurrency']: value ?? undefined,
    };
    updateLocalModel(nextModel);
    convertIfApplicable(target, nextModel);
  };

  const handleCurrenciesSwap = () => {
    const nextModel = {
      ...localModel,
      fromCurrency: localModel.toCurrency,
      toCurrency: localModel.fromCurrency,
    };
    updateLocalModel(nextModel);
    convertIfApplicable('from', nextModel);
  };

  return (
    <Grid>
      <Grid.Col span={{ base: 12, sm: 5 }}>
        <Select
          value={localModel.fromCurrency ?? null}
          placeholder="Currency"
          searchable
          data={currencyOptionList}
          onChange={(currency) => handleCurrencyChange('from', currency)}
          loading={loading}
          disabled={disabled}
          mb="md"
        />
        <Input
          value={localModel.fromAmount || ''}
          onChange={(e) => handleAmountChange('from', e.currentTarget.value)}
          placeholder="Amount"
          type="text"
          name="from"
          disabled={disabled}
        />
      </Grid.Col>
      <Grid.Col
        span={{ base: 12, sm: 2 }}
        align="center"
        className="text-center"
      >
        <IconButton
          iconName="ArrowsLeftRightIcon"
          testId="swap-currencies"
          ariaLabel="Swap currencies"
          onClick={handleCurrenciesSwap}
          disabled={disabled}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 5 }}>
        <Select
          value={localModel.toCurrency ?? null}
          onChange={(currency) => handleCurrencyChange('to', currency)}
          placeholder="Currency"
          searchable
          data={currencyOptionList}
          loading={loading}
          disabled={disabled}
          mb="md"
        />
        <Input
          value={localModel.toAmount || ''}
          onChange={(e) => handleAmountChange('to', e.currentTarget.value)}
          placeholder="Amount"
          type="text"
          name="to"
          disabled={disabled}
        />
      </Grid.Col>
    </Grid>
  );
}
