type Composer = (value: never) => unknown;

type UnionToIntersection<T> = (T extends unknown ? (value: T) => void : never) extends (value: infer I) => void
  ? I
  : never;

type ComposerParameters<TComposers extends readonly Composer[]> = UnionToIntersection<
  Parameters<TComposers[number]>[0]
>;

type ComposerReturnType<TComposers extends readonly Composer[]> = UnionToIntersection<ReturnType<TComposers[number]>>;

export default function compose<const TComposers extends readonly Composer[]>(
  ...composers: TComposers
): <T extends ComposerParameters<TComposers>>(value: T) => T & ComposerReturnType<TComposers> {
  return value =>
    composers.reduce<unknown>((current, composer) => composer(current as never), value) as typeof value &
      ComposerReturnType<TComposers>;
}
