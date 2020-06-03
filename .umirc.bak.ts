import { defineConfig } from 'umi';

export default defineConfig({
  locale: {
    antd: true,
  },
  dva: {},
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
});
