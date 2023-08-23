const { availableLayers, findLayer } = require('../helpers');

module.exports = {
  meta: {
    type: 'problem',
    fixable: 'code',
  },
  create: function (ctx) {
    return {
      ImportDeclaration: function (node) {
        if (!availableLayers.some(layer => node.source.value.includes(`/${layer}/`))) {
          return;
        }
        const nodeLayer = findLayer(node.source.value);
        const allStringsBeforeLayer = new RegExp(`.+${nodeLayer}`);
        const publicApiPaths = node.source.value
          .replace(allStringsBeforeLayer, '')
          .split('/')
          .filter(el => el);

        if (publicApiPaths?.length <= 2) {
          return;
        }
        ctx.report(node, `Your import must be like: ~/${nodeLayer}/${publicApiPaths?.[0]}`);
      },
    };
  },
};
