/**
 * 测试使用的代理
 */
export default {
  test: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  dev: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  zgo: {
    '/api/': {
      target: 'http://vsc-lys2go-0.vsc-lys-dev.ws01.svc',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
