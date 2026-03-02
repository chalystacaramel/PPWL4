import { Elysia } from "elysia";
import { openapi } from "@elysiajs/openapi";

const app = new Elysia()
  .use(openapi());

// Middleware Logger
app.onRequest(({ request }) => {
  console.log("📥", request.method, request.url);
  console.log("🕒", new Date().toISOString());
});

// Route utama
app.get("/", () => "Hello Middleware");

app.listen(3000);
console.log("Server running at http://localhost:3000");