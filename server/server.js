import jsonServer from "json-server";
const server = jsonServer.create();
const router = jsonServer.router("server/mock.json");
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);

server.use(function (req, res, next) {
  setTimeout(next, 3000);
});

server.use(middlewares);
server.use(router);
server.listen(4000, () => {
  console.log("JSON Server is running");
});
