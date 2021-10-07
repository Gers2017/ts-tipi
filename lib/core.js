const cwd = process.cwd();
const fs = require("fs");
const chalk = require("chalk");
const { join } = require("path");

const { TsProject } = require("../types/tsproject");
const { templates } = require("../types/templates");
const { replaceFiles } = require("./replace");
const {
  getFileContent,
  makeDirectory,
  isDirectory,
  isDirectoryToIgnore,
  isFile,
  isFileToIgnore,
} = require("./utils");

/**
 * CloneDirectoryContent
 * @param {string} directoryToClone The directory to clone the contents from
 * @param {string} newFolderName The new directory to place the cloned files and folders
 * @param {TsProject} tsProject The setting for the project
 */
function CloneDirectoryContent(directoryToClone, newFolderName, tsProject) {
  const files = fs.readdirSync(directoryToClone);

  files.forEach((fileOrDir) => {
    const templateFilePath = join(directoryToClone, fileOrDir);
    const stats = fs.statSync(templateFilePath);

    if (isDirectory(stats)) {
      const directory = fileOrDir;
      if (isDirectoryToIgnore(directory)) return;

      makeDirectory(join(cwd, newFolderName, directory));

      CloneDirectoryContent(
        join(directoryToClone, directory),
        join(newFolderName, directory),
        tsProject
      );
    } else if (isFile(stats)) {
      let file = fileOrDir;
      if (isFileToIgnore(file)) return;

      const { tsTemplate } = templates;
      const { template } = tsProject;
      const isBaseTemplate = template.name === tsTemplate;
      const fileToReplace = replaceFiles[file];

      let fileContent =
        !isBaseTemplate && fileToReplace
          ? getFileContent(join(tsProject.getTemplatePath(), fileToReplace))
          : getFileContent(templateFilePath);

      if (file === "_gitignore") file = ".gitignore";
      const writePath = join(tsProject.cwd, newFolderName, file);
      fs.writeFileSync(writePath, fileContent);
    }
  });
}

/**
 * createProjectDirectory
 * @param {TsProject} tsProject
 * @returns { { created: boolean } } Returns an object with the property created referencing if the directory was created
 */
function createProjectDirectory(tsProject) {
  const newProjectPath = join(tsProject.cwd, tsProject.projectName);
  if (fs.existsSync(newProjectPath)) {
    console.log(
      chalk.red(
        `Folder ${newProjectPath} exists.\nDelete the folder or use another name.`
      )
    );
    return { created: false };
  }
  makeDirectory(newProjectPath);
  return { created: true };
}

/**
 * Generate the final message
 * @param projectName {string}
 * @param templateName {string}
 * @returns {string}
 */
function getMessage(projectName, templateName) {
  return `Awesome ${chalk.cyan(projectName)} was created with the ${chalk.cyan(
    templateName
  )} template!
     Next steps:
     Run: ${chalk.cyan("cd " + projectName)}
     Install dependencies: ${chalk.cyan("npm i or yarn")}
     Initialize git (optional) ${chalk.cyan("git init")}
     `;
}

module.exports = {
  createProjectDirectory,
  getMessage,
  CloneDirectoryContent,
};
