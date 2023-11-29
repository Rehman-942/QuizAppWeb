const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // Proxy requests for the API to the backend server
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://test.yucatanblue.com:3001',  // Adjust the target URL
      changeOrigin: true,
      pathRewrite: {
        '^/api/': '/'
      },
      secure: false,  // Disable SSL certificate validation (use only during development)
    })
  );

  app.use(
    createProxyMiddleware({
      target: 'http://test.yucatanblue.com:3001',  // Adjust the target URL
      changeOrigin: true,
      secure: false,  // Disable SSL certificate validation (use only during development)
    })
  );
};
