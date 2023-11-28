const { createProxyMiddleware } = require("http-proxy-middleware");
const hostUrl = process.env.API_HOST || "http://localhost:3001"

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: hostUrl,
      changeOrigin: true,
    //   pathRewrite: {
    //     '^/api/': '/'
    //   }
    })
  );
};