'use strict';

const Hapi = require('hapi');
const fetch = require('node-fetch');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function awaitFetch(url) {
  return new Promise((resolve) => {
    fetch(url)
      .then(res => res.json())
      .then(resolve);
  });
}

const init = async () => {

    await server.register(require('inert'));
    server.route([
      {
        method: 'POST',
        path: '/data/adzerk-spocs-2',
        handler: async (request, h) => {
          return await awaitFetch("https://gist.githubusercontent.com/ScottDowne/a70c4012527ee709f3b96b1156993589/raw/f517db9cfab5098828145ff30534bfa4df26f435/adzerk-spocs-2");
        }
      }
    ]);

    await server.start();
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
