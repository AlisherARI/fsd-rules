const { RuleTester } = require("eslint");

const layerImports = require("../rules/layer-imports");

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
});

ruleTester.run("layer-imports", layerImports, {
  valid: [
    {
      filename: "./files/entities/clients/client-card.js",
      code: "import { updateTime } from '../../shared/utils'",
    },
  ],
  invalid: [
    {
      filename: "./files/entities/goods/goods-description.js",
      code: "import { goodsUpdateDescription } from '../../features/goods/goods-update-description.js'",
      errors: [{ messageId: "incorrectLayerImports" }],
    },
    {
      filename: "./files/shared/update-age.js",
      code: "import { client } from '../../entities/clients'",
      errors: [{ messageId: "incorrectImportInShared" }],
    },
  ],
});
