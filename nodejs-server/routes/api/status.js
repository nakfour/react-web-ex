handler = (server) => {
  server.route({
    method: "GET",
    path: "/api/status",
    handler: (request, h) => {
      return request.server.app.status;
    }
  });
};

module.exports = handler;