const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://test.yucatanblue.com:3001',
      changeOrigin: true,
      secure: false,  // Disable SSL certificate validation (use only during development)
      headers: {
        Connection: 'keep-alive',
      },
    })
  );

};
