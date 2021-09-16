const fs = require("fs");
const { join } = require("path");
const chalk = require("chalk");
const { filesToIgnore, directoriesToIgnore } = require("./ignore");
const cwd = process.cwd();

/**
 * Clone the contents from the template to the new project
 * @param templateDirectory {string}
 * @param newFolderName {string}
 * @param packagePath {string}
 */
function generateDirectoryContent(
  templateDirectory,
  newFolderName,
  packagePath
) {
  const files = fs.readdirSync(templateDirectory);

  files.forEach((file) => {
    const templateFilePath = join(templateDirectory, file);
    const stats = fs.statSync(templateFilePath);

    // Clone the contents of the file
    if (stats.isFile()) {
      if (filesToIgnore.includes(file)) return; // ignore files
      let contents = fs.readFileSync(templateFilePath, "utf8");

      // replace the package.json
      if (file === "package.json") {
        contents = fs.readFileSync(packagePath);
      }

      if (file === "_gitignore") file = ".gitignore";

      const writePath = join(cwd, newFolderName, file);
      fs.writeFileSync(writePath, contents);
    } else if (stats.isDirectory()) {
      if (directoriesToIgnore.includes(file)) return; // ignore node_modules and others
      fs.mkdirSync(join(cwd, newFolderName, file));

      generateDirectoryContent(
        join(templateDirectory, file),
        join(newFolderName, file),
        packagePath
      );
    }
  });
}

/**
 * Create the project folder using the current directory and the project name
 * @param path {string}
 * @param folderName {string}
 * @returns {{created: boolean}}
 */
function createProjectFolder(path, folderName) {
  const projectPath = join(path, folderName);
  if (fs.existsSync(projectPath)) {
    console.log(
      chalk.red(`Folder ${projectPath} exists. Delete or use another name.`)
    );
    return { created: false };
  }
  fs.mkdirSync(projectPath);
  return { created: true };
}

/**
 * Generate the final message
 * @param projectName {string}
 * @param templateName {string}
 * @returns {string}
 */
function getMessage(projectName, templateName) {
  return `Congratulations ${chalk.cyan(
    projectName
  )} was created using the ${chalk.cyan(templateName)} template!
     Next steps:
     Run: ${chalk.cyan("cd " + projectName)}
     Install dependencies: ${chalk.cyan("npm i or yarn")}
     Initialize git (optional) ${chalk.cyan("git init")}
     `;
}

module.exports = {
  generateDirectoryContent,
  createProjectFolder,
  getMessage,
};
