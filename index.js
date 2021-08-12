#!/usr/bin/env node

const inquirer = require("inquirer");
const fs = require("fs");
const { join } = require("path");
const current_directory = process.cwd();
const ts_template_path = join(__dirname, "ts-template");

const QUESTIONS = [
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
];

function generateDirectoryContent(templatePath, newProjectPath) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach((file) => {
    const originalFilePath = join(templatePath, file);

    const stats = fs.statSync(originalFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(originalFilePath, "utf8");
      // rename .gitignore
      if (file === ".npmignore") file = ".gitignore";
      const writePath = join(current_directory, newProjectPath, file);
      fs.writeFileSync(writePath, contents, "utf8");
    } else if (stats.isDirectory()) {
      fs.mkdirSync(join(current_directory, newProjectPath, file));

      generateDirectoryContent(
        join(templatePath, file),
        join(newProjectPath, file)
      );
    }
  });
}

inquirer
  .prompt(QUESTIONS)
  .then((answers) => {
    const projectName = answers["ts-project-name"];
    fs.mkdirSync(join(current_directory, projectName));

    generateDirectoryContent(ts_template_path, projectName);

    console.log(
      `Congratulations ${projectName} was created!\nNext steps:\nrun: cd ${projectName}\nThen run: npm i or yarn to install the dependencies`
    );
  })
  .catch((e) => {
    console.error(e);
  });
