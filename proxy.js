/**
 *  The following command likne options are available.
 *
 *  key: your contextio key
 *  secret: your contextio secret
 *
 *  [port]: port on which to run the proxy. default: 8000
 */


var ContextIO = require('./lib/ContextIO'),
    http = require('http'),
    url = require('url'),
    _ = require('underscore'),
    argv = require('optimist').argv,
    pass_headers = ['content-type', 'link', 'x-list-offset'],
    port = argv.port ? Number(argv.port) : 8000,
    client;

if (!_.isString(argv.key) || !_.isString(argv.secret)) {
  console.log('Missing required options key & secret');
  process.exit();
}

client = new ContextIO.Client({
  key: argv.key,
  secret: argv.secret
});

function shouldProxy(req, res) {
  if (req.url === '/favicon.ico') {
    res.writeHead(404);
    res.end();
    return false;
  }
  return true;
}

http.createServer(function (req, res) {
  if (shouldProxy(req, res)) {
    console.log('Got request: ', req.url);
    var request_url = url.parse(req.url, true);
    client.doCall(req.method, request_url.pathname.substr(1), request_url.query, function (error, contextio) {
      if (error) {
        console.error(error);
        res.writeHead(500);
        res.end('Something when wrong. Check the proxy\'s log.');
      } else {
        console.log('  Response Code:', contextio.statusCode);
        var headers = _.pick(contextio.headers, pass_headers);
        res.writeHead(contextio.statusCode, headers);
        res.end(JSON.stringify(contextio.body));
      }
    });
  }
}).listen(port);

console.log('ContextIO Proxy listening on port ', port);
