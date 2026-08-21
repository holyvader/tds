export const typeGuardUtil = {
  isNumber: (v: unknown): v is number => {
    return typeof v === 'number' && !Number.isNaN(v);
  },
};
