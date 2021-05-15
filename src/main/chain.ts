import { Combinator } from "./type/Combinator.ts";

export const chain = <Context, Lhs, Rhs>(
  lhs: Combinator<Context, Lhs>,
  rhs: Combinator<Context, Rhs>,
): Combinator<Context, [Lhs, Rhs]> =>
  (context) => {
    const lhsResult = lhs(context);
    if (!lhsResult.ok) return lhsResult;
    const rhsResult = rhs(lhsResult.context);
    if (!rhsResult.ok) return rhsResult;
    return Combinator.ok(rhsResult.context, [lhsResult.get, rhsResult.get]);
  };
