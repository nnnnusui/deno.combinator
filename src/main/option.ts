import { Combinator } from "./type/Combinator.ts";

export const option = <Context, T>(
  combinator: Combinator<Context, T>,
): Combinator<Context, T | null> =>
  (context) => {
    const result = combinator(context);
    if (result.ok) return result;
    return Combinator.ok(context, null);
  };
