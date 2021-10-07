#!/usr/bin/env node
//@ts-check
const inquirer = require("inquirer");
const { join } = require("path");
const cwd = process.cwd();
const baseTemplatePath = join(__dirname, "templates", "ts-template");
const packagesPath = join(__dirname, "templates", "packages");
const {
  generateDirectoryContent,
  createProjectFolder,
  getMessage,
} = require("./lib/core");
const templateNames = ["nodemon-watch", "ts-node-dev"];

async function main() {
  const answers = await inquirer.prompt([
    {
      name: "ts-project-name",
      type: "input",
      message: "Project name:",
      validate: (input) => {
        if (/^([A-Za-z\-_\d])+$/.test(input)) return true;
        else
          return "Project name may only include letters, numbers, underscores and hashes.";
      },
    },
    {
      name: "template",
      type: "list",
      message: "Which template would you like to use?",
      choices: templateNames,
    },
  ]);

  const projectName = answers["ts-project-name"];
  const templateName = answers["template"];
  const packagePath = join(packagesPath, templateName, "package.json");
  try {
    // Generate the base template
    const { created } = createProjectFolder(cwd, projectName);
    if (!created) {
      return;
    }

    generateDirectoryContent(baseTemplatePath, projectName, packagePath);

  } catch (error) {
    process.exit();
  }
}

main();
