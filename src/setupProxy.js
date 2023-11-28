const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:3001",
      changeOrigin: true,
      pathRewrite: {
        '^/api/': '/'
      },
      secure: false // Disable SSL verification (use with caution, not recommended for production)
    })
  );
};
