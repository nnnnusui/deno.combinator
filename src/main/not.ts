import { Combinator } from "./type/Combinator.ts";

export const not = <Context, T>(
  combinator: Combinator<Context, T>,
): Combinator<Context, null> =>
  (context) => {
    const result = combinator(context);
    if (result.ok) return Combinator.err(context, `should not ${result.get}`);
    return Combinator.ok(context, null);
  };
