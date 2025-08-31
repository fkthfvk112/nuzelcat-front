export function removeUndefined(obj: Record<string, any>) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined && v !== null)
  );
}

export const emptyToNull = (val?: string) =>
  val && val.trim().length > 0 ? val : null;

