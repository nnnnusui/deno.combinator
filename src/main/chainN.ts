import { Combinator } from "./type/Combinator.ts";
import { chain } from "./chain.ts";
import { convert } from "./convert.ts";
import {
  AnyCombinators,
  Combinators,
  ContextFrom,
  Tupled,
} from "./type/Combinators.ts";

export const chainN = <T extends AnyCombinators>(
  ...combinators: T
): Combinator<ContextFrom<T>, Tupled<T>> => {
  const it = (
    combinators: Combinators<ContextFrom<T>>,
  ): Combinator<ContextFrom<T>, any> => {
    const [head, ...tails] = combinators;
    if (tails.length < 1) return convert(head, (it) => [it]);
    return convert(chain(head, it(tails)), ([head, tails]) => [head, ...tails]);
  };
  return it(combinators);
};
