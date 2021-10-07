const cwd = process.cwd();
const {
  readdirSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  statSync,
  existsSync,
} = require("fs");
const chalk = require("chalk");
const { join } = require("path");
const { TsProject } = require("../types/tsproject");
const { templates } = require("../types/templates");
const { isDirectoryToIgnore, isFileToIgnore } = require("./utils");

/**
 * CloneDirectoryContent
 * @param {string} directoryToClone The directory to clone the contents from
 * @param {string} newFolderName The new directory to place the cloned files and folders
 * @param {TsProject} tsProject The setting for the project
 */
function CloneDirectoryContent(directoryToClone, newFolderName, tsProject) {
  const files = readdirSync(directoryToClone);

  files.forEach((fileOrDir) => {
    const currentFilePath = join(directoryToClone, fileOrDir);
    const fileStats = statSync(currentFilePath);

    if (fileStats.isDirectory()) {
      const directory = fileOrDir;
      if (isDirectoryToIgnore(directory)) return;

      mkdirSync(join(cwd, newFolderName, directory), {
        recursive: true,
      });

      CloneDirectoryContent(
        join(directoryToClone, directory),
        join(newFolderName, directory),
        tsProject,
      );
    } else if (fileStats.isFile()) {
      let file = fileOrDir;
      if (isFileToIgnore(file)) return;

      const { tsTemplate } = templates;
      const isBaseTemplate = tsProject.isTemplateOfType(tsTemplate);
      const fileToReplace = tsProject.template.getFileToReplace(file);

      let fileContent =
        !isBaseTemplate && fileToReplace
          ? readFileSync(join(tsProject.getTemplatePath(), fileToReplace))
          : readFileSync(currentFilePath);

      if (file === "_gitignore") file = ".gitignore";
      const writePath = join(tsProject.cwd, newFolderName, file);
      writeFileSync(writePath, fileContent);
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
  if (existsSync(newProjectPath)) {
    console.log(
        chalk.red(
            `Folder ${newProjectPath} exists.\nDelete the folder or use another name.`
        )
    );
    return {created: false};
  }
  mkdirSync(newProjectPath, {
    recursive: true,
  });
  return {created: true};
}

/**
 * Generate the final message
 * @param projectName {string}
 * @param templateName {string}
 * @returns {string}
 */
function getMessage(projectName, templateName) {
  return `Project ${chalk.cyan(projectName)} was created with the ${chalk.cyan(
    templateName,
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
