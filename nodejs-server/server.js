"use strict";

const Hapi = require("hapi");
const HapiPino = require("hapi-pino");
const Inert = require("inert");

const PORT = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
const IP = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0";

const server = Hapi.server({
  port: PORT,
  host: IP
});

server.app = require("./utils/settings/app");

const init = async () => {
  await server.register(Inert);
  await server.register(HapiPino);

  require("./routes/status")(server);

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
