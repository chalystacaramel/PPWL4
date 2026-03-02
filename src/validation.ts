import { Elysia, t } from "elysia";
import { openapi } from "@elysiajs/openapi";

const app = new Elysia()
  .use(openapi())
  .post("/request",
    ({ body }) => {
      return {
        message: "Success",
        data: body
      }
    },
    {
      body: t.Object({
        name: t.String({ minLength: 3 }),
        email: t.String({ format: "email" }),
        age: t.Number({ minimum: 18 })
      })
    }
  )

  .get(
    "/products/:id",
    ({ params, query }) => {
      return {
        productId: params.id,
        sort: query.sort
      }
    },
    {
      params: t.Object({
        id: t.Numeric()
      }),
      query: t.Object({
        sort: t.Optional(
          t.Union([
            t.Literal("asc"),
            t.Literal("desc")
          ])
        )
      })
    }
  )

  .get(
    "/stats",
    () => {
      return {
        total: 200,
        active: 100
      };
    },
    {
      response: t.Object({
        total: t.Number(),
        active: t.Number()
      })
    }
  )

  .get(
    "/admin",
    () => {
      return {
        stats: 99
      };
    },
    {
      beforeHandle({ headers, set }) {
        if (headers.authorization !== "Bearer 123") {
          set.status = 401;
          return {
            success: false,
            message: "Unauthorized"
          };
        }
      }
    }
  )

 .get(
    "/product",
    () => ({
      id: 1,
      name: "Laptop"
    }),
    {
      afterHandle({ response }) {
        return {
          success: true,
          Message: "data tersedia",
          data: response
        };
      }
    }
  )

  .onError(({ code, set }) => {
    if (code === "VALIDATION") {
      set.status = 400; 
      return {
        success: false,
        error: "Validation Error"
      };
    }
  })
  
  .post(
    "/login",
    ({ body }) => {
      return {
        message: "Login Success",
        data: body
      };
    },
    {
      body: t.Object({
        email: t.String({ format: "email" }),
        password: t.String({ minLength: 8 })  
      })
    }
  )
  .listen(3000);


console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);