import { Combinator } from "../type/Combinator.ts";
import {
  AnyCombinators,
  ContextFrom,
  Last,
  Tupled,
} from "../type/Combinators.ts";
import { chainN } from "./chainN.ts";
import { convert } from "../convert.ts";

export const chainR = <T extends AnyCombinators>(
  ...combinators: T
): Combinator<ContextFrom<T>, Last<Tupled<T>>> =>
  convert(chainN(...combinators), (it) => it.slice(-1)[0]);
