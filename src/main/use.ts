import Combinator from "./type/Combinator.ts";

const use = <Context, Middle, T>(
  from: Combinator<Context, Middle>,
  user: (from: Middle) => Combinator<Context, T> | null,
): Combinator<Context, T> =>
  (context) => {
    const fromResult = from(context);
    if (!fromResult.ok) return fromResult;
    const uses = user(fromResult.get);
    if (!uses) {
      return Combinator.err(
        context,
        `use: user return null by { middle: ${fromResult.get} }`,
      );
    }
    return uses(fromResult.context);
  };

export default use;
