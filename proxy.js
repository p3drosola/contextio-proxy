/**
 *  The following command line options are available.
 *
 *  key: your contextio key
 *  secret: your contextio secret
 *
 *  [port]: port on which to run the proxy. default: 8000
 */

var ContextIO = require('./lib/ContextIO'),
    url = require('url'),
    _ = require('underscore'),
    argv = require('optimist').argv,
    connect = require('connect'),
    pass_headers = ['content-type', 'link', 'x-list-offset'],
    port = argv.port ? Number(argv.port) : 8000,
    app = connect(),
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

app.use(connect.logger('dev'));
app.use(connect.bodyParser());

app.use(function(req, res){
  if (shouldProxy(req, res)) {
    console.log('Proxying request: ', req.url);
    var parsed_url = url.parse(req.url, true),
        path = parsed_url.pathname.substr(1),
        params = req.method === 'POST' ? req.body : parsed_url.query;
    client.doCall(req.method, path, params, function (error, contextio) {
      if (error) {
        console.error(error);
        res.writeHead(500);
        res.end('Something when wrong. Check the proxy\'s log.');
      } else {
        var headers = _.pick(contextio.headers, pass_headers);
        res.writeHead(contextio.statusCode, headers);
        res.end(JSON.stringify(contextio.body));
      }
    });
  }
});
app.listen(port);
console.log('ContextIO Proxy listening on port ', port);
