# Referrer Test

A bunch of pages I threw together to test the effect of the
`<meta name="referrer">` tag.

Comes with an [Express][express] app that echoes the headers of the request.
This is useful for same-origin requests and completely optional.

To install and run the dynamic version, run `npm install && npm run server`.
Otherwise, just serve the static files directly from `src/`.


[express]: http://expressjs.com
