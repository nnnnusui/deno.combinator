# Combinator

Provides combinator functions.

Use in combination. For example as Parser.

# Example

First, Define the small combinator units.

```typescript
import Combinator from "../main/type/Combinator.ts";

type Context<Src> = {
  src: Src;
  offset: number;
};
type Parser = Combinator<Context<string>, string>;

const any: Parser = (context) => {
  const [head, ...tails] = context.src;
  if (!head) return Combinator.err(context, "any: no more sources.");
  const next = { src: tails.join(""), offset: context.offset + 1 };
  return Combinator.ok(next, head);
};

const same = (char: string): Parser =>
  (context) => {
    const result = any(context);
    if (!result.ok) return result;
    if (result.get !== char) {
      return Combinator.err(
        context,
        `${result.get} should be ${char}`,
      );
    }
    return result;
  };
```

Next, Use combinator functions.

```typescript
import chain from "../main/chain.ts";
import convert from "../main/convert.ts";
import not from "../main/not.ts";
import option from "../main/option.ts";
import repeat from "../main/repeat.ts";

const eol = same("\n");
const notEol = convert(chain(not(eol), any), ([, it]) => it);
const line = convert(chain(repeat(notEol), option(eol)), ([it]) => it.join(""));
const lines = repeat(line);

const parse = (src: string) => lines({ src, offset: 0 });
const text = "line1\nline2\nline3";

console.dir(parse(text), { depth: Number.MAX_VALUE });
```
