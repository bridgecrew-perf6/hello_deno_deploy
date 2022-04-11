import { Application, Router } from "https://deno.land/x/oak/mod.ts";

interface Book {
  isbn: string;
  author: string;
  title: string;
}

const books: Array<Book> = [{
  isbn: "1",
  author: "Robin Wieruch",
  title: "The Road to React",
}, {
  isbn: "2",
  author: "Kyle Simpson",
  title: "You Don't Know JS: Scope & Closures",
}, {
  isbn: "3",
  author: "Andreas A. Antonopoulos",
  title: "Mastering Bitcoin",
}];

const router = new Router();

router.get("/", (context) => context.response.body = "Hello World!")
  .get("/books", (context) => {
    context.response.body = books;
  })
  .get("/books/:id", (context) => {
    const book = books.find((book) => book.isbn === context.params.id);
    console.log(book);
    context.response.body = book;
  });

const app = new Application();

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

app.use(router.routes());
app.use(router.allowedMethods());
await app.listen({ port: 8000 });
