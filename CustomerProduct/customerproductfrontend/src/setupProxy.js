const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    "/customerproduct",
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: 'https://localhost:7133/',
        secure: false
    });
    app.use(appProxy);
};
