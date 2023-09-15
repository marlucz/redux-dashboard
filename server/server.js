import jsonServer from "json-server";
const server = jsonServer.create();
const router = jsonServer.router("server/mock.json");
const middlewares = jsonServer.defaults();
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

server.use(router);
server.listen(4000, () => {
  console.log("JSON Server is running");
});
