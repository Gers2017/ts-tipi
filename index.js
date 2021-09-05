#!/usr/bin/env node

const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require("fs");
const { join } = require("path");
const cwd = process.cwd();

function generateDirectoryContent(templatePath, newProjectPath) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach((file) => {
    const originalFilePath = join(templatePath, file);
    const stats = fs.statSync(originalFilePath);
    // skip node_modules
    if (file === "node_modules" && stats.isDirectory()) return;

    if (stats.isFile()) {
      const contents = fs.readFileSync(originalFilePath, "utf8");
      // rename _gitignore to .gitignore
      if (file === "_gitignore") file = ".gitignore";
      // path to write the new file
      const writePath = join(cwd, newProjectPath, file);
      // write the contents
      fs.writeFileSync(writePath, contents);
    } else if (stats.isDirectory()) {
      fs.mkdirSync(join(cwd, newProjectPath, file));

      generateDirectoryContent(
        join(templatePath, file),
        join(newProjectPath, file)
      );
    }
  });
}

async function main() {
  const answers = await inquirer.prompt([
    {
      name: "ts-project-name",
      type: "input",
      message: "Project name:",
      validate: function (input) {
        if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
        else
          return "Project name may only include letters, numbers, underscores and hashes.";
      },
    },
    {
      name: "template",
      type: "list",
      message: "Which template do you want to use?",
      choices: ["nodemon-watch", "ts-node"],
    },
  ]);

  const projectName = answers["ts-project-name"];
  const template = answers["template"];

  try {
    const templatePath = join(cwd, "templates", template);
    // make the directory
    fs.mkdirSync(join(cwd, projectName));
    // clone the contents
    generateDirectoryContent(templatePath, projectName);
    console.log(
      "Congratulations " +
        chalk.blue.bold(projectName) +
        " was created!\n" +
        "Next steps:\n" +
        "run: " +
        chalk.cyan(`cd ${projectName}`) +
        "\n" +
        "Then run: " +
        chalk.cyan("npm i or yarn")
    );
  } catch (error) {
    console.error(error);
    process.exit();
  }
}

main();
