import {
  type DesignSystemComponentProps,
  toModPropMapper,
} from '@designSystem/component';
import {
  type ElementProps,
  ActionIcon as MantineActionIcon,
  type ActionIconProps as MantineActionIconProps,
} from '@mantine/core';
import { ArrowsLeftRightIcon } from '@phosphor-icons/react';

const ICONS = {
  ArrowsLeftRightIcon,
};

export interface IconButtonProps
  extends Omit<MantineActionIconProps, 'children'>,
    ElementProps<'button', keyof Omit<MantineActionIconProps, 'children'>>,
    DesignSystemComponentProps {
  iconName: keyof typeof ICONS;
  ariaLabel?: string;
}

export function IconButton({
  iconName,
  ariaLabel,
  color = 'blue',
  variant = 'outline',
  testId,
  mod,
  ...props
}: IconButtonProps) {
  const Icon = ICONS[iconName];
  return (
    <MantineActionIcon
      color={color}
      variant={variant}
      aria-label={ariaLabel}
      mod={toModPropMapper({
        mod,
        testId,
      })}
      {...props}
    >
      <Icon />
    </MantineActionIcon>
  );
}
