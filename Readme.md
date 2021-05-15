# Combinator

Provides combinator functions.

Use in combination. For example as Parser.

## Example
`import_map.json`
```json
{
  "imports": {
    "combinator/": "https://deno.land/x/combinator@vx.x.x/"
  }
}
```

First, Define the small combinator units.

```typescript
import { Combinator } from "combinator/mod.ts";

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
      return Combinator.err(context, `same: ${result.get} should be ${char}`);
    }
    return result;
  };
```

Next, Use combinator functions.

```typescript
import { chain, convert, not, option, repeat } from "combinator/mod.ts";

const eol = same("\n");
const notEol = convert(chain(not(eol), any), ([, it]) => it);
const line = convert(chain(repeat(notEol), option(eol)), ([it]) => it.join(""));
const lines = repeat(line);

const parse = (src: string) => lines({ src, offset: 0 });
const text = "line1\nline2\nline3";

console.dir(parse(text), { depth: Number.MAX_VALUE });
```
