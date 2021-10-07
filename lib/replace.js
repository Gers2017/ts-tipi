const { templates } = require("../types/templates");
const { tsTemplate, expressTemplate, apolloServerTemplate } = templates;
const expressFiles = ["index.ts", "package.json"];
const apolloFiles = ["index.ts", "package.json"];
const filesToReplace = {
  [tsTemplate]: [],
  [expressTemplate]: expressFiles,
  [apolloServerTemplate]: apolloFiles,
};
module.exports = {
  filesToReplace,
};
