handler = (server) => {
  server.route({
    method: "GET",
    path: "/status",
    handler: (request, h) => {
      return request.server.app.status;
    }
  });
};

module.exports = handler;