import { loggerUtil } from '@core/util/loggerUtil';
import type { BoxMod } from '@mantine/core';

export function toModPropMapper({
  mod,
  testId,
}: {
  testId?: string | undefined;
  mod?: BoxMod | undefined;
}): BoxMod {
  if (!mod) {
    return {
      testId,
    };
  }
  if (Array.isArray(mod)) {
    return [
      ...mod,
      {
        testId,
      },
    ];
  }
  if (typeof mod === 'string') {
    loggerUtil.warn('Unable to set');
    return mod;
  }
  return {
    ...mod,
    testId,
  };
}
