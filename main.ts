import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

const addr = ":8080";
console.log(`Listening on http://localhost${addr}`);
serve((req: Request) => {
  const { pathname } = new URL(req.url);
  return new Response(`Hello World from ${pathname}!`, {
    headers: { "content-type": "text/plain" },
  });
});
