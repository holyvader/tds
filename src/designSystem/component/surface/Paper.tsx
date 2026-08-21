import {
  type DesignSystemComponentProps,
  toModPropMapper,
} from '@designSystem/component';
import {
  type ElementProps,
  Paper as MantinePaper,
  type PaperProps as MantinePaperProps,
} from '@mantine/core';

export interface PaperProps
  extends MantinePaperProps,
    ElementProps<'div', keyof MantinePaperProps>,
    DesignSystemComponentProps {}

export function Paper({ testId, mod, ...props }: PaperProps) {
  return (
    <MantinePaper
      mod={toModPropMapper({
        mod,
        testId,
      })}
      {...props}
    />
  );
}
