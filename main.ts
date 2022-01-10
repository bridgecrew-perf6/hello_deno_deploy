import { json, PathParams, serve } from "https://deno.land/x/sift@0.4.2/mod.ts";

serve({
  "/": () => new Response("hello world"),
  "/books": () => {
    return json(books);
  },
  "/books/:id": (_request: Request, params: PathParams) => {
    if (params === undefined) {
      return Response.error();
    }
    const book = books.find((book) => book.isbn === params.id);
    if (book === undefined) {
      return new Response(`Unknown id: ${params.id}`);
    }
    return json(book);
  },
  // The route handler of 404 will be invoked when a route handler
  // for the requested path is not found.
  404: () => new Response("not found"),
});

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
