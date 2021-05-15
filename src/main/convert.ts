import { Combinator } from "./type/Combinator.ts";

export const convert = <Context, Before, After>(
  combinator: Combinator<Context, Before>,
  func: (before: Before, context: Context) => After,
): Combinator<Context, After> =>
  (context) => {
    const result = combinator(context);
    if (!result.ok) return result;
    return Combinator.ok(result.context, func(result.get, result.context));
  };
