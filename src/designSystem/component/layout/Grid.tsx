import {
  type DesignSystemComponentProps,
  toModPropMapper,
} from '@designSystem/component';
import {
  Grid as MantineGrid,
  type GridProps as MantineGridProps,
} from '@mantine/core';

export interface GridProps
  extends MantineGridProps,
    DesignSystemComponentProps {}

function GridImpl({ testId, mod, ...props }: GridProps) {
  return (
    <MantineGrid
      mod={toModPropMapper({
        mod,
        testId,
      })}
      {...props}
    />
  );
}

export const Grid = Object.assign(GridImpl, { Col: MantineGrid.Col });
