import jsonServer from "json-server";
const server = jsonServer.create();
const router = jsonServer.router("server/mock.json");
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);

server.use(function (req, res, next) {
  // randomly throw error
  if (Math.random() < 0.2) {
    res.status(500).send("Random Server Error");
    return;
  }

  // delay response for loading state testing
  setTimeout(next, 3000);
});

server.use(middlewares);
server.use(router);
server.listen(4000, () => {
  console.log("JSON Server is running");
});
