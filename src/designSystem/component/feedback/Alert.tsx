import {
  type DesignSystemComponentProps,
  toModPropMapper,
} from '@designSystem/component';
import {
  Alert as MantineAlert,
  type AlertProps as MantineAlertProps,
} from '@mantine/core';

export interface AlertProps
  extends MantineAlertProps,
    DesignSystemComponentProps {}

export function Alert({ mod, testId, ...props }: AlertProps) {
  return (
    <MantineAlert
      mod={toModPropMapper({
        mod,
        testId,
      })}
      {...props}
    />
  );
}
