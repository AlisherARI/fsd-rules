const {
  availableLayerImports,
  availableLayers,
  findLayer,
} = require("../helpers");

module.exports = {
  meta: {
    type: "problem",
    fixable: "code",
    messages: {
      incorrectImportInShared:
        "Trying to import layer '{{ nodeLayer }}' in '{{currentLayer}}'. This layer can't import any layer'",
      incorrectLayerImports:
        "Trying to import layer '{{ nodeLayer }} in '{{ currentLayer }}'. This layer can import only: '{{ availableLayers }}'.",
    },
  },
  create: function (ctx) {
    const currentLayer = findLayer(ctx.getFilename());

    return {
      ImportDeclaration: function (node) {
        if (
          !availableLayers.some((layer) =>
            node.source.value.includes(`/${layer}/`)
          )
        ) {
          return;
        }

        if (!availableLayerImports[currentLayer]?.length) {
          ctx.report({
            node,
            messageId: "incorrectImportInShared",
            data: {
              nodeLayer: findLayer(node.source.value),
              currentLayer,
            },
          });
          return;
        }

        if (
          availableLayerImports[currentLayer]?.some((layer) =>
            node.source.value.includes(`/${layer}/`)
          )
        ) {
          return;
        } else {
          ctx.report({
            messageId: "incorrectLayerImports",
            node,
            data: {
              nodeLayer: findLayer(node.source.value),
              currentLayer,
              availableLayers: availableLayerImports[currentLayer]?.join(", "),
            },
          });
        }
      },
    };
  },
};
