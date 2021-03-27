const server = require('./app');

server.app.listen(server.port, () => {
  console.log('Tags Service started on port',server.port);
})
