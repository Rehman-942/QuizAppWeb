const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://test.yucatanblue.com:3001',
      changeOrigin: true,
      pathRewrite: {
        '^/api/': '/'
      }
    })
  );
};
