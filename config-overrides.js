const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    components: 'src/components',
    pages: 'src/pages',
    utils: 'src/utils',
    routes: 'src/routes',
    hooks: 'src/hooks',
    api: 'src/api',
    assets: 'src/assets',
    providers: 'src/providers'
  })(config);

  return config;
};
