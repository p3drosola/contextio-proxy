# Context.IO proxy

This script creates a proxy to expose the context.io API through regular HTTP, without OAuth.

This can be usefull for development, and can be used as a starting point to create a proxy server for clients that don't support OAuth. (eg: client-side javascript applications).

It basically uses the offical [ContextIO-node](https://github.com/contextio/ContextIO-node) library, with one tiny change (The Client.doCall method is exposed).

### Usage

```bash
node proxy.js --key 123abc --secret kad89ausd982d23
```

That's it! Happy Hacking!

