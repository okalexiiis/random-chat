// Result.ts
export type Result<T> =
  | { isOk: true; value: T }
  | { isOk: false; error: Error };
