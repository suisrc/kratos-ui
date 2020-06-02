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
  };
  