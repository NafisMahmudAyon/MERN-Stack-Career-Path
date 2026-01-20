import jsonServer from "json-server";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Methods",
		"GET,POST,PUT,PATCH,DELETE,OPTIONS",
	);
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
});

server.use(router);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
	console.log("JSON Server running on port", PORT);
});
