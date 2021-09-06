#!/usr/bin/env node

const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require("fs");
const { join } = require("path");
const current_directory = process.cwd();
const templates_dir = join(__dirname, "templates");
const {files_to_ignore, directories_to_ignore} = require("./lib/ignore")


function generateDirectoryContent(templatePath, newProjectName) {
  const files = fs.readdirSync(templatePath);

  files.forEach((file) => {
    const templateFilePath = join(templatePath, file);
    const stats = fs.statSync(templateFilePath);

    // Clone the contents of the file
    if (stats.isFile()) {
      if(files_to_ignore.includes(file)) return; // ignore files
      const contents = fs.readFileSync(templateFilePath, "utf8");

      if (file === "_gitignore") file = ".gitignore";

      const writePath = join(current_directory, newProjectName, file);
      fs.writeFileSync(writePath, contents);
    } else if (stats.isDirectory()) {
      if(directories_to_ignore.includes(file)) return; // ignore node_modules and others
      fs.mkdirSync(join(current_directory, newProjectName, file));

      generateDirectoryContent(
        join(templatePath, file),
        join(newProjectName, file)
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
    const templatePath = join(templates_dir, template);
    // make the directory
    fs.mkdirSync(join(current_directory, projectName));
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
