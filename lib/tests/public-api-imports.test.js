const { RuleTester } = require("eslint");

const publicApiImports = require("../rules/public-api-imports");

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
});

ruleTester.run("public-api-imports", publicApiImports, {
  valid: [
    {
      code: 'import { ClientCard } from "~/entities/clients"',
    },
    {
      code: 'import updateTime from "@/shared/utils"',
    },
    {
      code: 'import GoToHomePageButton from "~/features/home-page"',
    },
    {
      code: 'import { ClientsTable } from "~/widgets/clients"',
    },
  ],
  invalid: [
    {
      code: "import { ClientCard } from '~/entities/clients/ui/ClientCard.vue'",
      errors: [{ messageId: "incorrectImport" }],
    },
    {
      code: "import updateTime from '@/shared/utils/time.js'",
      errors: [{ messageId: "incorrectImport" }],
    },
    {
      code: "import { GoToHomePageButton } from '~/features/home-page/ui/GoToHomePageButton.tsx'",
      errors: [{ messageId: "incorrectImport" }],
    },
    {
      code: 'import { ClientsTable } from "~/widgets/clients/ui/ClientsTable.ts"',
      errors: [{ messageId: "incorrectImport" }],
    },
  ],
});
