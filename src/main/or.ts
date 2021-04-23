import Combinator from "./type/Combinator.ts";

const or = <Context, Lhs, Rhs>(
  lhs: Combinator<Context, Lhs>,
  rhs: Combinator<Context, Rhs>,
): Combinator<Context, Lhs | Rhs> =>
  (context) => {
    const lhsResult = lhs(context);
    if (lhsResult.ok) return lhsResult;
    const rhsResult = rhs(context);
    if (rhsResult.ok) return rhsResult;
    return Combinator.err(context, "or", [lhsResult.get, rhsResult.get]);
  };

export default or;
