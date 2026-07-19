export default function apply<
  const TApplyArgs extends readonly unknown[],
  const TRestArgs extends readonly unknown[],
  TResult
>(
  fn: (...args: readonly [...TApplyArgs, ...TRestArgs]) => TResult,
  ...args: TApplyArgs
): (...restArgs: TRestArgs) => TResult {
  return (...restArgs) => fn(...args, ...restArgs);
}
