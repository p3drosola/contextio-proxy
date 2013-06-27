# Context.IO proxy

This script creates a proxy to expose the context.io API through regular HTTP, without OAuth.

This can be usefull for development, and can be used as a starting point to create a proxy server for clients that don't support OAuth. (eg: client-side javascript applications).

It basically uses the offical [ContextIO-node](https://github.com/contextio/ContextIO-node) library, with one tiny change (The Client.doCall method is exposed).

### Usage

```bash
node proxy.js --key 123abc --secret kad89ausd982d23
```

That's it! Happy Hacking!

### License
The MIT License (MIT)

Copyright (c) 2013 Pedro  p3dro.sola@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
