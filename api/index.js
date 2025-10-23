import Fastify from "fastify";
import Swagger from "@fastify/swagger";
import Scalar from "@scalar/fastify-api-reference";

const app = Fastify({ logger: true });

await app.register(Swagger, {
  openapi: {
    info: {
      title: "Fastify API Reference with Scalar",
      description: "This is a sample Fastify server with Scalar integration",
      version: "1.0.0",
    },
  },
});

await app.register(Scalar, {
  routePrefix: "/scalar",
});

app.get(
  "/",
  {
    schema: {
      querystring: { type: "object", properties: { name: { type: "string" } } },
    },
  },
  (req) => `Hello ${req.query.name || "World"} from Fastify!`
);

export default async (req, res) => {
  await app.ready();
  app.server.emit("request", req, res);
};
