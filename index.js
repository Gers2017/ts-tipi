#!/usr/bin/env node
//@ts-check
const inquirer = require("inquirer");
const { join } = require("path");
const cwd = process.cwd();
const { templateChoices } = require("./types/templates");
const { TsProject, TemplateConfig } = require("./types/tsproject");
const baseTemplatePath = join(__dirname, "templates", "ts-template");
const {
  getMessage,
  createProjectDirectory,
  CloneDirectoryContent,
} = require("./lib/core");

async function main() {
  const answers = await inquirer.prompt([
    {
      name: "ts-project-name",
      type: "input",
      message: "Project name:",
      validate: (input) => {
        if (/^([A-Za-z\-_\d])+$/.test(input)) return true;
        else
          return "Your Project name may only include letters, numbers, underscores and hashes.";
      },
    },
    {
      name: "template",
      type: "list",
      message: "Which template would you like to use?",
      choices: templateChoices,
    },
  ]);

  const projectName = answers["ts-project-name"];
  const templateName = answers["template"];
  const templateConfig = new TemplateConfig(
    templateName,
    join(__dirname, "templates", templateName)
  );

  const tsProject = new TsProject(projectName, templateConfig, cwd);

  try {
    const { created } = createProjectDirectory(tsProject);
    if (!created) return;

    CloneDirectoryContent(baseTemplatePath, projectName, tsProject);

    console.log(getMessage(projectName, templateName));
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit();
  }
}

main();
