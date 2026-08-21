import {
  type DesignSystemComponentProps,
  toModPropMapper,
} from '@designSystem/component';
import {
  Title as MantineTitle,
  type TitleProps as MantineTitleProps,
} from '@mantine/core';

export interface TitleProps
  extends MantineTitleProps,
    DesignSystemComponentProps {}

export function Title({ testId, mod, ...props }: TitleProps) {
  return (
    <MantineTitle
      mod={toModPropMapper({
        mod,
        testId,
      })}
      {...props}
    />
  );
}
