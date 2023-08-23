const { availableLayerImports, availableLayers, findLayer } = require('../helpers');

module.exports = {
  meta: {
    type: 'problem',
    fixable: 'code',
  },
  create: function (ctx) {
    const currentLayer = findLayer(ctx.getFilename());

    return {
      ImportDeclaration: function (node) {
        if (!availableLayers.some(layer => node.source.value.includes(`/${layer}/`))) {
          return;
        }

        if (!availableLayerImports[currentLayer]?.length) return;

        if (availableLayerImports[currentLayer]?.some(layer => node.source.value.includes(`/${layer}/`))) {
          return;
        } else {
          ctx.report(
            node,
            `Trying to import layer '${findLayer(
              node.source.value
            )}' in '${currentLayer}'. This layer can import only: '${availableLayerImports[currentLayer]?.join(', ')}'.`
          );
        }
      },
    };
  },
};
