import { Combinator } from "../type/Combinator.ts";
import { AnyCombinators, ContextFrom, Tupled } from "../type/Combinators.ts";
import { chainN } from "./chainN.ts";
import { convert } from "../convert.ts";

export const chainL = <T extends AnyCombinators>(
  ...combinators: T
): Combinator<ContextFrom<T>, Tupled<T>[0]> =>
  convert(chainN(...combinators), (it) => it[0]);
