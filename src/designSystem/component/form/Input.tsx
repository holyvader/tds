import {
  type DesignSystemComponentProps,
  toModPropMapper,
} from '@designSystem/component';
import {
  TextInput as MantineTextInput,
  type TextInputProps as MantineTextInputProps,
} from '@mantine/core';

export interface InputProps
  extends MantineTextInputProps,
    DesignSystemComponentProps {}

export function Input({ mod, testId, ...props }: InputProps) {
  return (
    <MantineTextInput
      mod={toModPropMapper({
        mod,
        testId,
      })}
      {...props}
    />
  );
}
