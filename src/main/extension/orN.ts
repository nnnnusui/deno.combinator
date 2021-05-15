import { Combinator } from "../type/Combinator.ts";
import { or } from "../or.ts";
import {
  AnyCombinators,
  Combinators,
  ContextFrom,
  Unified,
} from "../type/Combinators.ts";

export const orN = <T extends AnyCombinators>(
  ...combinators: T
): Combinator<ContextFrom<T>, Unified<T>> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const it = (combinators: Combinators<ContextFrom<T>>): any => {
    const [head, ...tails] = combinators;
    if (tails.length < 1) return head;
    return or(head, it(tails));
  };
  return it(combinators);
};
