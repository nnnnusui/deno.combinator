import { Combinator } from "./Combinator.ts";

export type Combinators<T> = Combinator<T, any>[];
export type AnyCombinators = Combinators<any>;
export type ContextFrom<T> = T extends Combinators<infer T> ? T : never;
type OkFrom<T> = T extends Combinator<any, infer T> ? T : never;
export type Unified<T extends Combinators<any>> = OkFrom<T[number]>;
export type Tupled<T extends Combinators<any>> = {
  [Key in keyof T]: OkFrom<T[Key]>;
};
export type Last<T extends any[]> = T extends [...any, infer Last] ? Last
  : never;
