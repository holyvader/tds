import {
  type DesignSystemComponentProps,
  toModPropMapper,
} from '@designSystem/component';
import {
  Select as MantineSelect,
  type SelectProps as MantineSelectProps,
} from '@mantine/core';

export interface SelectProps
  extends MantineSelectProps,
    DesignSystemComponentProps {}

export type SelectOption<V extends string = string> = {
  label: string;
  value: V;
};

export function Select({ mod, testId, ...props }: SelectProps) {
  return (
    <MantineSelect
      mod={toModPropMapper({
        mod,
        testId,
      })}
      {...props}
    />
  );
}
